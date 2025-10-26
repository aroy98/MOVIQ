import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star } from "lucide-react";
import { ENDPOINTS } from "@/api/endpoints";
import { WatchlistButton } from "@/components/watch-list";
import type { Movie, MovieCardProps } from "@/interface"


export function MovieCard({
  id,
  posterUrl,
  title,
  year,
  rating,
  onClick,
  scale = 1.03,
  has,
  toggle
}: MovieCardProps) {
  const fallback =
    "data:image/svg+xml;charset=UTF-8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='600'>
        <rect width='100%' height='100%' fill='#e5e7eb'/>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#6b7280' font-family='Arial' font-size='20'>No Poster</text>
      </svg>`
    );

  const watchlistMovie: Movie = {
    id,
    title,
    year,
    posterUrl,     // can be raw TMDB path; your ENDPOINTS handles full URL
    rating: rating ?? null,
  };

  const label = `${title} (${year}) average rating ${typeof rating === "number" ? rating.toFixed(1) : "N/A"}`;

  return (
    <Card
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={onClick}
      className={[
        "group relative overflow-hidden rounded-2xl border bg-card/50",
        "transition-all duration-300 ease-out",
        "hover:scale-[1.03] hover:-translate-y-0.5 hover:shadow-2xl",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "will-change-transform",
        "shadow-sm py-0",
      ].join(" ")}
      style={
        {
          "--tw-scale-x": String(scale),
          "--tw-scale-y": String(scale),
        } as React.CSSProperties
      }
    >
      <AspectRatio ratio={2 / 3} className="relative">

        <div className="absolute left-2 top-2 z-20">
          <WatchlistButton movie={watchlistMovie} has={has} toggle={toggle} />
        </div>

        <img
          src={ENDPOINTS.IMAGE(posterUrl, "w342") || fallback}
          alt={`${title} poster`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = fallback;
          }}
        />

        {/* Soft gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />

        {/* Rating badge (top-right) */}
        <div className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white backdrop-blur-sm ring-1 ring-white/10">
          <Star className="h-3.5 w-3.5 fill-yellow-400 stroke-yellow-400" aria-hidden="true" />
          <span className="font-semibold tabular-nums">
            {typeof rating === "number" ? rating.toFixed(1) : "—"}
          </span>
        </div>

        {/* Title badge (bottom-left) */}
        <div className="absolute bottom-2 left-2 z-10 max-w-[70%] rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm ring-1 ring-white/10 truncate">
          {title}
        </div>

        {/* Year badge (bottom-right) */}
        <div className="absolute bottom-2 right-2 z-10 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm ring-1 ring-white/10">
          {year}
        </div>

        {/* Subtle sheen on hover */}
        <div className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/2 rotate-12 bg-white/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20" />
      </AspectRatio>
    </Card>
  );
}
