export function debounce<T extends (...args: Parameters<T>) => void>(this: ThisParameterType<T>, fn: T, wait = 300) {
  let timeoutId: number;
  return (...args: Parameters<T>) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => fn.call(null, ...args), wait);
  };
}
