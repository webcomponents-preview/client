import { Renderer } from 'marked';
export declare function getCodeExample(slot: HTMLSlotElement): string;
/**
 * Custom marked renderer to wrap code in a custom element.
 */
export declare class CustomRenderer extends Renderer {
    #private;
    private readonly addCodePreview;
    private readonly previewTagName?;
    constructor(addCodePreview?: boolean, previewTagName?: string | undefined);
    storeRawCode(raw: string, highlighted: string): void;
    code(code: string, language?: string, escaped?: boolean): string;
}
export declare function resolveRelativePath(path: string): string;
/**
 * Only relative links will be handled. If a markdown file (*.md, *.mdx) is linked, it will be prefixed with the route additionally.
 */
export declare function prefixRelativeUrls(markdown: string, currentPath: string, basePath?: string): string;
/**
 * Maps a given markdown code block language to a prism grammar.
 */
export declare function mapLangToGrammar(lang: string): string;
/**
 * Convenience function to render a given markdown string to html.
 */
export declare function renderMarkdown(markdown: string, addCodePreview?: boolean, previewTagName?: string): Promise<string>;
