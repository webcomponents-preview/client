import { marked } from 'marked';
import prism from 'prismjs';
import 'prismjs/components/prism-cshtml.js';

export function getCodeExample(slot: HTMLSlotElement): string {
  return slot.assignedElements().reduce((acc, el) => `${acc}\n${el.outerHTML}`, '');
}

export class Renderer extends marked.Renderer {
  constructor(private readonly addCodePreview = true, private readonly previewTagName?: string) {
    super();
  }

  override code(code: string, language = 'plaintext', escaped = false): string {
    // do not use example component for anything but html examples
    if (language !== 'html' || !this.addCodePreview) {
      return `<wcp-code>${super.code(code, language, escaped)}</wcp-code>`;
    }

    // if a tag name is provided, use it to parametrize the preview component
    const previewTagName = this.previewTagName ? ` preview-tag-name="${this.previewTagName}"` : '';

    // wrap the code in a custom element to preview it
    return `
      <wcp-markdown-example>
        <wcp-code slot="code">${super.code(code, language, escaped)}</wcp-code>
        <wcp-preview slot="preview"${previewTagName}>${code}</wcp-preview>
      </wcp-markdown-example>
    `;
  }
}

export function resolveRelativePath(path: string): string {
  const stripLeadingSlash = (str: string) => str.replace(/^\//, '');
  const url = new URL(`/${stripLeadingSlash(path)}`, location.origin);
  return stripLeadingSlash(url.pathname);
}

/**
 * Only relative links will be handled. If a markdown file (*.md, *.mdx) is linked, it will be prefixed with the route additionally.
 */
export function prefixRelativeUrls(markdown: string, currentPath: string, basePath = ''): string {
  const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/') + 1);
  // https://regex101.com/r/mi812s/7
  return markdown.replace(
    /((?:\[[^\]]*\]\()|(?:href|src)=["'])(?!(?:[a-z]+:\/\/)|\/)(?:\.\/)?([^)]*?)(\.mdx?)?(?:#(.*?))?(\)|["'])/gi,
    (_, before, path = '', ext = '', hash = '', after) => {
      const isMarkdownLink = ext !== '';
      const hasPath = path !== '';
      const hasHash = hash !== '';
      const isHashLink = hasHash && !hasPath;
      if (isMarkdownLink || isHashLink) {
        const nextPath = hasPath ? resolveRelativePath(`${currentDir}${path}${ext}`) : currentPath;
        const link = encodeURIComponent(nextPath);
        const section = hasHash ? `/${hash}` : '';
        return `${before}${basePath}${link}${section}${after}`;
      }
      // is any assetic relative link
      const nextPath = resolveRelativePath(`${currentDir}${path}${ext}`);
      return [before, nextPath, after].join('');
    }
  );
}

export function renderMarkdown(mardown: string, addCodePreview = true, previewTagName?: string): string {
  return marked(mardown, {
    highlight(code, lang) {
      if (lang === undefined) return code;
      return prism.highlight(code, prism.languages[lang], lang);
    },
    renderer: new Renderer(addCodePreview, previewTagName),
  });
}
