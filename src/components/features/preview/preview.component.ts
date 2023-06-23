import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { unsafeStatic, html as staticHtml } from 'lit/static-html.js';
import { query, customElement, state, eventOptions, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { ref } from 'lit/directives/ref.js';
import { when } from 'lit/directives/when.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';
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
  private readonly nav?: HTMLElement;

  @query('wcp-button')
  private readonly toggleButton?: Button;

  @state()
  private container?: Element;

  @state()
  private previewElements: HTMLElement[] = [];

  @property({ type: String, reflect: true, attribute: 'preview-tag-name' })
  previewTagName?: string;

  #handleRouteChange = () => this.requestUpdate();
  #handleViewportChange = () => this.requestUpdate();
  #handleOutsideClickBound = this.handleOutsideClick.bind(this);

  override async connectedCallback() {
    this.config = await getConfig();
    super.connectedCallback();

    window.addEventListener('hashchange', this.#handleRouteChange, false);
    this.addEventListener('wcp-preview-viewport:changed', this.#handleViewportChange, false);
  }

  override disconnectedCallback() {
    window.removeEventListener('hashchange', this.#handleRouteChange, false);
    this.removeEventListener('click', this.#handleOutsideClickBound, false);
    this.removeEventListener('wcp-preview-viewport:changed', this.#handleViewportChange, false);

    super.disconnectedCallback();
  }

  @eventOptions({ passive: true })
  private handleClick() {
    const expanded = this.toggleButton?.matches('[aria-expanded="true"]');
    this.toggleButton?.setAttribute('aria-expanded', String(!expanded));

    if (!expanded) {
      window.addEventListener('click', this.#handleOutsideClickBound, false);
    } else {
      window.removeEventListener('click', this.#handleOutsideClickBound, false);
    }
  }

  @eventOptions({ passive: true })
  private handleOutsideClick(event: Event) {
    const target = event.composedPath()[0] as HTMLElement;
    const expanded = this.toggleButton?.matches('[aria-expanded="true"]');
    const within = isElementWithin(target, this.nav);

    if (expanded && !within) {
      this.toggleButton?.setAttribute('aria-expanded', 'false');
    }
  }

  private handleContainerRef(container?: Element) {
    this.container = container;
  }

  @eventOptions({ passive: true })
  private handleSlotChange(event: Event) {
    // hold on, no preview tag name? no preview!
    if (this.previewTagName === undefined) return;

    // gather all slotted elements
    const slot = event.target as HTMLSlotElement;
    const assigned = slot.assignedElements({ flatten: true }) as HTMLElement[];

    // collect all elements that match the preview tag name
    this.previewElements = assigned
      .filter((element) => element.tagName.toLowerCase() === this.previewTagName)
      .concat(assigned.flatMap((element) => [...element.querySelectorAll<HTMLElement>(this.previewTagName!)]));
  }

  protected override render(): TemplateResult {
    return html`
      <section>
        <div id="stage" ${ref(this.handleContainerRef)}>
          <slot @slotchange="${this.handleSlotChange}"></slot>
          ${when(
            this.previewTagName !== undefined,
            () => html`
              <div id="overlay">
                ${map(
                  this.previewElements,
                  (element) => html`<wcp-preview-hint debug .element="${element}"></wcp-preview-hint>`
                )}
              </div>
            `
          )}
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
