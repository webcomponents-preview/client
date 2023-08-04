import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { compress } from '@/utils/compression.utils.js';
import { isDescendantOf } from '@/utils/dom.utils.js';
import { getManifest } from '@/utils/manifest.utils.js';
import type { PreviewPlugin } from '@/utils/plugin.utils.js';
import { Router } from '@/utils/router.utils.js';

import { readCurrentElementData } from './preview-viewer-link.utils.js';

import styles from './preview-viewer-link.plugin.scss';

@customElement('wcp-preview-viewer-link')
export class PreviewViewerLink extends LitElement implements PreviewPlugin {
  static override readonly styles = unsafeCSS(styles);

  readonly #manifest = getManifest();

  readonly #overlay = document.createElement('div');

  readonly container!: HTMLElement;

  @property({ type: String, reflect: true, attribute: 'preview-tag-name' })
  readonly previewTagName!: string;

  @property({ type: Boolean, reflect: true })
  available = true;

  @property({ type: String, reflect: true })
  readonly name = 'viewer-link';

  @property({ type: String, reflect: true })
  readonly label = 'Show in viewer';

  @property({ type: Boolean, reflect: true })
  enabled = false;

  #checkAvailability() {
    // check if the previewed element is in a viewer
    this.available = !isDescendantOf(this, 'wcp-preview-frame-viewer');

    // notify about availability change
    const event = new CustomEvent('wcp-preview-plugin:availability-change', {
      detail: this.available,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  #attachOverlay() {
    this.#overlay.id = 'overlay';
    this.#overlay.style.position = 'absolute';
    this.#overlay.style.inset = '0';
    this.#overlay.style.isolation = 'isolate';
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
      .concat(assigned.flatMap((element) => [...element.querySelectorAll<HTMLElement>(this.previewTagName)]))
      .forEach((element) => this.#attachHint(element));
  }

  #attachHint(element: HTMLElement) {
    const hint = document.createElement('wcp-preview-viewer-link-hint');
    hint.debug = true;
    hint.element = element;
    hint.scrollParent = this.container;
    hint.addEventListener('click', () => this.#openViewer(element), false);
    this.#overlay.append(hint);
  }

  #detachHints() {
    this.#overlay.innerHTML = '';
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

    this.#detachHints();
    this.#detachOverlay();
  }

  async #openViewer(element: HTMLElement) {
    // 1. gather element state (properties, attributes, slot contents, inline styles)
    const data = readCurrentElementData(element);
    const param = encodeURIComponent(await compress(JSON.stringify(data), 'deflate-raw'));
    // 2. prepare a stateful preview link
    const tagName = this.#manifest.elements.get(this.previewTagName)?.getNiceUrl();
    const link = `/element/${tagName}/viewer/${param}`;
    // 3. open the preview link in the viewer tab
    Router.navigate(link);
  }

  override connectedCallback() {
    super.connectedCallback();

    this.#setupHints();
    this.#checkAvailability();
  }

  adoptedCallback() {
    this.#checkAvailability();
  }

  override disconnectedCallback() {
    this.#teardownHints();

    super.disconnectedCallback();
  }

  @eventOptions({ passive: true })
  private handleToggleClick() {
    this.enabled = !this.enabled;
    this.#setupHints();
  }

  // without ShadowDOM, we need to manually inject the styles
  protected override render(): TemplateResult {
    return html`
      <wcp-button
        kind="icon"
        class="${classMap({ active: this.enabled })}"
        ?disabled="${!this.available}"
        @click="${this.handleToggleClick}"
      >
        <wcp-icon name="terminal" style="--wcp-icon-size: 19"></wcp-icon>
      </wcp-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-preview-viewer-link': PreviewViewerLink;
  }
}
