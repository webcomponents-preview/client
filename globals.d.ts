// Tell Typescript that SASS imports are okay as they're handled by bundler
declare module '*.scss' {
  export const styles: string;
}

declare module '*.css' {
  export const styles: string;
}

declare module '*.svg' {
  export const content: string;
}
