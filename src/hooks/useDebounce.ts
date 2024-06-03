import { useRef, useCallback } from 'react';

const useDebounce = <T extends (...args: any[]) => void>(callback: T, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);

      return () => timeoutRef.current && clearTimeout(timeoutRef.current)
    },
    [callback, delay]
  );

  return debouncedCallback;
};

export default useDebounce;
