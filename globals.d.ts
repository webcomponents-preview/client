/* eslint-disable @typescript-eslint/no-explicit-any */

// Tell Typescript that SASS imports are okay as they're handled by bundler
declare module '*.scss' {
  export const styles: string;
  export default styles;
}

declare module '*.css' {
  export const styles: string;
  export default styles;
}

declare module '*.svg' {
  export const content: string;
  export default content;
}

declare module 'lit-code' {
  import type { LitElement } from 'lit';

  export declare global {
    HTMLElementTagNameMap['lit-code'] = LitCode;
  }
  export class LitCode extends LitElement {
    elContainer: HTMLElement;
    elTextarea: HTMLTextAreaElement;
    linenumbers: boolean;
    noshadow: boolean;
    mycolors: boolean;
    code: string;
    language: string;
    grammar: string;

    _getElement<T extends HTMLElement = HTMLElement>(id: string): T;
    getCode(): string;
    setCode(code: string): void;
  }
}

declare module 'mocha' {
  declare global {
    type EachFunc = (this: Context, params: Record<string, any>, done: Done) => void;
    type EachAsyncFunc = (this: Context, params: Record<string, any>) => PromiseLike<any>;

    namespace Mocha {
      interface TestFunction {
        each(
          strings: TemplateStringsArray,
          ...placeholders: any[]
        ): {
          (fn: EachFunc | EachAsyncFunc): Test;
          (title: string, fn?: EachFunc | EachAsyncFunc): Test;
        };
      }
    }

    declare var it: Mocha.TestFunction;
  }
}
