"use client";

import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/components/ui/Skeleton";
import MovieCard from "@/components/cards/MovieCard";
import { fetchData } from "@/services/api";
import type { TMDBMovie } from "@/types/tmdb";

interface Props {
  title: string;
  fetchUrl?: string;
  customMovies?: TMDBMovie[];
}

export default function MovieRow({ title, fetchUrl, customMovies }: Props) {
  const { data = [], isLoading } = useQuery<TMDBMovie[]>({
    queryKey: [fetchUrl],
    queryFn: () => fetchData(fetchUrl!),
    enabled: Boolean(fetchUrl),
  });

  const movies = customMovies || data;
  const visibleMovies = movies.filter((movie) => Boolean(movie.poster_path));

  return (
    <div className="mt-12 px-10">
      <h2 className="mb-4 text-lg font-semibold text-white">{title}</h2>

      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        {isLoading
          ? [...Array(5)].map((_, index) => <Skeleton key={index} />)
          : visibleMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
      </div>
    </div>
  );
}
