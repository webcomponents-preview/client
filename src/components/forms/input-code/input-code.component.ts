import * as monaco from 'monaco-editor';
import monacoStyles from 'monaco-editor/min/vs/editor/editor.main.css';

import { html, LitElement, type PropertyValues, unsafeCSS } from 'lit';
import { customElement, eventOptions, property, query } from 'lit/decorators.js';

import type { FormAssociated } from '@/utils/form.utils.js';
import { Editable } from '@/mixins/editable.mixin.js';

// instruct esbuild to load the CSS file as a string
import styles from './input-code.component.scss';

// configure monaco editor worker paths
// https://github.com/microsoft/monaco-editor/blob/main/samples/browser-esm-esbuild/index.js
self.MonacoEnvironment = {
  getWorkerUrl: function (_, label) {
    switch (label) {
      case 'json':
        return './workers/language/json/json.worker.js';
      case 'css':
      case 'scss':
      case 'less':
        return './workers/language/css/css.worker.js';
      case 'html':
      case 'handlebars':
      case 'razor':
        return './workers/language/html/html.worker.js';
      case 'typescript':
      case 'javascript':
        return './workers/language/typescript/ts.worker.js';
      default:
        return './workers/editor/editor.worker.js';
    }
  },
} as monaco.Environment;

/**
 * A text input element using the wcp style. Fully form aware.
 * Can display multiline text (textarea) if configured to do so.
 *
 * @element wcp-input-code
 *
 * @property {string} label - The label of the input element.
 *
 * @slot hint - Receives optional descriptions below the input.
 *
 * @cssprop --wcp-input-code-hint-size - The font size of the hint.
 * @cssprop --wcp-input-code-label-size - The font size of the label.
 * @cssprop --wcp-input-code-spacing - The inner spacing of the input element.
 *
 * @cssprop --wcp-input-code-dark-background - The background color of the element in dark mode.
 * @cssprop --wcp-input-code-dark-border - The border color of the element in dark mode.
 * @cssprop --wcp-input-code-dark-color - The font color of the input element in dark mode.
 *
 * @cssprop --wcp-input-code-light-background - The background color of the element in light mode.
 * @cssprop --wcp-input-code-light-border - The border color of the element in light mode.
 * @cssprop --wcp-input-code-light-color - The font color of the input element in light mode.
 *
 * @example
 * ## With optional label
 * ```html
 * <wcp-input-code label="With optional label"></wcp-input-code>
 * ```
 *
 * @example
 * ## With optional initial value
 * ```html
 * <wcp-input-code
 *   label="With optional initial value"
 *   value="<strong>Test</strong>"
 *   language="html"
 * ></wcp-input-code>
 * ```
 *
 * @example
 * ## With autosize
 * ```html
 * <wcp-input-code
 *   autosize
 *   label="With optional initial value"
 *   value="<strong>Test</strong>"
 *   language="html"
 * ></wcp-input-code>
 * ```
 *
 * @example
 * ## Used within a form
 * ```html
 * <form>
 *   <wcp-input-code
 *     label="Fully form enabled component"
 *     value="<strong>Test</strong>"
 *     language="html"
 *   ></wcp-input-code>
 *   <button type="submit">Submit</button>
 *   <button type="reset">Reset</button>
 * </form>
 * ```
 */
@customElement('wcp-input-code')
export class InputCode extends Editable()(LitElement) implements FormAssociated<string> {
  static override readonly shadowRootOptions = { ...super.shadowRootOptions, delegatesFocus: true };
  static override readonly styles = [super.formStyles, unsafeCSS(styles), unsafeCSS(monacoStyles)];

  #editor?: monaco.editor.IStandaloneCodeEditor;
  #editorAutoSizeListener?: monaco.IDisposable;
  #editorModelContentChangeListener?: monaco.IDisposable;

  #initialValue?: string;
  #handleColorSchemeToggle = this.handleColorSchemeToggle.bind(this);

  @query('.editor')
  private readonly editor!: HTMLDivElement;

  @query('#internal')
  private readonly input!: HTMLTextAreaElement;

