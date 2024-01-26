/**
 * Convenient interface to implement form-associated custom elements.
 */
export type FormAssociated<T> = {
    disabled?: boolean;
    readonly?: boolean;
    required?: boolean;
    label?: string;
    name?: string;
    value?: T;
    formAssociatedCallback?: (form: HTMLFormElement) => void;
    formDisabledCallback?: (disabled: boolean) => void;
    formResetCallback?: () => void;
    formStateRestoreCallback?: (state: string | File | FormData | null, mode: 'autocomplete' | 'restore') => void;
};
