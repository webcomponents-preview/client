export declare function debounce<T extends (...args: Parameters<T>) => void>(this: ThisParameterType<T>, fn: T, wait?: number): (...args: Parameters<T>) => void;
