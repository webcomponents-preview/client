import { LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';
import type { Constructor } from '@/utils/mixin.types.js';

declare class ColorSchemableInterface {
  colorScheme?: 'light' | 'dark';
}

declare global {
  interface WindowEventMap {
    'wcp-color-scheme:toggle': CustomEvent<'dark' | 'light' | null>;
  }
}

// module stores global state
const colorSchemables = new Set<ColorSchemableInterface>();
let colorSchemeState: 'light' | 'dark' | undefined;

// track changes to color scheme
function handleColorSchemeChange({ detail }: CustomEvent<'dark' | 'light' | null>) {
  // update state in module
  colorSchemeState = detail ?? undefined;
  colorSchemables.forEach((colorSchemable) => (colorSchemable.colorScheme = colorSchemeState));
}

// bind a single listener to keep track of changes
window.addEventListener('wcp-color-scheme:toggle', handleColorSchemeChange, false);

// provide a mixin to make a component color schemable
export const ColorSchemable = <T extends Constructor<LitElement>>(superClass: T) => {
  class ColorSchemableElement extends superClass {
    /**
     * @internal - used to reflect the color scheme to the element
     */
    @property({ type: String, reflect: true, attribute: 'color-scheme' })
    colorScheme?: 'light' | 'dark' = colorSchemeState;

    override connectedCallback() {
      super.connectedCallback();
      colorSchemables.add(this);
    }

    override disconnectedCallback() {
      super.disconnectedCallback();
      colorSchemables.delete(this);
    }
  }
  return ColorSchemableElement as Constructor<ColorSchemableInterface> & T;
};
