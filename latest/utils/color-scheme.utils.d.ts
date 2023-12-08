import type { ColorSchemableInterface } from '@/mixins/color-schemable.mixin.js';
declare global {
    interface State {
        ['color-scheme']: ColorScheme;
    }
}
export type ColorScheme = 'light' | 'dark';
export declare const getColorSchemeState: () => ColorScheme;
export declare const addColorSchemable: (element: ColorSchemableInterface) => Set<ColorSchemableInterface>;
export declare const removeColorSchemable: (element: ColorSchemableInterface) => boolean;
