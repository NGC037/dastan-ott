"use client";

import { useQuery } from "@tanstack/react-query";
import MovieCard from "@/components/cards/MovieCard";
import { fetchData } from "@/services/api";

interface Props {
  title: string;
  fetchUrl: string;
}

export default function MovieRow({ title, fetchUrl }: Props) {
  const { data: movies = [] } = useQuery({
    queryKey: [fetchUrl],
    queryFn: () => fetchData(fetchUrl),
  });

  return (
    <div className="px-10 mt-12">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        {movies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
