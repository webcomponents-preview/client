import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, eventOptions, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import type { TopbarPlugin } from '@/utils/plugin.utils.js';

import styles from './topbar-preview-editor-link-toggle.plugin.scss';

/**
 * Toggles all preview editor link plugins to show or hide the debug hints.
 *
 * @element wcp-topbar-preview-editor-link-toggle
 */
@customElement('wcp-topbar-preview-editor-link-toggle')
export class TopbarPreviewEditorLinkToggle extends LitElement implements TopbarPlugin {
  static override readonly styles = unsafeCSS(styles);

  readonly name = 'editor-link-toggle';
  readonly label = 'Toggle all editor link hints globally';

  @state()
  private enabled = false;

  @property({ type: Boolean, reflect: true })
  available = true;

  @eventOptions({ passive: true })
  protected handleToggleClick() {
    this.enabled = !this.enabled;

    const event = new CustomEvent('wcp-preview-editor-link-hint:toggle', { detail: this.enabled, composed: true });
    window.dispatchEvent(event);
  }

  protected override render(): TemplateResult {
    return html`
      <wcp-button
        kind="icon"
        class="${classMap({ active: this.enabled })}"
        ?disabled="${!this.available}"
        @click="${this.handleToggleClick}"
      >
        <wcp-icon name="terminal"></wcp-icon>
      </wcp-button>
    `;
  }
}

declare global {
  interface WindowEventMap {
    'wcp-preview-editor-link-hint:toggle': CustomEvent<boolean>;
  }

  interface HTMLElementTagNameMap {
    'wcp-topbar-preview-editor-link-toggle': TopbarPreviewEditorLinkToggle;
  }
}
