import { LitElement } from 'lit';
type Constructor<T> = new (...args: any[]) => T;
declare global {
    interface WindowEventMap {
        'wcp-color-scheme:toggle': CustomEvent<'dark' | 'light' | null>;
    }
}
export declare class ColorSchemableInterface {
    colorScheme?: 'light' | 'dark';
}
export declare const ColorSchemable: <T extends Constructor<LitElement>>(superClass: T) => Constructor<ColorSchemableInterface> & T;
export {};
