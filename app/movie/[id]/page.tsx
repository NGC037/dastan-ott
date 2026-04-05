"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import MovieCard from "@/components/cards/MovieCard";
import PageSkeleton from "@/components/ui/PageSkeleton";
import { fetchMovieDetails, fetchSimilarMovies } from "@/services/api";
import { useAppStore } from "@/store/useAppStore";
import type { TMDBMovie } from "@/types/tmdb";

export default function MovieDetails() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const setSelectedMovie = useAppStore((state) => state.setSelectedMovie);
  const id = Number(params.id);

  const { data: movie, isLoading } = useQuery<TMDBMovie>({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieDetails(id),
  });

  const { data: similar = [] } = useQuery<TMDBMovie[]>({
    queryKey: ["similar", id],
    queryFn: () => fetchSimilarMovies(id),
  });

  if (isLoading || !movie) {
    return <PageSkeleton />;
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-white"
    >
      <div className="relative h-[72vh] overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title || "Movie backdrop"}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
      </div>

      <div className="relative -mt-28 px-8 pb-12 md:px-10">
        <div className="max-w-4xl rounded-[2rem] border border-white/10 bg-black/70 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-full border border-white/15 px-4 py-2 text-sm transition-colors hover:border-white/30"
          >
            Back
          </button>

          <h1 className="mt-6 text-4xl font-bold md:text-5xl">{movie.title}</h1>

          <div className="mt-5 flex flex-wrap gap-3 text-sm text-zinc-300">
            <span className="rounded-full border border-white/10 px-4 py-2">
              Rating {movie.vote_average.toFixed(1)}
            </span>
            {movie.release_date && (
              <span className="rounded-full border border-white/10 px-4 py-2">
                {movie.release_date}
              </span>
            )}
            {movie.genres?.slice(0, 3).map((genre) => (
              <span
                key={genre.id}
                className="rounded-full border border-white/10 px-4 py-2"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <p className="mt-6 max-w-2xl text-zinc-300">{movie.overview}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setSelectedMovie(movie);
                router.push("/watch");
              }}
              className="rounded-full bg-white px-6 py-3 font-semibold text-black transition-transform hover:scale-[1.02]"
            >
              Play Now
            </button>
            <button
              type="button"
              onClick={() => router.push("/my-list")}
              className="rounded-full border border-white/15 px-6 py-3 transition-colors hover:border-white/30"
            >
              Go to My List
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 pb-12 md:px-10">
        <h2 className="mb-5 text-2xl font-semibold">More Like This</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar">
          {similar.map((similarMovie) => (
            <MovieCard key={similarMovie.id} movie={similarMovie} />
          ))}
        </div>
      </div>
    </motion.main>
  );
}
