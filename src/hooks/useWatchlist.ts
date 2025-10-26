
import type { Movie } from "@/interface";
import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "moviq:watchlist:v1";

function readStorage(): Record<number, Movie> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeStorage(map: Record<number, Movie>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}



export function useWatchlist() {
  const [map, setMap] = useState<Record<number, Movie>>(() => readStorage());

  useEffect(() => {
    writeStorage(map);
  }, [map]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setMap(readStorage());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const list = useMemo(() => Object.values(map), [map]);

  const has = useCallback((id: number) => !!map[id], [map]);

  const add = useCallback((movie: Movie) => {
    setMap(prev => ({ ...prev, [movie.id]: movie }));
  }, []);

  const remove = useCallback((id: number) => {
    setMap(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  }, [map]);

  const toggle = useCallback((movie: Movie) => {
    setMap(prev => {
      const copy = { ...prev };
      if (copy[movie.id]) delete copy[movie.id];
      else copy[movie.id] = movie;
      return copy;
    });
  }, [map]);

  return { list, has, add, remove, toggle };
}
