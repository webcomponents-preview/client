import type { ReactiveElement } from 'lit';

export type ListenerFn<E> = (e: E) => void;

export type TargetMap = {
  host: typeof ReactiveElement;
  body: typeof document.body;
  document: typeof document;
  window: typeof window;
};

export type TargetEventMap = {
  host: HTMLElementEventMap;
  body: HTMLBodyElementEventMap & HTMLElementEventMap;
  document: DocumentEventMap & HTMLElementEventMap;
  window: WindowEventMap & HTMLElementEventMap;
};

export function listen<B extends keyof TargetMap, T extends keyof TargetEventMap[B]>(type: T, bindTo?: B) {
  return function (ctor: ReactiveElement, name: PropertyKey) {
    // map the listener target
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let target: any;
    switch (bindTo) {
      case undefined:
      case 'host':
        target = ctor;
        break;
      case 'body':
        target = document.body;
        break;
      case 'document':
        target = document;
        break;
      case 'window':
        target = window;
        break;
    }

    // prepare a bound listener
    const listener = ctor[name as keyof ReactiveElement] as ListenerFn<TargetEventMap[B][T]>;
    let boundListener: unknown;

    // read event options from original listener which might have been decorated as well
    const eventOptions = (): AddEventListenerOptions => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { capture, passive, once } = listener as any;
      return { capture, passive, once };
    };

    // store existing callbacks and use them with monkey patching original callbacks
    const { connectedCallback, disconnectedCallback } = ctor;
    ctor.connectedCallback = function (this: ReactiveElement, ...args) {
      connectedCallback.call(this, ...args);
      boundListener = listener.bind(this);
      target.addEventListener(type, boundListener, eventOptions());
    };
    ctor.disconnectedCallback = function (this: ReactiveElement, ...args) {
      target.removeEventListener(type, boundListener, eventOptions());
      disconnectedCallback.call(this, ...args);
    };
  };
}
