import type { ColorSchemableInterface } from '@/mixins/color-schemable.mixin.js';
import { read } from '@/utils/state.utils.js';

declare global {
  interface State {
    ['color-scheme']: ColorScheme;
  }
}

export type ColorScheme = 'light' | 'dark';

// module stores global state
const colorSchemables = new Set<ColorSchemableInterface>();

// and makes them accessible
export const getColorSchemeState = () =>
  read('color-scheme') ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
export const addColorSchemable = (element: ColorSchemableInterface) => colorSchemables.add(element);
export const removeColorSchemable = (element: ColorSchemableInterface) => colorSchemables.delete(element);

// track changes to color scheme
function handleColorSchemeChange({ detail }: CustomEvent<ColorScheme>) {
  // update state in module
  const colorScheme = detail ?? undefined;
  colorSchemables.forEach((colorSchemable) => (colorSchemable.colorScheme = colorScheme));
}

// bind a single listener to keep track of changes
window.addEventListener('wcp-state-changed:color-scheme', handleColorSchemeChange, false);
