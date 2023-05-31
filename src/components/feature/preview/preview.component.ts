import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { unsafeStatic, html as staticHtml } from 'lit/static-html.js';
import { query, customElement, state, eventOptions } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { ref } from 'lit/directives/ref.js';
import { when } from 'lit/directives/when.js';

import { ColorSchemable } from '@/utils/color-scheme.utils.js';
import { type Config, getConfig } from '@/utils/config.utils.js';
import { isElementWithin } from '@/utils/dom.utils.js';

import type { Button } from '@/components/ui/button/button.component.js';

import styles from './preview.component.scss';

/**
 * Previews given content.
 *
 * @element wcp-preview
 *
 * @cssprop --wcp-preview-menu-border-radius - Border radius of the expanding menu.
 * @cssprop --wcp-preview-menu-background-opacity - Opacity of the expanding menu background.
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
  static override readonly styles = unsafeCSS(styles);

  @state()
  config?: Config;

  @query('nav')
  private nav?: HTMLElement;

  @query('wcp-button')
  private toggleButton?: Button;

  @state()
  private container?: Element;

  override async connectedCallback() {
    this.config = await getConfig();
    super.connectedCallback();
  }

  override disconnectedCallback() {
    this.removeEventListener('click', this.handleOutsideClickBound, false);
    super.disconnectedCallback();
  }

  @eventOptions({ passive: true })
  private handleClick() {
    const expanded = this.toggleButton?.matches('[aria-expanded="true"]');
    this.toggleButton?.setAttribute('aria-expanded', String(!expanded));

    if (!expanded) {
      window.addEventListener('click', this.handleOutsideClickBound, false);
    } else {
      window.removeEventListener('click', this.handleOutsideClickBound, false);
    }
  }

  @eventOptions({ passive: true })
  private handleOutsideClick(event: Event) {
    const target = event.composedPath()[0] as Element;
    const expanded = this.toggleButton?.matches('[aria-expanded="true"]');
    const within = isElementWithin(target, this.nav);

    if (expanded && !within) {
      this.toggleButton?.setAttribute('aria-expanded', 'false');
    }
  }

  private handleOutsideClickBound = this.handleOutsideClick.bind(this);

  private handleContainerRef(container?: Element) {
    this.container = container;
  }

  protected override render(): TemplateResult {
    return html`
      <section>
        <div ${ref(this.handleContainerRef)}>
          <slot></slot>
        </div>
      </section>

      <nav>
        <wcp-button aria-expanded="false" aria-controls="plugins" kind="icon" @click="${this.handleClick}">
          <wcp-icon name="more-alt"></wcp-icon>
        </wcp-button>

        ${when(
          this.container !== undefined,
          () => html`
            <menu id="plugins">
              ${map(
                this.config?.previewPlugins ?? [],
                (plugin, index) => html`
                  ${when(index > 0, () => html`<hr />`)}
                  ${staticHtml`<${unsafeStatic(plugin)} .container="${this.container}"></${unsafeStatic(plugin)}>`}
                `
              )}
            </menu>
          `
        )}
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-preview': Preview;
  }
}
