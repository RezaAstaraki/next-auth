import { useRef, useCallback, useEffect } from "react";

type Props = {
  callback: () => void;
  delay: number;
};

export function useDebounce({ callback, delay }: Props) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(callback, delay);
  }, [callback, delay]);

  return debouncedFunction;
}



type useProps = {
  callback: () => void;
  delay: number;
  deps: any[]; 
};

export function useDebounceEffect({ callback, delay, deps }: useProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(callback, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, deps);
}