import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, eventOptions, property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';

import { ColorSchemable } from '@/utils/color-scheme.utils';
import type { Config } from '@/utils/config.utils';
import { PreviewFramePlugin, findAllPlugins } from './preview-frame.utils';

import styles from './preview-frame.component.scss';

/**
 * @example
 * ```html
 * <wcp-preview-frame></wcp-preview-frame>
 * ```
 *
 * @cssprop --wcp-preview-frame-dark-background - Background color of the preview frame in dark mode
 * @cssprop --wcp-preview-frame-dark-border-color - Border color of the example section in dark mode
 * @cssprop --wcp-preview-frame-dark-color - Text color of the preview frame in dark mode
 *
 * @cssprop --wcp-preview-frame-light-background - Background color of the preview frame in light mode
 * @cssprop --wcp-preview-frame-light-border-color - Border color of the example section in light mode
 * @cssprop --wcp-preview-frame-light-color - Text color of the preview frame in light mode
 *
 * @cssprop --wcp-preview-frame-distance - Outer margin of the preview frame
 * @cssprop --wcp-preview-frame-spacing - Inner padding of the preview frame
 * @cssprop --wcp-preview-frame-border-width - Border width of the example section
 * @cssprop --wcp-preview-frame-spacing - Inner padding of the example section
 */
@customElement('wcp-preview-frame')
export class PreviewFrame extends ColorSchemable(LitElement) {
  static readonly styles = unsafeCSS(styles);

  @state()
  private _tabs: PreviewFramePlugin[] = [];

  @property({ type: String, reflect: true, attribute: 'initial-preview-tab' })
  initialPreviewTab?: Config['initialPreviewTab'];

  @eventOptions({ passive: true })
  protected handleSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    const tabs = findAllPlugins(slot);
    // once the plugins are slotted into their respective targets, the slot
    // change listener may be called again with an empty result set
    if (tabs.length > 0) {
      this._tabs = tabs;
      this._tabs.forEach((tab) => tab.setAttribute('slot', tab.name));
    }
  }

  protected getAvailableTabs(): HTMLElementTagNameMap['wcp-tabs']['tabs'] {
    return this._tabs.reduce((tabs, { name, label }) => ({ ...tabs, [name]: { label } }), {});
  }

  protected getActiveTab(): HTMLElementTagNameMap['wcp-tabs']['activeTab'] {
    if (this.initialPreviewTab && this._tabs.some(({ name }) => name === this.initialPreviewTab)) {
      return this.initialPreviewTab;
    }
    return this._tabs[0].name;
  }

  protected render(): TemplateResult {
    return html`
      ${when(
        this._tabs.length > 0,
        () => html`
          <wcp-tabs .tabs="${this.getAvailableTabs()}" active-tab="${this.getActiveTab()}">
            ${map(this._tabs, ({ name }) => html`<slot name="${name}" slot="${name}"></slot>`)}
          </wcp-tabs>
        `
      )}
      <slot @slotchange="${this.handleSlotChange}"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-preview-frame': PreviewFrame;
  }
}
