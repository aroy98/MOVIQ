import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { ENDPOINTS } from "@/api/endpoints";
import { useApi } from "@/hooks/useApi";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { MovieCard } from "@/components/card";
import { X } from "lucide-react";
import { WatchlistButton } from "@/components/watch-list";
import type { Movie } from "@/interface";
import { formatRuntime } from "@/utils";
import { Crew } from "@/components/crew";
import { MovieExplorerSkeleton } from "@/components/movie-explorer-skeleton";
import { useWatchlist } from "@/hooks/useWatchlist";

type TMDBVideo = { key: string; name: string; type: string; site: string };
type TMDBCast = { id: number; name: string; character: string; profile_path: string | null };

export default function MovieDetail() {
    const { id = "" } = useParams();
    const { request, loading } = useApi();

    const [details, setDetails] = useState<any>(null);
    const [videos, setVideos] = useState<TMDBVideo[]>([]);
    const [cast, setCast] = useState<TMDBCast[]>([]);
    const [similar, setSimilar] = useState<any[]>([]);
    const [openTrailer, setOpenTrailer] = useState(false);
    const [trailerKey, setTrailerKey] = useState<string | null>(null);
    const { has, toggle } = useWatchlist();

    useEffect(() => {
        let alive = true;
        const run = async () => {
            try {
                const [d, v, c, s] = await Promise.all([
                    request(ENDPOINTS.MOVIE_DETAILS(id)),
                    request(ENDPOINTS.MOVIE_VIDEOS(id)),
                    request(ENDPOINTS.MOVIE_CREDITS(id)),
                    request(ENDPOINTS.MOVIE_SIMILAR(id)),
                ]);
                if (!alive) return;
                setDetails(d);
                setVideos((v?.results ?? []) as TMDBVideo[]);
                setCast((c?.cast ?? []).slice(0, 12));
                setSimilar((s?.results ?? []).slice(0, 12));
            } catch (e) {
                console.error(e);
            }
        };
        run();
        return () => { alive = false; };
    }, [id, request]);

    const playTrailer = useCallback(() => {
        const yt = videos.find(x => x.site === "YouTube" && (x.type === "Trailer" || x.type === "Teaser"));
        if (yt) {
            setTrailerKey(yt.key);
            setOpenTrailer(true);
        }
    }, [videos]);

    if (!details && loading) {
        return <MovieExplorerSkeleton />;
    }

    if (!details) {
        return (
            <div className="p-6">
                <p>Movie not found.</p>
            </div>
        );
    }

    const year = (details.release_date ?? "").slice(0, 4);
    const runtime = formatRuntime(details.runtime);
    const genres = (details.genres ?? []) as Array<{ id: number; name: string }>;
    const backdrop = details.backdrop_path ? ENDPOINTS.IMAGE(details.backdrop_path, "w1280") : null;
    // const poster = details.poster_path ? ENDPOINTS.IMAGE(details.poster_path, "original") : null;

    const watchlistMovie: Movie = {
        id: Number(id),
        title: details.title,
        year: details?.release_date?.split?.("-")?.[0] ?? "",
        posterUrl: details.poster_path,
        rating: details.vote_average ?? null,
    };

    return (
        <div className="min-h-screen">
            {/* Backdrop header */}
            <div
                className="relative h-[40vh] w-full"
                style={{
                    backgroundImage: backdrop ? `linear-gradient(to top, rgba(0,0,0,.85), rgba(0,0,0,.25)), url(${backdrop})` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                    <h1 className="text-2xl md:text-4xl font-semibold">
                        {details.title} {year ? <span className="opacity-80">({year})</span> : null}
                    </h1>
                    <div className="mt-2 flex flex-wrap items-center gap-2 opacity-90">
                        {runtime && <span>{runtime}</span>}
                        {details.vote_average ? <span>• ⭐ {details.vote_average.toFixed(1)}</span> : null}
                        {details.release_date ? <span>• {details.release_date}</span> : null}
                    </div>
                    <div className="mt-3 flex gap-2">
                        {genres.map(g => (
                            <Badge variant="secondary" key={g.id}>{g.name}</Badge>
                        ))}
                    </div>
                    <div className="mt-4">
                        {videos?.length ? (
                            <Button size="sm" className="cursor-pointer" onClick={playTrailer}>Watch trailer</Button>
                        ) : null}
                    </div>
                </div>
                <div
                    className="
                            fixed md:absolute
                            bottom-[calc(env(safe-area-inset-bottom)+16px)] right-4
                            md:bottom-auto md:right-6 md:top-6
                            z-30
                        "
                >
                    <WatchlistButton movie={watchlistMovie} aria-label="Add to Watchlist" has={has} toggle={toggle} />
                </div>
            </div>

            {/* Main content */}
            <div className="w-full -mt-10 pb-12">
                <Card className="overflow-hidden">
                    <CardContent className="p-4 md:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-[220px,1fr] gap-6">
                            <div>
                                {details.tagline ? (
                                    <p className="italic opacity-80 mb-3">“{details.tagline}”</p>
                                ) : null}
                                {details.overview ? (
                                    <>
                                        <h2 className="text-lg font-semibold mb-2">Overview</h2>
                                        <p className="leading-7">{details.overview}</p>
                                    </>
                                ) : null}

                                {/* Key people */}
                                <Crew details={details} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Cast */}
                {cast.length ? (
                    <>
                        <h3 className="text-xl font-semibold mt-10 mb-3">Top Billed Cast</h3>
                        <div
                            className="grid gap-4 justify-center"
                            style={{
                                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                            }}
                        >
                            {cast.map((person) => (
                                <Card
                                    key={person.id}
                                    className="overflow-hidden min-w-[180px] max-w-[220px] mx-auto"
                                >
                                    <CardContent className="p-0">
                                        {person.profile_path ? (
                                            <img
                                                src={ENDPOINTS.IMAGE(person.profile_path, "w342")}
                                                alt={person.name}
                                                className="w-full h-auto object-contain bg-black/5"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full min-w-[196px] aspect-[2/3] bg-muted" />
                                        )}
                                        <div className="p-3 text-center">
                                            <div className="font-medium truncate">{person.name}</div>
                                            <div className="text-sm opacity-80 truncate">
                                                {person.character}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </>
                ) : null}


                {/* Similar movies */}
                {similar.length ? (
                    <>
                        <h3 className="text-xl font-semibold mt-10 mb-3">Similar Movies</h3>
                        <div className="grid auto-rows-auto gap-4"
                            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
                            {similar.map((m) => (
                                <Link key={m.id} to={`/${m.id}`} className="block">
                                    <MovieCard
                                        key={m.id}
                                        id={m.id}
                                        posterUrl={m.poster_path ? ENDPOINTS.IMAGE(m.poster_path, "w342") : ""}
                                        title={m.title ?? m.original_title}
                                        year={(m.release_date ?? "").slice(0, 4)}
                                        rating={m.vote_average}
                                        has={has}
                                        toggle={toggle}
                                    />
                                </Link>
                            ))}
                        </div>
                    </>
                ) : null}
            </div>

            {/* Trailer dialog */}

            <Dialog open={openTrailer} onOpenChange={setOpenTrailer}>
                <DialogContent
                    className="min-w-[75vw] min-h-[75vh] p-0 bg-black border-none shadow-none overflow-hidden"
                >
                    {/* Close button */}
                    <DialogClose
                        className="absolute right-3 top-3 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full/0 text-white hover:opacity-80 focus:outline-none cursor-pointer"
                        aria-label="Close"
                    >
                        <X className="h-6 w-6" />
                    </DialogClose>

                    {/* Video only */}
                    {trailerKey ? (
                        <div className="w-full h-full">
                            <iframe
                                className="block w-full h-full"
                                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
                                title="Trailer"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    ) : null}
                </DialogContent>
            </Dialog>
        </div>
    );
}

