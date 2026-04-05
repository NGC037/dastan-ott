"use client";

import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import MovieCard from "@/components/cards/MovieCard";
import PageSkeleton from "@/components/ui/PageSkeleton";
import Skeleton from "@/components/ui/Skeleton";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { endpoints, fetchData, fetchSearchMovies } from "@/services/api";
import { useAppStore } from "@/store/useAppStore";
import type { TMDBMovie } from "@/types/tmdb";

export default function SearchPage() {
  const router = useRouter();
  const { isReady } = useProtectedRoute();
  const setSelectedMovie = useAppStore((state) => state.setSelectedMovie);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 350);

  const { data: trending = [], isLoading: isTrendingLoading } = useQuery<
    TMDBMovie[]
  >({
    queryKey: ["search-trending"],
    queryFn: () => fetchData(endpoints.trending),
  });

  const { data: searchResults = [], isLoading: isSearching } = useQuery<
    TMDBMovie[]
  >({
    queryKey: ["search", debouncedQuery],
    queryFn: () => fetchSearchMovies(debouncedQuery),
    enabled: debouncedQuery.trim().length > 0,
  });

  const suggestions = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return trending.slice(0, 5);
    }

    return searchResults.slice(0, 5);
  }, [debouncedQuery, searchResults, trending]);

  const groupedResults = useMemo(
    () => ({
      movies: debouncedQuery.trim() ? searchResults : [],
      trending: trending.slice(0, 8),
    }),
    [debouncedQuery, searchResults, trending],
  );

  if (!isReady) {
    return <div className="min-h-[60vh] bg-black" />;
  }

  const handleSelectMovie = (movie: TMDBMovie) => {
    setSelectedMovie(movie);
    router.push(`/movie/${movie.id}`);
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="px-8 py-8 text-white"
    >
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-zinc-950 to-black p-6 shadow-2xl shadow-black/30">
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            Search
          </p>
          <h1 className="mt-3 text-4xl font-semibold">Find your next story</h1>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Real-time discovery across Dastan&apos;s trending and movie catalog.
          </p>

          <div className="relative mt-8">
            <input
              type="text"
              placeholder="Search movies, moods, genres..."
              className="w-full rounded-[1.4rem] border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none transition focus:border-red-500/40"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />

            <div className="absolute left-0 right-0 top-[calc(100%+12px)] z-30 overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-950/95 shadow-2xl shadow-black/50 backdrop-blur-xl">
              <div className="border-b border-white/5 px-5 py-3 text-xs uppercase tracking-[0.35em] text-zinc-500">
                {debouncedQuery.trim() ? "Suggestions" : "Trending now"}
              </div>

              {(isSearching && debouncedQuery.trim()) ||
              (isTrendingLoading && !debouncedQuery.trim()) ? (
                <div className="space-y-3 p-4">
                  <Skeleton className="h-16 min-w-0" />
                  <Skeleton className="h-16 min-w-0" />
                  <Skeleton className="h-16 min-w-0" />
                </div>
              ) : suggestions.length > 0 ? (
                suggestions.map((movie) => (
                  <button
                    key={movie.id}
                    type="button"
                    onClick={() => handleSelectMovie(movie)}
                    className="flex w-full items-center justify-between border-b border-white/5 px-5 py-4 text-left transition-colors last:border-b-0 hover:bg-white/[0.04]"
                  >
                    <div>
                      <p className="font-medium text-white">{movie.title}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.28em] text-zinc-500">
                        {debouncedQuery.trim() ? "Movie match" : "Trending"}
                      </p>
                    </div>
                    <span className="text-sm text-zinc-400">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-5 py-8 text-sm text-zinc-400">
                  No titles found for &quot;{debouncedQuery}&quot;.
                </div>
              )}
            </div>
          </div>
        </div>

        {(isTrendingLoading && !trending.length) || (isSearching && !searchResults.length) ? (
          <PageSkeleton />
        ) : (
          <div className="mt-24 space-y-14">
            {debouncedQuery.trim() && (
              <section>
                <div className="mb-5 flex items-end justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
                      Movies
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold">
                      Results for &quot;{debouncedQuery}&quot;
                    </h2>
                  </div>
                  <p className="text-sm text-zinc-500">
                    {groupedResults.movies.length} titles
                  </p>
                </div>

                {groupedResults.movies.length > 0 ? (
                  <div className="flex flex-wrap gap-4">
                    {groupedResults.movies.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8 text-zinc-400">
                    Nothing matched yet. Try a broader title or genre.
                  </div>
                )}
              </section>
            )}

            <section>
              <div className="mb-5">
                <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
                  Trending
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Everyone is watching these
                </h2>
              </div>

              <div className="flex flex-wrap gap-4">
                {groupedResults.trending.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </motion.main>
  );
}
