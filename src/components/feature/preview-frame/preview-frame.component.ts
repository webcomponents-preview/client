import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, eventOptions, property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';

import { ColorSchemable } from '@/utils/color-scheme.utils.js';
import type { Config } from '@/utils/config.utils.js';
import { type Plugin, findAllPlugins } from '@/utils/plugin.utils.js';

import styles from './preview-frame.component.scss';

/**
 * @example
 * ```html
 * <wcp-preview-frame></wcp-preview-frame>
 * ```
 * 
 * @slot - The preview frame can be filled with any number of plugins. The plugins will be rendered as tabs.
 *
 * @cssprop --wcp-preview-frame-dark-background - Background color of the preview frame in dark mode
 * @cssprop --wcp-preview-frame-dark-border-color - Border color of the example section in dark mode
 * @cssprop --wcp-preview-frame-dark-color - Text color of the preview frame in dark mode
 *
 * @cssprop --wcp-preview-frame-light-background - Background color of the preview frame in light mode
 * @cssprop --wcp-preview-frame-light-border-color - Border color of the example section in light mode
 * @cssprop --wcp-preview-frame-light-color - Text color of the preview frame in light mode
 *
 * @cssprop --wcp-preview-frame-border-radius - Border radius of the preview frame
 * @cssprop --wcp-preview-frame-border-width - Border width of the preview frame
 * @cssprop --wcp-preview-frame-distance - Outer margin of the preview frame
 * @cssprop --wcp-preview-frame-spacing - Inner padding of the preview frame
 */
@customElement('wcp-preview-frame')
export class PreviewFrame extends ColorSchemable(LitElement) {
  static readonly styles = unsafeCSS(styles);

  @state()
  private _plugins: Plugin[] = [];

  @state()
  private _tabs: HTMLElementTagNameMap['wcp-tabs']['tabs'] = {};

  @state()
  private _activeTab?: HTMLElementTagNameMap['wcp-tabs']['activeTab'];

  @property({ type: String, reflect: true, attribute: 'initial-preview-tab' })
  initialPreviewTab?: Config['initialPreviewTab'];

  @eventOptions({ passive: true })
  protected handleSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement;
    const plugins = findAllPlugins(slot);

    // once the plugins are slotted into their respective targets, the slot
    // change listener may be called again with an empty result set
    if (plugins.length > 0) {
      this._plugins = plugins;
      this._plugins.forEach((tab) => tab.setAttribute('slot', tab.name));

      this.preparePluginTabs();
      this.alignActiveTab();
    }
  }

  @eventOptions({ passive: true })
  protected handleAvailabilityChange() {
    // this event has been triggered by a plugin changing its availability
    // state, therefore we need to re-evaluate the tabs
    this.preparePluginTabs();
    this.alignActiveTab();
  }

  @eventOptions({ passive: true })
  protected handleActiveTabChange(event: CustomEvent<string>) {
    const { detail: activeTab, currentTarget, target } = event;

    // ignored bubbled events as they occur from nested tabs
    if (currentTarget !== target) return;

    // only update the active tab if it has changed
    if (this._activeTab !== activeTab) {
      this._activeTab = activeTab;
    }
  }

  protected preparePluginTabs() {
    this._tabs = this._plugins.reduce(
      (tabs, { available, label, name }) => ({ ...tabs, [name]: { label, disabled: !available } }),
      {}
    );
  }

  protected alignActiveTab() {
    // either the active tab is not set...
    if (this._activeTab === undefined) {
      // ... then we try to set the configured intial one...
      if (
        this.initialPreviewTab &&
        this._plugins.some(({ available, name }) => available && name === this.initialPreviewTab)
      ) {
        this._activeTab = this.initialPreviewTab;
        return;
      }
      // ... or the first available one...
      else if (this._plugins.length > 0) {
        this._activeTab = this._plugins.filter(({ available }) => available)?.[0]?.name;
        return;
      }
    }
    // ... or the active tab is not available anymore...
    else if (!this._plugins.find(({ name }) => name === this._activeTab)?.available) {
      // ... then we need to set the first available tab
      this._activeTab = this._plugins.find(({ available }) => available)?.name;
    }
  }

  protected render(): TemplateResult {
    return html`
      ${when(
        this._plugins.length > 0,
        () => html`
          <wcp-tabs
            .tabs="${this._tabs}"
            active-tab="${this._activeTab}"
            @wcp-tabs:active-tab-change="${this.handleActiveTabChange}"
            @wcp-preview-frame-plugin:availability-change="${this.handleAvailabilityChange}"
          >
            ${map(this._plugins, ({ name }) => html`<slot name="${name}" slot="${name}"></slot>`)}
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
