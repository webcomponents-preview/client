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
export declare function listen<B extends keyof TargetMap, T extends keyof TargetEventMap[B]>(type: T, bindTo?: B): (ctor: ReactiveElement, name: PropertyKey) => void;
