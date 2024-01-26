import { html, LitElement, type TemplateResult, unsafeCSS } from 'lit';
import { customElement, eventOptions, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import type { TopbarPlugin } from '@/utils/plugin.utils.js';
import { persist, read } from '@/utils/state.utils.js';

import styles from './topbar-preview-editor-link-toggle.plugin.scss';

/**
 * Toggles all preview editor link plugins to show or hide the debug hints.
 *
 */
@customElement('wcp-topbar-preview-editor-link-toggle')
export class TopbarPreviewEditorLinkToggle extends LitElement implements TopbarPlugin {
  static override readonly styles = unsafeCSS(styles);

  readonly name = 'editor-link-toggle';
  readonly label = 'Toggle all editor link hints globally';

  @state()
  private enabled = read('editor-link-hint-visible') ?? false;

  @property({ type: Boolean, reflect: true })
  available = true;

  @eventOptions({ passive: true })
  protected handleToggleClick() {
    this.enabled = !this.enabled;
    persist('editor-link-hint-visible', this.enabled);
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
  interface HTMLElementTagNameMap {
    'wcp-topbar-preview-editor-link-toggle': TopbarPreviewEditorLinkToggle;
  }
}
