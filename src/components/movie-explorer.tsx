import { Link } from "react-router-dom";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Search } from "@/components/search";
import { useSkeletonCount } from "@/hooks/useSkeletonCount";
import { CardSkeleton } from "@/components/card-skeleton";
import { useApi } from "@/hooks/useApi";
import { ENDPOINTS } from "@/api/endpoints";
import { MovieCard } from "@/components/card";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useDebounce } from "@/hooks/useDebounce";
import type { MovieExplorerProps, MovieResult } from "@/interface";
import { useWatchlist } from "@/hooks/useWatchlist";

export default function MovieExplorer({
    endpoint,
    searchEnabled = false,
    minCardWidth = 350,
    gap = 4,
}: MovieExplorerProps) {

    const containerRef = useRef<HTMLDivElement>(null);
    const skeletonCount = useSkeletonCount(containerRef as React.RefObject<HTMLElement>);
    const { request, loading } = useApi();
    const { has, toggle } = useWatchlist();

    const [data, setData] = useState<MovieResult | null>(null);

    // Search state (ignored when search is disabled)
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 400);
    const effectiveQuery = useMemo(
        () => (searchEnabled ? debouncedQuery.trim() : ""),
        [searchEnabled, debouncedQuery]
    );
    const isDebouncing = searchEnabled && query.trim() !== "" && debouncedQuery !== query;

    // Build URL (search when query present, otherwise use provided endpoint)
    const buildUrl = useCallback(
        (q: string, page: number) =>
            q.length
                ? `${ENDPOINTS.SEARCH}?query=${encodeURIComponent(q)}&sort_by=popularity.desc&page=${page}`
                : `${endpoint}?sort_by=popularity.desc&page=${page}`,
        [endpoint]
    );

    // Paged fetch
    const fetchMovies = useCallback(async () => {
        const nextPage = data ? (data.page ?? 1) + 1 : 1;
        const res = await request(buildUrl(effectiveQuery, nextPage));
        setData(prev =>
            prev
                ? { ...res, query: effectiveQuery, results: [...prev.results, ...res.results] }
                : { ...res, query: effectiveQuery }
        );
    }, [data, effectiveQuery, request, buildUrl]);

    // Initial + on-query change
    useEffect(() => {
        let cancelled = false;
        (async () => {
            setData(null);
            const res = await request(buildUrl(effectiveQuery, 1));
            if (!cancelled) setData({ ...res, query: effectiveQuery });
        })();
        return () => {
            cancelled = true;
        };
    }, [effectiveQuery, request, buildUrl]);

    // Infinite scroll
    const loadMoreRef = useInfiniteScroll({
        hasMore:
            (data?.total_pages ?? 0) > (data?.page ?? 0) && (data?.query ?? "") === effectiveQuery,
        loading,
        onLoadMore: fetchMovies,
        root: null,
        rootMargin: "500px",
        threshold: 0,
    });

    return (
        <>
            {searchEnabled && (
                <Search
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onClear={() => setQuery("")}
                    loading={isDebouncing}
                />
            )}

            <div
                ref={containerRef}
                className={`isolate grid auto-rows-auto gap-${gap} overflow-visible`}
                style={
                    {
                        ["--min" as any]: `${minCardWidth}px`,
                        gridTemplateColumns: "repeat(auto-fill, minmax(var(--min), 1fr))",
                    } as React.CSSProperties
                }
            >
                {loading &&
                    Array.from({ length: skeletonCount }).map((_, i) => <CardSkeleton key={i} />)}

                {!loading && !isDebouncing && data && (data.results?.length ?? 0) === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
                        <p className="text-lg font-medium">
                            No results
                            {effectiveQuery ? (
                                <>
                                    {" "}
                                    for <span className="font-semibold text-foreground">“{effectiveQuery}”</span>
                                </>
                            ) : null}
                        </p>
                        {searchEnabled && effectiveQuery && (
                            <p className="mt-2 text-sm">
                                Try a different keyword or{" "}
                                <button
                                    className="underline underline-offset-4 hover:no-underline cursor-pointer"
                                    onClick={() => setQuery("")}
                                >
                                    clear the search
                                </button>
                                .
                            </p>
                        )}
                    </div>
                )}

                {data?.results.map((movie: any) => (
                    <Link key={movie.id} to={`/${movie.id}`} className="block">
                        <MovieCard
                            id={movie.id}
                            posterUrl={movie.poster_path}
                            title={movie.original_title}
                            year={movie?.release_date?.split?.("-")?.[0] ?? ""}
                            rating={movie.vote_average}
                            scale={1.2}
                            has={has}
                            toggle={toggle}
                        />
                    </Link>
                ))}
            </div>

            <div ref={loadMoreRef} />
        </>
    );
}
