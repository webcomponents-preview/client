import type { TemplateResult } from 'lit';
import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { map } from 'lit/directives/map.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';
import type { PreviewPlugin } from '@/utils/plugin.utils.js';

import styles from './preview-simulate-viewports.plugin.scss';

// utility union to carry the available viewport for simulation
type Viewport = 'mobile' | 'tablet' | 'desktop' | 'wide';

// maps the available viewport simulations to their dimensions
const VIEWPORTS = new Map<Viewport, [number, number]>([
  ['mobile', [390, 844]],
  ['tablet', [1024, 768]],
  ['desktop', [1280, 800]],
  ['wide', [1920, 1080]],
]);

// maps the available viewport simulations to icons
const ICONS = new Map<Viewport, string>([
  ['mobile', 'smartphone'],
  ['tablet', 'laptop'],
  ['desktop', 'screen'],
  ['wide', 'screen-wide'],
]);

// internal identifiers for styling
const STYLE_ID = 'preview-plugin-viewport';
const DECORATION_CLASS = 'simulate-viewport-decoration';
const PROPORTION_CLASS = 'simulate-viewport-proportion';
const SIZE_CLASS = 'simulate-viewport-size';
const SCALE_CLASS = 'simulate-viewport-scale';

// to add some spacing we scale a bit further than actually needed
const SCALE_FACTOR = 1;

/**
 * Simulates various viewports for a custom element preview.
 *
 */
@customElement('wcp-preview-simulate-viewports')
export class PreviewSimulateViewports extends ColorSchemable(LitElement) implements PreviewPlugin {
  static override readonly styles = unsafeCSS(styles);

  readonly name = 'viewport';
  readonly label = 'Viewport';

  readonly container?: HTMLElement;

  @property({ type: String, reflect: true, attribute: 'preview-tag-name' })
  readonly previewTagName!: string;

  @property({ type: Boolean, reflect: true })
  readonly available = true;

  @property({ type: String, reflect: true, attribute: 'simulate-viewport' })
  private simulateViewport?: Viewport;

  @property({ type: Boolean, reflect: true, attribute: 'invert-simulated-viewport' })
  private invertSimulatedViewport = false;

