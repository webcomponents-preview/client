declare const STATE_EVENT_NAME: "wcp-state-changed";
declare global {
    /**
     * Add fields to the state type by declaring them at the feature.
     * The declared type will be merged with this global state type.
     */
    interface State {
        _: unknown;
    }
    interface WCP {
        __state: Record<string, string>;
    }
    interface Window {
        wcp: WCP;
    }
    type StateEventMap = {
        [N in `${typeof STATE_EVENT_NAME}:${keyof State}`]: CustomEvent<State[N extends `${typeof STATE_EVENT_NAME}:${infer K}` ? K : never]>;
    };
    interface WindowEventMap extends StateEventMap {
    }
}
/**
 * Helper function to persist a given key with the given stateful value.
 */
export declare function persist<K extends keyof State>(key: K, value: State[K]): undefined;
/**
 * Read stateful values from the persistence layer.
 */
export declare function read<K extends keyof State>(key: K): State[K] | undefined;
export {};
