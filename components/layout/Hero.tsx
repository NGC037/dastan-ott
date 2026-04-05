"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { endpoints, fetchData } from "@/services/api";
import { useAppStore } from "@/store/useAppStore";
import type { TMDBMovie } from "@/types/tmdb";

export default function Hero() {
  const addToList = useAppStore((state) => state.addToList);

  const { data: movies = [] } = useQuery<TMDBMovie[]>({
    queryKey: ["trending"],
    queryFn: () => fetchData(endpoints.trending),
  });

  const featuredMovie = movies[0] ?? null;

  if (!featuredMovie) {
    return null;
  }

  return (
    <section className="relative flex h-[85vh] items-end px-10 pb-24">
      <div className="absolute inset-0 -z-10">
        <Image
          src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
          alt={featuredMovie.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      <div className="max-w-xl">
        <h1 className="text-5xl font-bold leading-tight md:text-7xl">
          {featuredMovie.title}
        </h1>

        <p className="mb-6 text-sm text-zinc-300 md:text-base">
          {featuredMovie.overview?.slice(0, 150)}...
        </p>

        <div className="flex gap-4">
          <button
            type="button"
            className="rounded-md bg-white px-6 py-2 font-medium text-black"
          >
            Play
          </button>
          <button
            type="button"
            onClick={() => addToList(featuredMovie)}
            className="rounded-md bg-white/20 px-6 py-2"
          >
            + My List
          </button>
        </div>
      </div>
    </section>
  );
}
