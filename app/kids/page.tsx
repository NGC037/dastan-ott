"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchData, endpoints } from "@/services/api";
import { KIDS_ROW_KEYWORDS } from "@/lib/content";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useAppStore } from "@/store/useAppStore";
import type { TMDBMovie } from "@/types/tmdb";

function filterKidsMovies(movies: TMDBMovie[]) {
  return movies.filter((movie) => {
    const haystack =
      `${movie.title ?? ""} ${movie.overview ?? ""}`.toLowerCase();

    return KIDS_ROW_KEYWORDS.some((keyword) => haystack.includes(keyword));
  });
}

export default function KidsPage() {
  const router = useRouter();
  const { isReady, profile } = useProtectedRoute();
  const setSelectedMovie = useAppStore((state) => state.setSelectedMovie);

  const { data: trending = [] } = useQuery<TMDBMovie[]>({
    queryKey: ["kids-trending"],
    queryFn: () => fetchData(endpoints.trending),
  });

  const { data: popular = [] } = useQuery<TMDBMovie[]>({
    queryKey: ["kids-popular"],
    queryFn: () => fetchData(endpoints.popular),
  });

  useEffect(() => {
    if (profile && profile !== "kids") {
      router.replace("/");
    }
  }, [profile, router]);

  if (!isReady || profile !== "kids") {
    return <div className="min-h-[60vh] bg-black" />;
  }

  const featuredKids = filterKidsMovies(trending).slice(0, 6);
  const playfulPicks = filterKidsMovies(popular).slice(0, 6);

  const renderCard = (movie: TMDBMovie) => (
    <button
      key={movie.id}
      type="button"
      onClick={() => {
        setSelectedMovie(movie);
        router.push(`/movie/${movie.id}`);
      }}
      className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] text-left transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="text-lg font-semibold">{movie.title}</p>
        <p className="mt-2 text-sm text-zinc-400">
          {movie.overview?.slice(0, 90) || "Family-safe adventures for movie night."}
        </p>
      </div>
    </button>
  );

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.14),_transparent_30%),linear-gradient(180deg,_#050816_0%,_#020617_100%)] px-8 pb-14 text-white">
      <section className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] px-8 py-10">
        <p className="text-xs uppercase tracking-[0.35em] text-amber-300">
          Kids Mode
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold md:text-5xl">
          Safe picks, brighter mood, and a simpler way to browse.
        </h1>
        <p className="mt-4 max-w-2xl text-zinc-300">
          Dastan Kids keeps things playful with bigger artwork and a smaller,
          family-friendly catalog.
        </p>
      </section>

      <section className="mt-10">
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            Featured
          </p>
          <h2 className="mt-2 text-2xl font-semibold">Adventure Time</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {featuredKids.map(renderCard)}
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-5">
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            More To Explore
          </p>
          <h2 className="mt-2 text-2xl font-semibold">Playful Picks</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {playfulPicks.map(renderCard)}
        </div>
      </section>
    </main>
  );
}
