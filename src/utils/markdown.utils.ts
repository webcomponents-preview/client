import hljs from 'highlight.js/lib/common';
import { marked } from 'marked';
import pretty from 'pretty';

export function getCodeExample(slot: HTMLSlotElement): string {
  return slot.assignedElements().reduce((acc, el) => `${acc}\n${el.outerHTML}`, '');
}

/**
 * Only relative links will be handled. If a markdown file (*.md, *.mdx) is linked, it will be prefixed with the route additionally.
 */
export function prefixRelativeUrls(markdown: string, base: string, route = ''): string {
  const path = base.substring(0, base.lastIndexOf('/') + 1);
  // https://regex101.com/r/mi812s/4
  return markdown.replace(
    /(\[[^\]]*\]\()(?!(?:[a-z]+:\/\/)|\/)(?:\.\/)?([^)]*?)(\.mdx?)?(?:#(.*))?(\))/gi,
    (_, before, url = '', ext = '', id = '', after) => {
      const isMarkdownLink = ext !== '';
      const hasUrl = url !== '';
      const isHashLink = id !== '' && !hasUrl;
      if (isMarkdownLink || isHashLink) {
        const link = encodeURIComponent(hasUrl ? `${url}${ext}` : base);
        const hash = id !== '' ? `/${id}` : '';
        return `${before}${route}${link}${hash}${after}`;
      }
      // is any assetic relative link
      return [before, path, url, ext, after].join('');
    }
  );
}

export function renderMarkdown(mardown: string, addCodePreview = true): string {
  return marked(mardown, {
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
        return addCodePreview
          ? `
            <wcp-markdown-example>
              <wcp-code slot="code"><pre><code>${code}</code></pre></wcp-code>
              <div slot="preview">${preview}</div>
            </wcp-markdown-example>
          `
          : `
            <wcp-code><pre><code>${code}</code></pre></wcp-code>
          `;
      }
    })(),
  });
}
