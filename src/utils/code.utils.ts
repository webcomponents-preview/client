import hljs from 'highlight.js/lib/common';
import { marked } from 'marked';
import pretty from 'pretty';

export function getCodeExample(slot: HTMLSlotElement): string {
  return slot.assignedElements().reduce((acc, el) => `${acc}\n${el.outerHTML}`, '');
}

// export const replacements = {
//   '&': '&amp;',
//   '<': '&lt;',
//   '>': '&gt;',
//   '"': '&quot;',
//   "'": '&#39;',
// };

// export function escapeCode(code: string): string {
//   const keys = Object.keys(replacements).join('|');
//   const regex = new RegExp(`(${keys})`, 'g');
//   return code.replace(regex, (match) => replacements[match as keyof typeof replacements]);
// }

// configure marked once, to always use our custom component to preview code examples
marked.setOptions({
  highlight(code: string, lang: string) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  renderer: new (class extends marked.Renderer {
    code(preview: string, language = 'plaintext'): string {
      let code = pretty(preview);
      if (this.options.highlight) {
        code = this.options.highlight(code, language) as string;
      }
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
