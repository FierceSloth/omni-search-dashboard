export function debounce<T, K extends (...arguments_: T[]) => void>(
  callback: K,
  delay: number
): (...arguments_: Parameters<K>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...arguments_: Parameters<K>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...arguments_);
    }, delay);
  };
}
