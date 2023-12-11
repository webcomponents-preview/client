import { html, LitElement, type TemplateResult, unsafeCSS } from 'lit';
import { customElement, eventOptions, property, queryAssignedElements, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';
import { log } from '@/utils/log.utils.js';
import { isStagePlugin, type StagePlugin } from '@/utils/plugin.utils.js';

import styles from './stage.component.scss';

/**
 * @example
 * ```html
 * <wcp-stage></wcp-stage>
 * ```
 *
 * @slot - The preview frame can be filled with any number of plugins. The plugins will be rendered as tabs.
 *
 * @cssprop --wcp-stage-dark-background - Background color of the preview frame in dark mode
 * @cssprop --wcp-stage-dark-border-color - Border color of the example section in dark mode
 * @cssprop --wcp-stage-dark-color - Text color of the preview frame in dark mode
 *
 * @cssprop --wcp-stage-light-background - Background color of the preview frame in light mode
 * @cssprop --wcp-stage-light-border-color - Border color of the example section in light mode
 * @cssprop --wcp-stage-light-color - Text color of the preview frame in light mode
 *
 * @cssprop --wcp-stage-border-radius - Border radius of the preview frame
 * @cssprop --wcp-stage-border-width - Border width of the preview frame
 * @cssprop --wcp-stage-distance - Outer margin of the preview frame
 * @cssprop --wcp-stage-spacing - Inner padding of the preview frame
 */
@customElement('wcp-stage')
export class Stage extends ColorSchemable(LitElement) {
  static override readonly styles = unsafeCSS(styles);

  @queryAssignedElements()
  private readonly assignedPlugins!: HTMLElement[];

  @state()
  private _plugins: StagePlugin[] = [];

  @state()
  private _tabs: HTMLElementTagNameMap['wcp-tabs']['tabs'] = {};

  @property({ type: String, reflect: true, attribute: 'active-plugin' })
  private readonly activePlugin?: string;

  emitActivePluginChange(activePlugin?: string) {
    const event = new CustomEvent('wcp-stage:active-plugin-change', {
      detail: activePlugin,
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  @eventOptions({ passive: true })
  protected handleSlotChange() {
    const plugins = this.assignedPlugins.filter(isStagePlugin);
    log.info(`Found ${plugins.length} stage plugins.`);

    // once the plugins are slotted into their respective targets, the slot
    // change listener may be called again with an empty result set
    if (plugins.length > 0) {
      this._plugins = plugins;
      this._plugins.forEach((tab) => tab.setAttribute('slot', tab.name));

      this.preparePluginTabs();
      this.alignActivePlugin();
    }
  }

  @eventOptions({ passive: true })
  protected handleAvailabilityChange() {
    // this event has been triggered by a plugin changing its availability
    // state, therefore we need to re-evaluate the tabs
    this.preparePluginTabs();
    this.alignActivePlugin();
  }

  @eventOptions({ passive: true })
  protected handleActiveTabChange(event: CustomEvent<string>) {
    const { currentTarget, target, detail: activePlugin } = event;

    // re-emit as our own event
    if (currentTarget === target) {
      this.emitActivePluginChange(activePlugin);
    }
  }

  protected preparePluginTabs() {
    this._tabs = this._plugins.reduce(
      (tabs, { available, label, name }) => ({ ...tabs, [name]: { label, disabled: !available } }),
      {},
    );
  }

  protected alignActivePlugin() {
    let alignedActivePlugin = this.activePlugin;

    // either the active tab is not set...
    if (this.activePlugin === undefined && this._plugins.length > 0) {
      // ... then we try to set the first available...
      alignedActivePlugin = this._plugins.filter(({ available }) => available)?.[0]?.name;
    }
    // ... or the active tab is not available anymore...
    else if (!this._plugins.find(({ name }) => name === this.activePlugin)?.available) {
      // ... then we need to set the first available tab
      alignedActivePlugin = this._plugins.find(({ available }) => available)?.name;
    }

    // if there are changes, let them know! 🏳️‍🌈
    if (alignedActivePlugin !== this.activePlugin) {
      this.emitActivePluginChange(alignedActivePlugin);
    }
  }

  protected override render(): TemplateResult {
    return html`
      ${when(
        this._plugins.length > 0,
        () => html`
          <wcp-tabs
            .tabs="${this._tabs}"
            active-tab="${ifDefined(this.activePlugin)}"
            @wcp-tabs:active-tab-change="${this.handleActiveTabChange}"
            @wcp-stage-plugin:availability-change="${this.handleAvailabilityChange}"
          >
            ${map(this._plugins, ({ name }) => html`<slot name="${name}" slot="${name}"></slot>`)}
          </wcp-tabs>
        `,
      )}
      <slot @slotchange="${this.handleSlotChange}"></slot>
    `;
  }
}

declare global {
  interface HTMLElementEventMap {
    'wcp-stage:active-plugin-change': CustomEvent<string>;
  }
  interface HTMLElementTagNameMap {
    'wcp-stage': Stage;
  }
}
