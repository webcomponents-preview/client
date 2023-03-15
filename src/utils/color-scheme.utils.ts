import { LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new (...args: any[]) => T;

declare global {
  interface WindowEventMap {
    'wcp-color-scheme:toggle': CustomEvent<'dark' | 'light' | null>;
  }
}

export declare class ColorSchemableInterface {
  colorScheme?: 'light' | 'dark';
}

export const ColorSchemable = <T extends Constructor<LitElement>>(superClass: T) => {
  class ColorSchemableElement extends superClass {
    @property({ type: String, reflect: true, attribute: 'color-scheme' })
    colorScheme?: 'light' | 'dark';

    handleColorSchemeToggle = (({ detail }: CustomEvent<'dark' | 'light' | null>) => {
      this.colorScheme = detail ?? undefined;
    }).bind(this);

    override connectedCallback() {
      super.connectedCallback();
      window.addEventListener('wcp-color-scheme:toggle', this.handleColorSchemeToggle, false);
    }

    override disconnectedCallback() {
      super.disconnectedCallback();
      window.removeEventListener('wcp-color-scheme:toggle', this.handleColorSchemeToggle, false);
    }
  }
  return ColorSchemableElement as Constructor<ColorSchemableInterface> & T;
};
