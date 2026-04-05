"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import type { TMDBMovie } from "@/types/tmdb";

interface MovieCardProps {
  movie: TMDBMovie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const router = useRouter();
  const setSelectedMovie = useAppStore((state) => state.setSelectedMovie);
  const continueWatching = useAppStore((state) => state.continueWatching);

  const progressEntry = continueWatching.find((item) => item.id === movie.id);
  const progress = Math.min(progressEntry?.progress ?? 0, 100);

  const handleClick = () => {
    setSelectedMovie(movie);
    router.push(`/movie/${movie.id}`);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ y: -8, scale: 1.04 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="group relative h-[270px] min-w-[180px] cursor-pointer overflow-hidden rounded-[1.2rem] border border-white/10 bg-zinc-950/80 text-left"
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 180px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

      {progress > 0 && (
        <div className="absolute left-3 right-3 top-3 rounded-full border border-red-500/20 bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-red-200 backdrop-blur-sm">
          Resume watching
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="line-clamp-2 text-sm font-semibold text-white">
          {movie.title}
        </p>
        <p className="mt-1 text-xs text-zinc-300">
          Rating {movie.vote_average.toFixed(1)}
        </p>

        {progress > 0 && (
          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-zinc-400">
              <span>Resume</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-400"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.button>
  );
}
