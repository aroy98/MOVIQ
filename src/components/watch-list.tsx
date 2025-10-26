// src/components/WatchlistButton.tsx
import { Bookmark, BookmarkCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WatchListProps } from "@/interface";


export function WatchlistButton({ movie, className, size = 18, has, toggle }: WatchListProps) {

  const inList = has(movie.id);
  
  return (
    <button
      type="button"
      aria-pressed={inList}
      aria-label={inList ? "Remove from Watchlist" : "Add to Watchlist"}
      onClick={(e) => {
        toggle(movie);
        e.preventDefault();
      }}
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white",
        "backdrop-blur-sm ring-1 ring-white/10 hover:bg-black/70 cursor-pointer",
        className
      )}
    >
      {inList ? <BookmarkCheck width={size} height={size} /> : <Bookmark width={size} height={size} />}
      <span className="font-semibold">{inList ? "Saved" : "Watchlist"}</span>
    </button>
  );
}
