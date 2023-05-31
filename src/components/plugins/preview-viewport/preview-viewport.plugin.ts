import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { map } from 'lit/directives/map.js';

import { ColorSchemable } from '@/utils/color-scheme.utils.js';
import type { PreviewPlugin } from '@/utils/plugin.utils.js';

import styles from './preview-viewport.plugin.scss';

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
const SIZE_CLASS = 'simulate-viewport-size';
const SCALE_CLASS = 'simulate-viewport-scale';

// to add some spacing we scale a bit further than actually needed
const SCALE_FACTOR = 1;

@customElement('wcp-preview-viewport')
export class PreviewViewport extends ColorSchemable(LitElement) implements PreviewPlugin {
  static override readonly styles = unsafeCSS(styles);

  readonly container!: HTMLElement;

  @property({ type: Boolean, reflect: true })
  readonly available = true;

  @property({ type: String, reflect: true })
  readonly name = 'viewport';

  @property({ type: String, reflect: true })
  readonly label = 'Viewport';

  @property({ type: String, reflect: true, attribute: 'simulate-viewport' })
  private simulateViewport?: Viewport;

  @property({ type: Boolean, reflect: true, attribute: 'invert-simulated-viewport' })
  invertSimulatedViewport = false;

  protected prepareStyle(): HTMLStyleElement {
    // check if a style element already exists
    let style = this.container.querySelector<HTMLStyleElement>(`style#${STYLE_ID}`);
    if (style !== null) return style;

    // create a new style element
    style = document.createElement('style');
    style.id = STYLE_ID;
    this.container.append(style);
    return style;
  }

  /**
   * Sets the size of the viewport to simulate its dimensions.
   */
  protected applyPreviewSize() {
    if (this.simulateViewport === undefined) return;
    // read the viewport dimensions to apply
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [w, h] = VIEWPORTS.get(this.simulateViewport)!;
    // add the size styling to the style element
    this.prepareStyle().textContent += `
      .${SIZE_CLASS} {
        height: ${this.invertSimulatedViewport ? w : h}px;
        width: ${this.invertSimulatedViewport ? h : w}px;
        
        border-radius: 5px;
        outline: 3px solid currentColor;
      }
    `;
  }

  /**
   * Scales the sized viewport to fit into the preview container.
   */
  protected applyPreviewScale() {
    if (this.simulateViewport === undefined) return;
    // read the viewport dimensions to apply
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [w, h] = VIEWPORTS.get(this.simulateViewport)!;
    // derive the scale to fit the viewport into the preview
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const preview = this.container.parentElement!;
    const scale = Math.min(
      preview.clientWidth / (this.invertSimulatedViewport ? h : w),
      preview.clientHeight / (this.invertSimulatedViewport ? w : h)
    );
    // add the scale styling to the style element
    this.prepareStyle().textContent += `
      .${SCALE_CLASS} {
        transform-origin: 0 0;
        transform: scale(clamp(0.15, ${scale * SCALE_FACTOR}, 1));
      }
    `;
  }

  @eventOptions({ passive: true })
  private handleSimulateViewport(event: Event) {
    const { dataset } = event.currentTarget as HTMLButtonElement;
    const viewport = dataset.viewport as Viewport;
    this.simulateViewport = this.simulateViewport === viewport ? undefined : viewport;
    if (this.simulateViewport === undefined) {
      this.prepareStyle().textContent = '';
    } else {
      this.applyPreviewSize();
      this.applyPreviewScale();
    }
  }

  @eventOptions({ passive: true })
  handleInvertSimulatedViewport() {
    this.invertSimulatedViewport = !this.invertSimulatedViewport;
    this.applyPreviewSize();
    this.applyPreviewScale();
  }

  override connectedCallback() {
    super.connectedCallback();

    // add the classes to the container to simulate the viewport
    this.container.classList.add(SIZE_CLASS, SCALE_CLASS);
  }

  override disconnectedCallback() {
    // remove the simulation classes from the container
    this.container.classList.remove(SIZE_CLASS, SCALE_CLASS);

    super.disconnectedCallback();
  }

  // without ShadowDOM, we need to manually inject the styles
  protected override render(): TemplateResult {
    return html`
      ${map(
        VIEWPORTS.keys(),
        (viewport) => html`
          <wcp-button
            kind="icon"
            data-viewport="${viewport}"
            class="${classMap({ active: viewport === this.simulateViewport })}"
            @click="${this.handleSimulateViewport}"
          >
            <wcp-icon name="${ICONS.get(viewport)}"></wcp-icon>
          </wcp-button>
        `
      )}

      <wcp-button
        kind="icon"
        ?disabled="${this.simulateViewport === undefined}"
        class="${classMap({ active: this.simulateViewport !== undefined && this.invertSimulatedViewport })}"
        @click="${this.handleInvertSimulatedViewport}"
      >
        <wcp-icon name="ratio" style="--wcp-icon-size: 19"></wcp-icon>
      </wcp-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-preview-viewport': PreviewViewport;
  }
}
