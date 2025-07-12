import type { TemplateResult } from 'lit';
import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, eventOptions, property, queryAll } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';

import styles from './tabs.component.scss';

/**
 * @slot tab name - The content of the named tab.
 * @emits wcp-tabs:active-tab-change - Notifies when the active tab changes
 *
 * @cssprop --wcp-tabs-tablist-gap - The gap between the tablist and the tabpanels
 * @cssprop --wcp-tabs-tablist-spacing - The inner padding of the tablist
 * @cssprop --wcp-tabs-tab-spacing - The inner padding of the tabs
 * @cssprop --wcp-tabs-tab-active-border-width - The border width of the active tab
 * @cssprop --wcp-tabs-panel-spacing - The inner padding of the tabpanels
 *
 * @cssprop --wcp-tabs-tablist-dark-border-color - The border color of the tablist in dark mode
 * @cssprop --wcp-tabs-tab-active-dark-border-color - The border color of the active tab in dark mode
 *
 * @cssprop --wcp-tabs-tablist-light-border-color - The border color of the tablist in light mode
 * @cssprop --wcp-tabs-tab-active-light-border-color - The border color of the active tab in light mode
 */
@customElement('wcp-tabs')
export class Tabs extends ColorSchemable(LitElement) {
  static override readonly styles = unsafeCSS(styles);

  tabFocus = 0;

  @queryAll('[role="tab"]')
  private readonly tabRoles!: HTMLElement[];

  @property({ type: Object })
  tabs: Record<string, { label: string; disabled?: boolean }> = {};

  @property({ type: String, reflect: true, attribute: 'active-tab' })
  activeTab?: string;

  emitActiveTabChange() {
    const event = new CustomEvent('wcp-tabs:active-tab-change', {
      detail: this.activeTab,
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  @eventOptions({ passive: true })
  handleTabClick(event: Event) {
    const tab = event.target as HTMLButtonElement;
    const activeTab = tab.dataset.name as typeof this.activeTab;
    if (this.activeTab !== activeTab) {
      this.activeTab = activeTab;
      this.emitActiveTabChange();
    }
  }

  @eventOptions({ passive: true })
  handleKeydown(event: KeyboardEvent) {
    // Move right
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      const tabs = this.tabRoles;
      tabs[this.tabFocus].setAttribute('tabindex', '-1');
      if (event.key === 'ArrowRight') {
        this.tabFocus++;
        // If we're at the end, go to the start
        if (this.tabFocus >= tabs.length) {
          this.tabFocus = 0;
        }
        // Move left
      } else if (event.key === 'ArrowLeft') {
        this.tabFocus--;
        // If we're at the start, move to the end
        if (this.tabFocus < 0) {
          this.tabFocus = tabs.length - 1;
        }
      }

      tabs[this.tabFocus].setAttribute('tabindex', '0');
      tabs[this.tabFocus].focus();
    }
  }

  protected override render(): TemplateResult {
    return html`
      <nav part="tablist" role="tablist" aria-label="Sample Tabs" @keydown="${this.handleKeydown}">
        ${map(
          Object.entries(this.tabs),
          ([tab, { label, disabled }]) => html`
            <button
              role="tab"
              aria-selected="${this.activeTab === tab ? 'true' : 'false'}"
              aria-controls="${tab}-panel"
              data-name="${tab}"
              id="${tab}-tab"
              tabindex="${this.activeTab === tab ? '0' : '-1'}"
              ?disabled="${disabled}"
              @click="${this.handleTabClick}"
            >
              ${label}
            </button>
          `,
        )}
      </nav>

      ${map(
        Object.keys(this.tabs),
        (tab) => html`
          <div
            id="${tab}-panel"
            part="${tab}-panel"
            role="tabpanel"
            tabindex="0"
            aria-labelledby="${tab}-tab"
            ?hidden="${this.activeTab !== tab}"
          >
            <slot name="${tab}"></slot>
          </div>
        `,
      )}
    `;
  }
}

declare global {
  interface HTMLElementEventMap {
    'wcp-tabs:active-tab-change': CustomEvent<string>;
  }
  interface HTMLElementTagNameMap {
    'wcp-tabs': Tabs;
  }
}
