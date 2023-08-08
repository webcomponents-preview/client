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
  export declare global {
    HTMLElementTagNameMap['lit-code'] = LitCode;
  }
  export class LitCode extends HTMLElement {
    linenumbers: boolean;
    noshadow: boolean;
    mycolors: boolean;
    code: string;
    language: string;
    grammar: string;

    getCode(): string;
    setCode(code: string): void;
  }
}

// FIXME: unfortunately, this is not working yet
declare global {
  type EachFunc = (this: Context, params: Record<string, any>, done: Done) => void;
  type EachAsyncFunc = (this: Context, params: Record<string, any>) => PromiseLike<any>;

  namespace Mocha {
    interface TestFunction {
      each(
        strings: TemplateStringsArray,
        ...placeholders: any[]
      ): {
        (fn: EachFunc): Test;
        (fn: EachAsyncFunc): Test;
        (title: string, fn?: EachFunc): Test;
        (title: string, fn?: EachAsyncFunc): Test;
      };
    }
  }
}
