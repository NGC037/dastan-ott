"use client";

import { useQuery } from "@tanstack/react-query";
import { endpoints, fetchData } from "@/services/api";
import { useAppStore } from "@/store/useAppStore";

export default function Hero() {
  const addToList = useAppStore((s) => s.addToList);
  const { data: movies = [] } = useQuery({
    queryKey: ["trending"],
    queryFn: () => fetchData(endpoints.trending),
  });

  const movie = movies[Math.floor(Math.random() * movies.length)];

  if (!movie) return null;

  return (
    <section className="relative h-[85vh] flex items-end px-10 pb-24">
      <div className="absolute inset-0 -z-10">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="max-w-xl">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">{movie.title}</h1>

        <p className="text-zinc-300 mb-6 text-sm md:text-base">
          {movie.overview?.slice(0, 150)}...
        </p>

        <div className="flex gap-4">
          <button className="bg-white text-black px-6 py-2 rounded-md font-medium">
            ▶ Play
          </button>
          <button
            onClick={() => addToList(movie)}
            className="bg-white/20 px-6 py-2 rounded-md"
          >
            + My List
          </button>
        </div>
      </div>
    </section>
  );
}
