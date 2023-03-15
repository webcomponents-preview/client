import { LitElement } from 'lit';
declare class ColorSchemableInterface {
    colorScheme?: 'light' | 'dark';
}
declare global {
    interface WindowEventMap {
        'wcp-color-scheme:toggle': CustomEvent<'dark' | 'light' | null>;
    }
}
type Constructor<T> = new (...args: any[]) => T;
export declare const ColorSchemable: <T extends Constructor<LitElement>>(superClass: T) => Constructor<ColorSchemableInterface> & T;
export {};
