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
