import { useCallback, useRef } from "react";

type Options = {
    /** Are there more pages to load? */
    hasMore: boolean;
    /** Are you currently fetching? Prevents duplicate loads. */
    loading: boolean;
    /** Trigger your fetch for the next page */
    onLoadMore: () => void | Promise<void>;
    /** Root element for the observer (null = viewport) */
    root?: Element | null;
    /** Start loading early (e.g., "400px") */
    rootMargin?: string;
    /** 0..1; how much of the sentinel must be visible */
    threshold?: number;
    /** Disable the observer entirely */
    disabled?: boolean;
};

/**
 * Returns a *callback ref* — assign it to your sentinel element.
 * When the sentinel intersects the viewport, `onLoadMore` fires.
 */
export function useInfiniteScroll({
    hasMore,
    loading,
    onLoadMore,
    root = null,
    rootMargin = "400px",
    threshold = 0,
    disabled = false,
}: Options) {
    const observerRef = useRef<IntersectionObserver | null>(null);

    const attach = useCallback(
        (node: Element | null) => {
            // Clean up any previous observer
            if (observerRef.current) {
                observerRef.current.disconnect();
                observerRef.current = null;
            }
            if (!node || disabled || !hasMore) return;

            // Guard for environments without IO (very old browsers / SSR)
            if (typeof IntersectionObserver === "undefined") {
                // Fallback: fire once when we attach and let caller handle pagination UX
                if (!loading) onLoadMore();
                return;
            }

            const observer = new IntersectionObserver(
                (entries) => {
                    const entry = entries[0];
                    if (entry.isIntersecting && !loading) onLoadMore();
                },
                { root, rootMargin, threshold }
            );

            observer.observe(node);
            observerRef.current = observer;
        },
        [disabled, hasMore, loading, onLoadMore, root, rootMargin, threshold]
    );

    return attach;
}
