import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { map } from 'lit/directives/map.js';

import { ColorSchemable } from '@/utils/color-scheme.utils.js';
import type { PreviewPlugin } from '@/utils/plugin.utils.js';

import styles from './preview-viewport.plugin.scss';

type Viewport = 'mobile' | 'tablet' | 'desktop' | 'wide';

const VIEWPORTS = new Map<Viewport, [number, number]>([
  ['mobile', [390, 844]],
  ['tablet', [1024, 768]],
  ['desktop', [1280, 800]],
  ['wide', [1920, 1080]],
]);

const ICONS = new Map<Viewport, string>([
  ['mobile', 'smartphone'],
  ['tablet', 'laptop'],
  ['desktop', 'screen'],
  ['wide', 'screen-wide'],
]);

@customElement('wcp-preview-viewport')
export class PreviewViewport extends ColorSchemable(LitElement) implements PreviewPlugin {
  static readonly styles = unsafeCSS(styles);

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
    let style = this.container.querySelector<HTMLStyleElement>('style#preview-plugin-viewport');
    if (style !== null) return style;

    // create a new style element
    style = document.createElement('style');
    style.id = 'preview-plugin-viewport';
    this.container.append(style);
    return style;
  }

  protected applyPreviewSize() {
    if (this.simulateViewport === undefined) return;
    // read the viewport dimensions to apply
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [w, h] = VIEWPORTS.get(this.simulateViewport)!;
    // write the style
    this.prepareStyle().textContent += `
      .simulate-viewport-size {
        height: ${this.invertSimulatedViewport ? w : h}px;
        width: ${this.invertSimulatedViewport ? h : w}px;
        outline: 3px solid currentColor;
      }
    `;
  }

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
    // write the style
    this.prepareStyle().textContent += `
      .simulate-viewport-scale {
        transform-origin: 0 0;
        transform: scale(clamp(0.15, ${scale}, 1));
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
    this.container.classList.add('simulate-viewport-size', 'simulate-viewport-scale');
  }

  // without ShadowDOM, we need to manually inject the styles
  protected render(): TemplateResult {
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
