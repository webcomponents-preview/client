import { LitElement } from 'lit';
import { type ColorScheme } from '../utils/color-scheme.utils.js';
import type { Constructor } from '../utils/mixin.types.js';
export declare class ColorSchemableInterface {
    colorScheme?: ColorScheme;
}
export declare const ColorSchemable: <T extends Constructor<LitElement>>(superClass: T) => Constructor<ColorSchemableInterface> & T;
