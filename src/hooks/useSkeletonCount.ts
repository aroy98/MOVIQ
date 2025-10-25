import * as React from "react";

export function useSkeletonCount<T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  minCardWidth: number = 180,
  rows: number = 2
): number {
  const [count, setCount] = React.useState(12);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const columns = Math.max(1, Math.floor(width / minCardWidth));
      const total = Math.max(columns * rows, rows * 2);
      setCount(total);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, minCardWidth, rows]);

  return count;
}
