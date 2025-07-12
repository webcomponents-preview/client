import { LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';

import type { ColorScheme } from '@/utils/color-scheme.utils.js';
import { addColorSchemable, getColorSchemeState, removeColorSchemable } from '@/utils/color-scheme.utils.js';
import type { Constructor } from '@/utils/mixin.types.js';

export declare class ColorSchemableInterface {
  colorScheme?: ColorScheme;
}

// provide a mixin to make a component color schemable
export const ColorSchemable = <T extends Constructor<LitElement>>(superClass: T) => {
  class ColorSchemableElement extends superClass {
    /**
     * @internal - used to reflect the color scheme to the element
     */
    @property({ type: String, reflect: true, attribute: 'color-scheme' })
    colorScheme?: ColorScheme = getColorSchemeState();

    override connectedCallback() {
      super.connectedCallback();
      addColorSchemable(this);
    }

    override disconnectedCallback() {
      super.disconnectedCallback();
      removeColorSchemable(this);
    }
  }
  return ColorSchemableElement as Constructor<ColorSchemableInterface> & T;
};
