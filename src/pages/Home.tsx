import { Link } from "react-router-dom"
import { Search } from "@/components/search"
import React, { useCallback, useEffect } from "react";
import { useSkeletonCount } from "@/hooks/useSkeletonCount";
import { CardSkeleton } from "@/components/card-skeleton";
import { useApi } from "@/hooks/useApi";
import { ENDPOINTS } from "@/api/endpoints";
import { MovieCard } from "@/components/card";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useDebounce } from "@/hooks/useDebounce";

type ResultProps = {
  page?: number;
  results: any[];
  total_pages: number;
  total_results: number;
  query?: string; // store the current query inside data
};

export default function Dashboard({ minCardWidth = 400, gap = 4 }) {

  const containerRef = React.useRef<HTMLDivElement>(null);
  const skeletonCount = useSkeletonCount(containerRef as React.RefObject<HTMLElement>);
  const [data, setData] = React.useState<ResultProps | null>(null);

  const [query, setQuery] = React.useState("");
  const debouncedQuery = useDebounce(query, 400);
  const [isDebouncing, setIsDebouncing] = React.useState(false);
  const { request, loading } = useApi();

  useEffect(() => {
    if (query.trim() === "") {
      setIsDebouncing(false);
      return;
    }
    setIsDebouncing(true);
    const id = setTimeout(() => setIsDebouncing(false), 400);
    return () => clearTimeout(id);
  }, [debouncedQuery, query]);

  const selectEndpoint = useCallback(
    (q: string, page: number) => {
      const search_endpoint = ENDPOINTS.SEARCH;
      const discover_endpoint = ENDPOINTS.DISCOVER;
      if (q.trim().length > 0) {
        const encoded = encodeURIComponent(q.trim());
        return `${search_endpoint}?query=${encoded}&sort_by=popularity.desc&page=${page}`;
      }
      return `${discover_endpoint}?sort_by=popularity.desc&page=${page}`;
    },
    []
  );

  const fetchMovies = useCallback(async () => {
    const nextPage = data ? (data.page ?? 1) + 1 : 1;
    const url = selectEndpoint(debouncedQuery, nextPage);
    const response = await request(url);
    console.log(response);
    setData((prev) =>
      prev ? { ...response, query: debouncedQuery, results: [...prev.results, ...response.results] } : {
        ...response,
        query: debouncedQuery,
      }
    );
  }, [data, debouncedQuery, request, selectEndpoint]);

  useEffect(() => {
    let isCancelled = false;
    console.log('React.useEffect');
    (async () => {
      // reset first so skeletons show up
      setData(null);
      const url = selectEndpoint(debouncedQuery, 1);
      const response = await request(url);
      if (isCancelled) return;

      setData({ ...response, query: debouncedQuery });
    })();

    return () => {
      isCancelled = true;
    };
  }, [debouncedQuery, request, selectEndpoint]);

  const loadMoreRef = useInfiniteScroll({
    hasMore: (data?.total_pages ?? 0) > (data?.page ?? 0) && (data?.query ?? "") === debouncedQuery,
    loading: loading,
    onLoadMore: fetchMovies,
    root: null,
    rootMargin: "500px",
    threshold: 0,
  });

  return (
    <React.Fragment>
      <Search value={query} onChange={(event) => setQuery(event.target.value)} onClear={() => setQuery("")} loading={isDebouncing} />
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
        {loading && Array.from({ length: skeletonCount }).map((_, i) => <CardSkeleton key={i} />)}
        {/* NEW: No results state */}
        {!loading && !isDebouncing && data && (data.results?.length ?? 0) === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <p className="text-lg font-medium">
              No results{debouncedQuery.trim()
                ? <> for <span className="font-semibold text-foreground">“{debouncedQuery}”</span></>
                : null}
            </p>
            {debouncedQuery.trim() && (
              <p className="mt-2 text-sm">
                Try a different keyword or{" "}
                <button
                  className="underline underline-offset-4 hover:no-underline cursor-pointer"
                  onClick={() => setQuery("")}
                >
                  clear the search
                </button>.
              </p>
            )}
          </div>
        )}
        {data?.results.map((movie: any) => (
          <Link key={movie.id} to={`/${movie.id}`} className="block">
            <MovieCard
              key={movie.id}
              id={movie.id}
              posterUrl={movie.poster_path}
              title={movie.original_title}
              year={movie.release_date.split("-")[0]}
              rating={movie.vote_average}
              scale={1.2}
            />
          </Link>
        ))}
      </div>
      <div ref={loadMoreRef} />
    </React.Fragment>
  )
}