  @property({ type: Boolean, reflect: true })
  autosize = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: String, reflect: true })
  name = 'text';

  @property({ type: String, reflect: true })
  language: 'json' | 'html' | 'handlebars' | 'razor' | 'css' | 'sass' | 'less' | 'javascript' | 'typescript' = 'html';

  @property({ type: String, reflect: true })
  value?: string;

  protected override firstUpdated(props: PropertyValues<this>): void {
    super.firstUpdated(props);
    this.#initialValue = this.value;

    this.checkValidity();
    this.internals.setFormValue(this.value ?? null);

    this.initializeEditor();
    this.updateEditorTheme();
    this.updateEditorAutoSize();
    this.updateEditorDisabled();
  }

  protected initializeEditor() {
    this.#editor = monaco.editor.create(this.editor, {
      value: this.value,
      language: this.language,
      automaticLayout: true,
      wordWrap: 'on',
      wrappingStrategy: 'advanced',
      minimap: { enabled: false },
      overviewRulerBorder: false,
    });

    // bind change listener and sync updated value
    this.#editorModelContentChangeListener?.dispose();
    this.#editorModelContentChangeListener = this.#editor.onDidChangeModelContent(() => {
      const value = this.#editor?.getValue();
      if (value !== this.value) {
        // set to internal textarea
        this.input.value = value ?? '';
        // thus, we hae to manually dispatch an input event
        this.input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      }
    });
  }

  protected updateEditorTheme() {
    monaco.editor.setTheme(this.colorScheme === 'dark' ? 'vs-dark' : 'vs-light');
  }

  protected updateEditorAutoSize() {
    if (this.autosize) {
      // configure scroll handling
      this.#editor?.updateOptions({
        overviewRulerLanes: 0,
        scrollBeyondLastLine: false,
        scrollbar: {
          handleMouseWheel: false,
          vertical: 'hidden',
        },
      });

      // set height initially
      const contentHeight = this.#editor?.getContentHeight() ?? 18;
      this.style.setProperty('---wcp-input-code-height', `${contentHeight + 10}px`);

      // (re-)listen for content height changes
      this.#editorAutoSizeListener?.dispose();
      this.#editorAutoSizeListener = this.#editor?.onDidContentSizeChange(({ contentHeight }) => {
        this.style.setProperty('---wcp-input-code-height', `${contentHeight + 10}px`);
      });
    } else {
      // configure scroll handling
      this.#editor?.updateOptions({
        overviewRulerLanes: undefined,
        scrollBeyondLastLine: undefined,
        scrollbar: {
          handleMouseWheel: true,
          vertical: 'auto',
        },
      });

      // remove height property
      this.style.removeProperty('---wcp-input-code-height');

      // remove listener
      this.#editorAutoSizeListener?.dispose();
    }
  }

  protected updateEditorDisabled() {
    this.#editor?.updateOptions({ readOnly: this.disabled || this.readonly });
  }

  override connectedCallback() {
    super.connectedCallback();

    window.addEventListener('wcp-color-scheme:toggle', this.#handleColorSchemeToggle, false);
  }

  override disconnectedCallback() {
    this.#editorAutoSizeListener?.dispose();
    this.#editorModelContentChangeListener?.dispose();
    this.#editor?.dispose();
    window.removeEventListener('wcp-color-scheme:toggle', this.#handleColorSchemeToggle, false);

    super.disconnectedCallback();
  }

  formResetCallback() {
    this.value = this.#initialValue;

    this.checkValidity();
    this.internals.setFormValue(this.value ?? null);
  }

  checkValidity(): boolean {
    if (!this.input.checkValidity()) {
      this.internals.setValidity({ customError: true }, 'Invalid input');
    } else {
      this.internals.setValidity({});
    }

    return this.internals.validity.valid;
  }

  protected override updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    if (this.#editor === undefined) return;
    const model = this.#editor.getModel();

    if (changedProperties.has('language') && model && model.getLanguageId() !== this.language) {
      monaco.editor.setModelLanguage(model, this.language);
    }
    if (changedProperties.has('disabled') || changedProperties.has('readonly')) {
      this.updateEditorDisabled();
    }
    if (changedProperties.has('autosize')) {
      this.updateEditorAutoSize();
    }
  }

  @eventOptions({ passive: true })
  handleColorSchemeToggle() {
    this.updateEditorTheme();
  }

  @eventOptions({ passive: true })
  handleInput(event: Event) {
    const input = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = input.value === '' ? undefined : input.value;

    this.checkValidity();
    this.internals.setFormValue(this.value ?? null);
  }

  override renderInput(id: string) {
    return html`
      <div id="${id}" class="editor" tabindex="0"></div>
      <textarea
        id="internal"
        name="${this.name}"
        ?required="${this.required}"
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly}"
        .value="${this.value ?? ''}"
        @input="${this.handleInput}"
      ></textarea>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-input-code': InputCode;
  }
}
