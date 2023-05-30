import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { query, customElement, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { unsafeStatic, withStatic } from 'lit/static-html.js';

import { ColorSchemable } from '@/utils/color-scheme.utils.js';
import { type Config, getConfig } from '@/utils/config.utils.js';

import { Button } from '@/components/ui/button/button.component.js';

import styles from './preview.component.scss';

/**
 * Previews given content.
 * 
 * @element wcp-preview
 *
 * @cssprop --wcp-preview-menu-border-radius - Border radius of the expanding menu.
 * @cssprop --wcp-preview-menu-dark-background-raw - Background color of the expanding menu in dark mode. Must be a raw space-separated HSL color value list.
 * @cssprop --wcp-preview-menu-light-background-raw - Background color of the expanding menu in light mode. Must be a raw space-separated HSL color value list.
 * 
 * @slot - The content to preview.
 *
 * @example
 * ```html
 * <wcp-preview>
 *   <wcp-button>Example button</wcp-button>
 * </wcp-preview>
 * ```
 */
@customElement('wcp-preview')
export class Preview extends ColorSchemable(LitElement) {
  static readonly styles = unsafeCSS(styles);

  @state()
  config?: Config;

  @query('wcp-button')
  private toggleButton?: Button;

  override async connectedCallback() {
    this.config = await getConfig();

    super.connectedCallback();
  }

  private handleClick() {
    const expanded = this.toggleButton?.matches('[aria-expanded="true"]');
    this.toggleButton?.setAttribute('aria-expanded', String(!expanded));
  }

  private handleBlur() {
    this.toggleButton?.setAttribute('aria-expanded', 'false');
  }

  protected render(): TemplateResult {
    return html`
      <nav>
        <wcp-button aria-expanded="false" aria-controls="plugins" kind="icon" @click="${this.handleClick}">
          <wcp-icon name="more-alt"></wcp-icon>
        </wcp-button>

        <menu id="plugins" @blur="${this.handleBlur}">
          ${map(
            this.config?.previewPlugins ?? [],
            (plugin) => withStatic(html)`
              <${unsafeStatic(plugin)}></${unsafeStatic(plugin)}>
            `
          )}
        </menu>
      </nav>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-preview': Preview;
  }
}
