import type { TemplateResult } from 'lit';
import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, eventOptions, property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { ref } from 'lit/directives/ref.js';
import { when } from 'lit/directives/when.js';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';
import { getConfig } from '@/utils/config.utils.js';
import { listen } from '@/utils/decorator.utils.js';

import styles from './preview.component.scss';

/**
 * Previews given content.
 *
 * @cssprop --wcp-preview-menu-dark-border-color - Border color of the plugin menu in dark mode.
 * @cssprop --wcp-preview-menu-light-border-color - Border color of the plugin menu in light mode.
 *
 * @slot - The content to preview.
 *
 */
@customElement('wcp-preview')
export class Preview extends ColorSchemable(LitElement) {
  static override readonly styles = unsafeCSS(styles);

  readonly #config = getConfig();

  @state()
  private container?: HTMLElement;

  @property({ type: String, reflect: true, attribute: 'preview-tag-name' })
  previewTagName?: string;

  @eventOptions({ passive: true })
  @listen('hashchange', 'window')
  protected handleRouteChange() {
    this.requestUpdate();
  }

  private handleContainerRef(container?: Element) {
    this.container = container as HTMLDivElement | undefined;
  }

  protected override render(): TemplateResult {
    return html`
      <section>
        <div id="wrapper">
          <div id="stage" ${ref(this.handleContainerRef)}>
            <slot></slot>
          </div>
        </div>
      </section>

      ${when(
        this.container !== undefined,
        () => html`
          <nav>
            ${map(
              this.#config?.previewPlugins ?? [],
              (plugin, index) => html`
                ${when(index > 0, () => html`<hr />`)} ${staticHtml`
                  <${unsafeStatic(plugin)}
                    class="plugin"
                    .container="${this.container}"
                    preview-tag-name="${this.previewTagName}"
                  ></${unsafeStatic(plugin)}>
                `}
              `,
            )}
          </nav>
        `,
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-preview': Preview;
  }
}
