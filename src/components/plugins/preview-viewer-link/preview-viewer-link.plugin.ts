import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';

import type { PreviewPlugin } from '@/utils/plugin.utils.js';

import styles from './preview-viewer-link.plugin.scss';

@customElement('wcp-preview-viewer-link')
export class PreviewViewerLink extends LitElement implements PreviewPlugin {
  static override readonly styles = unsafeCSS(styles);

  readonly #overlay = document.createElement('div');

  readonly container!: HTMLElement;
  readonly previewTagName!: string;

  @property({ type: Boolean, reflect: true })
  readonly available = true;

  @property({ type: String, reflect: true })
  readonly name = 'viewer-link';

  @property({ type: String, reflect: true })
  readonly label = 'Show in viewer';

  @property({ type: String, reflect: true, attribute: 'toggle-label' })
  readonly toggleLabel = 'Highlight';

  @property({ type: Boolean, reflect: true })
  enabled = false;

  #attachOverlay() {
    this.#overlay.id = 'overlay';
    this.#overlay.style.position = 'absolute';
    this.#overlay.style.inset = '0';
    this.#overlay.style.pointerEvents = 'none';
    this.container.parentElement?.append(this.#overlay);
  }

  #detachOverlay() {
    this.#overlay.remove();
  }

  #findContainerSlot(): HTMLSlotElement | undefined {
    const host = this.container.getRootNode() as HTMLElement;
    return host.querySelector('slot') ?? undefined;
  }

  #observeContainerSlot() {
    this.#findContainerSlot()?.addEventListener('slotchange', this.#handleContainerSlotChange, false);
  }

  #unobserveContainerSlot() {
    this.#findContainerSlot()?.removeEventListener('slotchange', this.#handleContainerSlotChange, false);
  }

  #observeContainerScroll() {
    this.container.addEventListener('scroll', this.#handleContainerScroll, false);
  }

  #unobserveContainerScroll() {
    this.container.removeEventListener('scroll', this.#handleContainerScroll, false);
  }

  #handleContainerScroll() {
    this.#overlay.style.transform = `translateY(-${this.container.scrollTop ?? 0}px)`;
  }

  #handleContainerSlotChange() {
    this.#attachHints();
  }

  #attachHints() {
    // gather all slotted elements
    const host = this.container.getRootNode() as HTMLElement;
    const slot = host.querySelector('slot');
    const assigned = slot?.assignedElements({ flatten: true }) as HTMLElement[];

    // attach hints to all previewed elements
    assigned
      .filter((element) => element.tagName.toLowerCase() === this.previewTagName)
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .concat(assigned.flatMap((element) => [...element.querySelectorAll<HTMLElement>(this.previewTagName)]))
      .forEach((element) => this.#attachHint(element));
  }

  #attachHint(element: HTMLElement) {
    const hint = document.createElement('wcp-preview-viewer-link-hint');
    hint.debug = true;
    hint.element = element;
    hint.scrollParent = this.container;
    this.#overlay.append(hint);
  }

  #setupHints() {
    if (this.enabled) {
      this.#attachOverlay();
      this.#attachHints();

      this.#observeContainerSlot();
      this.#observeContainerScroll();
    } else {
      this.#teardownHints();
    }
  }

  #teardownHints() {
    this.#unobserveContainerSlot();
    this.#unobserveContainerScroll();

    this.#detachOverlay();
  }

  override connectedCallback() {
    super.connectedCallback();
    this.#setupHints();
  }

  override disconnectedCallback() {
    this.#teardownHints();
    super.disconnectedCallback();
  }

  @eventOptions({ passive: true })
  private handleInput(event: Event) {
    const { checked } = event.target as HTMLInputElement;
    this.enabled = checked;
    this.#setupHints();
  }

  // without ShadowDOM, we need to manually inject the styles
  protected override render(): TemplateResult {
    return html`
      <wcp-input-checkbox
        label="${this.toggleLabel}"
        ?checked="${this.enabled}"
        @input="${this.handleInput}"
      ></wcp-input-checkbox>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-preview-viewer-link': PreviewViewerLink;
  }
}
