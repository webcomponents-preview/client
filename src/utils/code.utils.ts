import hljs from 'highlight.js/lib/common';
import { marked } from 'marked';
import pretty from 'pretty';

export function getCodeExample(slot: HTMLSlotElement): string {
  return slot.assignedElements().reduce((acc, el) => `${acc}\n${el.outerHTML}`, '');
}

// configure marked once, to always use our custom component to preview code examples
marked.setOptions({
  highlight(code: string, lang: string) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  renderer: new (class extends marked.Renderer {
    code(preview: string, language = 'plaintext', isEscaped: boolean): string {
      // do not use example component for anything but html examples
      if (language !== 'html') {
        return super.code(preview, language, isEscaped);
      }
      // prettify and highlight the code
      let code = pretty(preview);
      if (this.options.highlight) {
        code = this.options.highlight(code, language) as string;
      }
      // wrap the code in a custom element to preview it
      return `
        <wcp-example>
          <pre slot="code"><code>${code}</code></pre>
          <div slot="preview">${preview}</div>
        </wcp-example>
      `;
    }
  })(),
});

export function renderMarkdown(mardown: string): string {
  return marked(mardown);
}
