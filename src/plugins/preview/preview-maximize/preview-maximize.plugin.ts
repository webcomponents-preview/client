import type { TemplateResult } from 'lit';
import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';
import type { PreviewPlugin } from '@/utils/plugin.utils.js';

import { persist, read, remove } from '../../../utils/state.utils.js';
import styles from './preview-maximize.plugin.scss';

// internal identifiers for styling
const STYLE_ID = 'preview-plugin-maximize';

/**
 * Maximizes a custom element preview to fullscreen.
 *
 */
@customElement('wcp-preview-maximize')
export class PreviewMaximize extends ColorSchemable(LitElement) implements PreviewPlugin {
  static override readonly styles = unsafeCSS(styles);

  readonly name = 'maximize';
  readonly label = 'Maximize';

  readonly container?: HTMLElement;

  @property({ type: Boolean, reflect: true, attribute: 'maximized' })
  private isMaximized = false;

  @property({ type: Boolean, reflect: true })
  readonly available = true;

  override connectedCallback() {
    super.connectedCallback();

    this.#injectStyles();
    this.#initMaximized();
  }

  get #containerRoot(): ShadowRoot | null {
    return this.container?.getRootNode() as ShadowRoot | null;
  }

  #minimizeOnEscape = ((event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.isMaximized) {
      event.preventDefault();
      this.#updateMaximized(false);
    }
  }).bind(this);

  #injectStyles() {
    // check if a style element already exists
    let style = this.#containerRoot?.querySelector<HTMLStyleElement>(`style#${STYLE_ID}`);
    if (style) {
      return;
    }

    // create a new style element
    style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      :host([data-maximized]) {
        position: fixed;
        inset: 0;
        z-index: 1000;
        background: var(---wcp-stage-background);

        section, #wrapper, #stage {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
          min-height: 0;
          width: 100%;
        }

        section, #stage {
          isolation: auto;
        }

        #stage {
          justify-content: center;
          align-items: center;
        }
      }
    `;
    this.#containerRoot?.append(style);
  }

  #initMaximized() {
    const instanceId = parseInt(this.#containerRoot?.host?.id ?? '', 10);
    const isMaximized = read('maximized-preview', 'url') === instanceId;
    if (isMaximized) {
      this.#updateMaximized(true);
    }
  }

  #emitChange() {
    const event = new CustomEvent('wcp-preview-maximize:toggled', {
      detail: this.isMaximized,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  #updateMaximized(maximized: boolean) {
    // get the host element reference
    const containerHost = this.#containerRoot?.host as HTMLElement | undefined;
    if (!containerHost) {
      return;
    }

    // find other preview plugins and styles
    const otherPlugins = this.#containerRoot?.querySelectorAll<HTMLElement>('nav > :not(wcp-preview-maximize)');
    const otherStyles = this.#containerRoot?.querySelectorAll<HTMLStyleElement>(`style:not(#${STYLE_ID})`);

    // apply or remove the maximize styles
    if (maximized) {
      containerHost.dataset.maximized = '';
      otherPlugins?.forEach(plugin => plugin.style.setProperty('display', 'none'));
      otherStyles?.forEach(style => (style.disabled = true));
      window.addEventListener('keydown', this.#minimizeOnEscape, { capture: true });
      persist('maximized-preview', parseInt(containerHost.id, 10), 'url');
    } else {
      delete containerHost.dataset.maximized;
      otherPlugins?.forEach(plugin => plugin.style.removeProperty('display'));
      otherStyles?.forEach(style => (style.disabled = false));
      window.removeEventListener('keydown', this.#minimizeOnEscape, { capture: true });
      remove('maximized-preview', 'url');
    }

    // update state and tell the world
    this.isMaximized = maximized;
    this.#emitChange();
  }

  @eventOptions({ passive: true })
  private handleMaximizePreview() {
    this.#updateMaximized(true);
  }

  @eventOptions({ passive: true })
  private handleMinimizePreview() {
    this.#updateMaximized(false);
  }

  protected override render(): TemplateResult {
    return html`
      ${when(
        this.isMaximized,
        () => html`
          <wcp-button kind="icon" @click="${this.handleMinimizePreview}">
            <wcp-icon name="minimize" style="--wcp-icon-size: 19"></wcp-icon>
          </wcp-button>
        `,
        () => html`
          <wcp-button kind="icon" @click="${this.handleMaximizePreview}">
            <wcp-icon name="maximize" style="--wcp-icon-size: 19"></wcp-icon>
          </wcp-button>
        `
      )}
    `;
  }
}

declare global {
  interface State {
    'maximized-preview': number;
  }

  interface HTMLElementEventMap {
    'wcp-preview-maximize:toggled': CustomEvent<boolean>;
  }

  interface HTMLElementTagNameMap {
    'wcp-preview-maximize': PreviewMaximize;
  }
}
