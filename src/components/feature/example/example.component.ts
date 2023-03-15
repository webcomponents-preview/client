import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';

import { ColorSchemable } from '@/utils/color-scheme.utils';

import styles from './example.component.scss';

const EXAMPLE_TABS = { preview: 'Preview', code: 'Code' };

/**
 * Shows a code example and a preview of the component.
 *
 * @slot code - Code example
 * @slot preview - Rendered example preview
 *
 * @cssprop --wcp-example-spacing - Inner padding of the example
 * @cssprop --wcp-example-border-radius - Border radius of the example
 * @cssprop --wcp-example-border-width - Border width of the example
 *
 * @cssprop --wcp-example-dark-border-color - Border color of the example in dark mode
 * @cssprop --wcp-example-light-border-color - Border color of the example in light mode
 */
@customElement('wcp-example')
export class Example extends ColorSchemable(LitElement) {
  static readonly styles = unsafeCSS(styles);

  protected render(): TemplateResult {
    return html`
      <wcp-tabs .tabs="${EXAMPLE_TABS}" active-tab="code">
        ${map(Object.keys(EXAMPLE_TABS), (tab) => html`<slot name="${tab}" slot="${tab}"></slot>`)}
      </wcp-tabs>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-example': Example;
  }
}