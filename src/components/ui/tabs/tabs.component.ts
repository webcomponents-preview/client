import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, eventOptions, property, queryAll, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';

import styles from './tabs.component.scss';

/**
 * @example
 * ```html
 * <wcp-tabs tabs='{"first": "First tab", "second": "Second tab"}'>
 *  <div slot="first">First tab content</div>
 *  <div slot="second">Second tab content</div>
 * </wcp-tabs>
 * ```
 *
 * @example
 * ### Active tab preselected
 * 
 * ```html
 * <wcp-tabs tabs='{"first": "First tab", "second": "Second tab"}' active-tab="second">
 *  <div slot="first">First tab content</div>
 *  <div slot="second">Second tab content</div>
 * </wcp-tabs>
 * ```
 * 
 * @slot tab name - The content of the named tab.
 * @emits wcp-tabs:active-tab-change - Notifies when the active tab changes.
 */
@customElement('wcp-tabs')
export class Tabs extends LitElement {
  static readonly styles = unsafeCSS(styles);

  tabFocus = 0;

  @queryAll('[role="tab"]')
  tabRoles!: HTMLElement[];

  @state()
  code = '';

  @property({ type: Object, reflect: true })
  tabs: Record<string, string> = {};

  @property({ type: String, reflect: true, attribute: 'active-tab' })
  activeTab?: string;

  emitActiveTabChange() {
    const event = new CustomEvent('wcp-tabs:active-tab-change', {
      detail: { activeTab: this.activeTab },
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  @eventOptions({ passive: true })
  handleTabClick(event: Event) {
    const tab = event.target as HTMLButtonElement;
    this.activeTab = tab.dataset.name as typeof this.activeTab;
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

  protected render(): TemplateResult {
    return html`
      <nav role="tablist" aria-label="Sample Tabs" @keydown="${this.handleKeydown}">
        ${map(
          Object.entries(this.tabs),
          ([tab, label]) => html`
            <button
              role="tab"
              aria-selected="${this.activeTab === tab ? 'true' : 'false'}"
              aria-controls="${tab}-panel"
              data-name="${tab}"
              id="${tab}-tab"
              tabindex="${this.activeTab === tab ? '0' : '-1'}"
              @click="${this.handleTabClick}"
            >
              ${label}
            </button>
          `
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
        `
      )}
    `;
  }
}

declare global {
  interface HTMLElementEventMap {
    'wcp-tabs:active-tab-change': CustomEvent<{ activeTab?: string }>;
  }
  interface HTMLElementTagNameMap {
    'wcp-tabs': Tabs;
  }
}
