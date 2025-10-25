// src/pages/WatchlistPage.tsx
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useWatchlist } from "@/hooks/useWatchlist";
import { MovieCard } from "@/components/card";
import { Card } from "@/components/ui/card";

export default function Watchlist() {
  const { list } = useWatchlist();
  const navigate = useNavigate();

  const empty = useMemo(() => list.length === 0, [list]);

  if (empty) {
    return (
      <Card className="p-10 text-center">
        <h2 className="text-xl font-semibold">Your Watchlist is empty</h2>
        <p className="text-muted-foreground mt-2">
          Browse movies and tap “Watchlist” to save them here.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
      {list.map((movie) => (
        <MovieCard
          key={`movie-${movie.id}`}
          id={movie.id}
          title={movie.title}
          year={movie.year}
          rating={movie.rating}
          posterUrl={movie.posterUrl}
          onClick={() => navigate(`/${movie.id}`)}
        />
      ))}
    </div>
  );
}
