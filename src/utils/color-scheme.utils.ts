import { LitElement } from 'lit';
import { property } from 'lit/decorators/property.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new (...args: any[]) => T;

export declare class ColorSchemableInterface {
  colorScheme?: 'light' | 'dark';
}

export const ColorSchemable = <T extends Constructor<LitElement>>(superClass: T) => {
  class ColorSchemableElement extends superClass {
    @property({ type: String, reflect: true, attribute: 'color-scheme' })
    colorScheme?: 'light' | 'dark';
  }
  return ColorSchemableElement as Constructor<ColorSchemableInterface> & T;
};
