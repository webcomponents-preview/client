import type { Config } from './config.utils.js';
import { getConfig } from './config.utils.js';

// for session and local storage we'll need to prefix the keys
const STORAGE_PREFIX = 'wcp-' as const;
const STATE_EVENT_NAME = 'wcp-state-changed' as const;

// in case of in-memory state, add the type definition here
declare global {
  /**
   * Add fields to the state type by declaring them at the feature.
   * The declared type will be merged with this global state type.
   */
  interface State {
    _: unknown; // we can not keep it empty, so we add some
  }

  // the internal state will be serialized
  interface WCP {
    __state: Record<string, string>;
  }
  interface Window {
    wcp: WCP;
  }

  // a helper type creating a map of all state events derived from the merged
  // state interface(s) with the correct custom event payload type
  type StateEventMap = {
    [N in `${typeof STATE_EVENT_NAME}:${keyof State}`]: CustomEvent<
      State[N extends `${typeof STATE_EVENT_NAME}:${infer K}` ? K : never]
    >;
  };
  // then add the type to the global window event map interface
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- we want some other name here
  interface WindowEventMap extends StateEventMap {}
}

/**
 * Helper function to persist a given key with the given stateful value.
 */
export function persist<K extends keyof State>(key: K, value: State[K], storage?: Config['statePersistence']): void {
  // in memory we can store arbitrary values, nevertheless we may want to
  // do more with them in the future, so we should use serializable values
  const serializedValue = JSON.stringify(value);
  const keyWithPrefix = `${STORAGE_PREFIX}${key}`;
  const persistence = storage ?? getConfig()?.statePersistence ?? 'none';

  let _: never;
  switch (persistence) {
    case 'none':
      // prepare global state object if missing
      if (!window.wcp) {
        window.wcp = {} as WCP;
      }
      if (!window.wcp.__state) {
        window.wcp.__state = {};
      }

      window.wcp.__state[keyWithPrefix] = serializedValue;
      break;
    case 'session':
      window.sessionStorage.setItem(keyWithPrefix, serializedValue);
      break;
    case 'local':
      window.localStorage.setItem(keyWithPrefix, serializedValue);
      break;

    default:
      // some simple exhaustiveness check

      _ = persistence;
      return _;
  }

  // dispatch an event to notify others about the change
  window.dispatchEvent(new CustomEvent(`${STATE_EVENT_NAME}:${key}`, { detail: value }));
}

/**
 * Read stateful values from the persistence layer.
 */
export function read<K extends keyof State>(key: K, storage?: Config['statePersistence']): State[K] | undefined {
  let serializedValue: string | undefined;
  const keyWithPrefix = `${STORAGE_PREFIX}${key}`;
  const persistence = storage ?? getConfig()?.statePersistence ?? 'none';

  let _: never;
  switch (persistence) {
    case 'none':
      serializedValue = window?.wcp?.__state?.[keyWithPrefix];
      break;
    case 'session':
      serializedValue = window.sessionStorage.getItem(keyWithPrefix) ?? undefined;
      break;
    case 'local':
      serializedValue = window.localStorage.getItem(keyWithPrefix) ?? undefined;
      break;

    default:
      // some simple exhaustiveness check

      _ = persistence;
      return _;
  }

  // either way, the value must be parsed
  return serializedValue ? JSON.parse(serializedValue) : undefined;
}
