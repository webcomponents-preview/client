import { LitElement } from 'lit';
/**
 * A helper element to declare options for a `wcp-input-select` element.
 *
 * @element wcp-input-select-option
 */
export declare class InputSelectOption extends LitElement {
    disabled: boolean;
    value?: string;
    label?: string;
    protected createRenderRoot(): HTMLElement | DocumentFragment;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-input-select-option': InputSelectOption;
    }
}
