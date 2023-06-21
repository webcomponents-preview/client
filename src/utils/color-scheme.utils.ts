import type { ColorSchemableInterface } from '@/mixins/color-schemable.mixin.js';

declare global {
  interface WindowEventMap {
    'wcp-color-scheme:toggle': CustomEvent<ColorScheme | null>;
  }
}

export type ColorScheme = 'light' | 'dark';

// module stores global state
const colorSchemables = new Set<ColorSchemableInterface>();
let colorSchemeState: ColorScheme | undefined = matchMedia('(prefers-color-scheme: dark)').matches
  ? ('dark' as const)
  : ('light' as const);

// and makes them accessible
export const getColorSchemeState = () => colorSchemeState;
export const addColorSchemable = (element: ColorSchemableInterface) => colorSchemables.add(element);
export const removeColorSchemable = (element: ColorSchemableInterface) => colorSchemables.delete(element);

// track changes to color scheme
function handleColorSchemeChange({ detail }: CustomEvent<ColorScheme | null>) {
  // update state in module
  colorSchemeState = detail ?? undefined;
  colorSchemables.forEach((colorSchemable) => (colorSchemable.colorScheme = colorSchemeState));
}

// bind a single listener to keep track of changes
window.addEventListener('wcp-color-scheme:toggle', handleColorSchemeChange, false);
