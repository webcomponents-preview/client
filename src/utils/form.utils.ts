/**
 * Convenient interface to implement form-associated custom elements.
 */
export interface FormAssociated<T> {
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;

  label?: string;
  name?: string;
  value?: T;

  // https://web.dev/more-capable-form-controls/#lifecycle-callbacks
  formAssociatedCallback?: (form: HTMLFormElement) => void;
  formDisabledCallback?: (disabled: boolean) => void;
  formResetCallback?: () => void;
  formStateRestoreCallback?: (state: string | File | FormData | null, mode: 'autocomplete' | 'restore') => void;
}
