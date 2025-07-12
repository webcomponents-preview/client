import type { TemplateResult } from 'lit';
import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';

import styles from './code.component.scss';

/**
 * Shows a formatted code snippet.
 *
 */
@customElement('wcp-code')
export class Code extends ColorSchemable(LitElement) {
  static override readonly styles = unsafeCSS(styles);

  // disable ShadowDOM
  // https://stackoverflow.com/a/55213037/1146207
  override createRenderRoot() {
    return this;
  }

  // without ShadowDOM, we need to manually inject the styles
  protected override render(): TemplateResult {
    return html`
      <style>
        ${Code.styles}
      </style>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-code': Code;
  }
}
