import { marked, Renderer } from 'marked';
import { markedHighlight } from 'marked-highlight';
import * as Prism from 'prismjs';

export function getCodeExample(slot: HTMLSlotElement): string {
  return slot.assignedElements().reduce((acc, el) => `${acc}\n${el.outerHTML}`, '');
}

/**
 * Custom marked renderer to wrap code in a custom element.
 */
export class CustomRenderer extends Renderer {
  // for some unknown reason, the raw code is no more available in the code renderer since we switched
  // marked to asynchronous highlighting. Thus, we store the raw code along with the highlighted code
  // for later use in this convenient internal map.
  #rawCodeMap = new Map<string, string>();

  constructor(
    private readonly addCodePreview = true,
    private readonly previewTagName?: string,
  ) {
    super();
  }

  storeRawCode(raw: string, highlighted: string) {
    this.#rawCodeMap.set(highlighted, raw);
  }

  override code(code: string, language = 'plaintext', escaped = false): string {
    // do not use example component for anything but html examples
    if (language !== 'html' || !this.addCodePreview || (escaped && !this.#rawCodeMap.has(code))) {
      return `<wcp-code>${super.code(code, language, escaped)}</wcp-code>`;
    }

    // if a tag name is provided, use it to parametrize the preview component
    const previewTagName = this.previewTagName ? ` preview-tag-name="${this.previewTagName}"` : '';
    const raw = escaped ? this.#rawCodeMap.get(code) : code;

    // wrap the code in a custom element to preview it
    return `
      <wcp-markdown-example>
        <wcp-code slot="code">${super.code(code, language, escaped)}</wcp-code>
        <wcp-preview slot="preview"${previewTagName}>${raw}</wcp-preview>
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
    },
  );
}

/**
 * Maps a given markdown code block language to a prism grammar.
 */
export function mapLangToGrammar(lang: string): string {
  switch (lang) {
    case 'ts':
      return 'prism-typescript';
    case 'js':
      return 'prism-javascript';
    case 'html':
      return 'prism-cshtml';
    default:
      return `prism-${lang}`;
  }
}

/**
 * Convenience function to render a given markdown string to html.
 */
export async function renderMarkdown(
  markdown: string,
  addCodePreview = true,
  previewTagName?: string,
): Promise<string> {
  // prepare an individual renderer
  const renderer = new CustomRenderer(addCodePreview, previewTagName);

  // instruct individual highlighting for language
  marked.use(
    markedHighlight({
      async: true,
      async highlight(code, lang) {
        // no language, no highlight
        if (lang === undefined) return code;
        // load grammar if not already loaded
        if (!Prism.languages[lang]) {
          try {
            await import(`/grammars/${mapLangToGrammar(lang)}.js`);
          } catch (e) {
            return code;
          }
        }
        // highlight code and store it for later use in renderer
        const highlighted = Prism.highlight(code, Prism.languages[lang], lang);
        renderer.storeRawCode(code, highlighted);
        return highlighted;
      },
    }),
  );

  return marked(markdown, { renderer });
}
