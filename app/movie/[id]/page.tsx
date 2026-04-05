"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getBackdropImageSrc } from "@/lib/images";
import MovieCard from "@/components/cards/MovieCard";
import PageSkeleton from "@/components/ui/PageSkeleton";
import {
  fetchMovieDetails,
  fetchMovieVideos,
  fetchSimilarMovies,
} from "@/services/api";
import { useAppStore } from "@/store/useAppStore";
import type { TMDBMovie, TMDBVideo } from "@/types/tmdb";

export default function MovieDetails() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const setSelectedMovie = useAppStore((state) => state.setSelectedMovie);
  const id = Number(params.id);

  const { data: movie, isLoading } = useQuery<TMDBMovie>({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieDetails(id),
  });

  const { data: videos = [] } = useQuery<TMDBVideo[]>({
    queryKey: ["movie-videos", id],
    queryFn: () => fetchMovieVideos(id),
  });

  const { data: similar = [] } = useQuery<TMDBMovie[]>({
    queryKey: ["similar", id],
    queryFn: () => fetchSimilarMovies(id),
  });

  if (isLoading || !movie) {
    return <PageSkeleton />;
  }

  const trailer = videos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );

  const trailerSrc = trailer
    ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailer.key}&playsinline=1&rel=0`
    : null;

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-white"
    >
      <div className="relative h-[72vh] overflow-hidden bg-black">
        {trailerSrc ? (
          <motion.iframe
            key={trailer.key}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            src={trailerSrc}
            title={`Trailer for ${movie.title}`}
            allow="autoplay; encrypted-media"
            className="absolute inset-0 h-full w-full scale-[1.18]"
          />
        ) : (
          <Image
            src={getBackdropImageSrc(movie.backdrop_path)}
            alt={movie.title || "Movie backdrop"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/20" />
      </div>

      <div className="relative -mt-28 px-8 pb-12 md:px-10">
        <div className="max-w-4xl rounded-[2rem] border border-white/10 bg-black/70 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-full border border-white/15 px-4 py-2 text-sm transition-all duration-200 hover:scale-[1.02] hover:border-white/30 hover:opacity-95"
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
              className="rounded-full bg-white px-6 py-3 font-semibold text-black transition-all duration-200 hover:scale-[1.02] hover:opacity-95"
            >
              Play Now
            </button>
            <button
              type="button"
              onClick={() => router.push("/my-list")}
              className="rounded-full border border-white/15 px-6 py-3 transition-all duration-200 hover:scale-[1.02] hover:border-white/30 hover:opacity-95"
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
