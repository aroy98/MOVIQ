// src/hooks/useThrottle.ts
import { useEffect, useRef, useState } from "react";

export function useThrottle<T>(value: T, limit: number = 500): T {
    const [throttledValue, setThrottledValue] = useState<T>(value);
    const lastRun = useRef<number>(Date.now());

    useEffect(() => {
        const handler = setTimeout(() => {
            const now = Date.now();
            if (now - lastRun.current >= limit) {
                setThrottledValue(value);
                lastRun.current = now;
            }
        }, limit - (Date.now() - lastRun.current));

        return () => clearTimeout(handler);
    }, [value, limit]);

    return throttledValue;
}