  get #containerRoot(): ShadowRoot | null {
    return this.container?.getRootNode() as ShadowRoot | null;
  }

  protected get defaultStyle(): string {
    return `
      .${DECORATION_CLASS} {
        border-radius: 10px;
        outline: 1px solid currentColor;
        overflow: hidden;
      }
    `;
  }

  protected removeStyle() {
    this.#containerRoot?.querySelector<HTMLStyleElement>(`style#${STYLE_ID}`)?.remove();
  }

  protected resetStyle() {
    this.prepareStyle().textContent = this.defaultStyle;
  }

  protected prepareStyle(): HTMLStyleElement {
    // check if a style element already exists
    let style = this.#containerRoot?.querySelector<HTMLStyleElement>(`style#${STYLE_ID}`);
    if (style) {
      return style;
    }

    // create a new style element
    style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = this.defaultStyle;
    this.#containerRoot?.append(style);
    return style;
  }

  /**
   * Sets the size of the viewport to simulate its dimensions.
   */
  protected applyPreviewSize() {
    if (this.simulateViewport === undefined) {
      return;
    }

    // read the viewport dimensions to apply
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [w, h] = VIEWPORTS.get(this.simulateViewport)!;
    // add the size styling to the style element
    this.prepareStyle().textContent += `
      .${SIZE_CLASS} {
        position: absolute;
        inset: 0 auto auto 0;
        height: ${this.invertSimulatedViewport ? w : h}px;
        width: ${this.invertSimulatedViewport ? h : w}px;
      }

      .${PROPORTION_CLASS} {
        aspect-ratio: ${this.invertSimulatedViewport ? `${h} / ${w}` : `${w} / ${h}`};
        width: min(${this.invertSimulatedViewport ? h : w}px, 100%);
      }
    `;
  }

  /**
   * Scales the sized viewport to fit into the preview container.
   */
  protected applyPreviewScale() {
    if (this.simulateViewport === undefined) {
      return;
    }

    // read the viewport dimensions to apply
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [w, h] = VIEWPORTS.get(this.simulateViewport)!;
    // derive the scale to fit the viewport into the preview

    const preview = this.container?.parentElement?.parentElement;
    if (!preview) {
      return;
    }
    const scale = Math.min(
      (preview.clientWidth - 20) / (this.invertSimulatedViewport ? h : w),
      (preview.clientHeight - 20) / (this.invertSimulatedViewport ? w : h)
    );
    // add the scale styling to the style element
    this.prepareStyle().textContent += `
      .${SCALE_CLASS} {
        transform-origin: 0 0;
        transform: scale(clamp(0.15, ${scale * SCALE_FACTOR}, 1));
      }
    `;
  }

  protected applyPreviewDimensions() {
    // remove our stuff if we are not simulating a viewport
    if (this.simulateViewport === undefined) {
      this.removeStyle();
      this.container?.parentElement?.classList.remove(DECORATION_CLASS, PROPORTION_CLASS);
      this.container?.classList.remove(SIZE_CLASS, SCALE_CLASS);
    }
    // apply visual changes
    else {
      this.resetStyle();
      this.container?.parentElement?.classList.add(DECORATION_CLASS, PROPORTION_CLASS);
      this.container?.classList.add(SIZE_CLASS, SCALE_CLASS);
      this.applyPreviewSize();
      this.applyPreviewScale();
    }

    // notify
    this.emitChange();
  }

  private emitChange() {
    const detail = { viewport: this.simulateViewport, inverted: this.invertSimulatedViewport };
    const event = new CustomEvent('wcp-preview-simulate-viewports:changed', {
      detail,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  @eventOptions({ passive: true })
  private handleSimulateViewport(event: Event) {
    // update state
    const { dataset } = event.currentTarget as HTMLButtonElement;
    const viewport = dataset.viewport as Viewport;
    this.simulateViewport = this.simulateViewport === viewport ? undefined : viewport;

    // apply visual changes
    this.applyPreviewDimensions();
  }

  @eventOptions({ passive: true })
  handleInvertSimulatedViewport() {
    // update state
    this.invertSimulatedViewport = !this.invertSimulatedViewport;

    // apply visual changes
    this.applyPreviewDimensions();
  }

  override disconnectedCallback() {
    this.removeStyle();
    super.disconnectedCallback();
  }

  // without ShadowDOM, we need to manually inject the styles
  protected override render(): TemplateResult {
    return html`
      ${map(
        VIEWPORTS.keys(),
        viewport => html`
          <wcp-button
            kind="icon"
            data-viewport="${viewport}"
            class="${classMap({ active: viewport === this.simulateViewport })}"
            @click="${this.handleSimulateViewport}"
          >
            <wcp-icon name="${ifDefined(ICONS.get(viewport))}"></wcp-icon>
          </wcp-button>
        `
      )}

      <wcp-button
        kind="icon"
        ?disabled="${this.simulateViewport === undefined}"
        class="${classMap({
          active: this.simulateViewport !== undefined && this.invertSimulatedViewport,
        })}"
        @click="${this.handleInvertSimulatedViewport}"
      >
        <wcp-icon name="ratio" style="--wcp-icon-size: 19"></wcp-icon>
      </wcp-button>
    `;
  }
}

declare global {
  interface HTMLElementEventMap {
    'wcp-preview-simulate-viewports:changed': CustomEvent<{
      viewport: Viewport;
      inverted: boolean;
    }>;
  }

  interface HTMLElementTagNameMap {
    'wcp-preview-simulate-viewports': PreviewSimulateViewports;
  }
}
