"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import PageSkeleton from "@/components/ui/PageSkeleton";
import { fetchMovieVideos } from "@/services/api";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useAppStore } from "@/store/useAppStore";
import type { TMDBVideo } from "@/types/tmdb";

export default function WatchPage() {
  const router = useRouter();
  const { isReady } = useProtectedRoute({ allowKids: false });
  const movie = useAppStore((state) => state.selectedMovie);
  const continueWatching = useAppStore((state) => state.continueWatching);
  const updateProgress = useAppStore((state) => state.updateProgress);

  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(72);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const persistedProgress = useMemo(() => {
    if (!movie) {
      return 0;
    }

    return continueWatching.find((item) => item.id === movie.id)?.progress ?? 0;
  }, [continueWatching, movie]);

  const [progress, setProgress] = useState(persistedProgress);

  useEffect(() => {
    setProgress(persistedProgress);
  }, [persistedProgress]);

  const { data: videos = [], isLoading } = useQuery<TMDBVideo[]>({
    queryKey: ["videos", movie?.id],
    queryFn: () => fetchMovieVideos(movie!.id),
    enabled: Boolean(movie),
  });

  useEffect(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    if (!movie?.id || !isPlaying || progress >= 100) {
      return;
    }

    progressIntervalRef.current = setInterval(() => {
      setProgress((current) => Math.min(current + 2, 100));
    }, 2500);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
  }, [isPlaying, movie?.id, progress]);

  useEffect(() => {
    if (!movie || progress <= persistedProgress) {
      return;
    }

    updateProgress(movie, progress);
  }, [movie, persistedProgress, progress, updateProgress]);

  if (!isReady) {
    return <div className="min-h-[60vh] bg-black" />;
  }

  if (!movie) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-black px-6 text-white">
        <button
          type="button"
          onClick={() => router.push("/browse")}
          className="rounded-full border border-white/15 px-5 py-3 transition-colors hover:border-white/30"
        >
          Go back to browse
        </button>
      </main>
    );
  }

  if (isLoading) {
    return <PageSkeleton />;
  }

  const trailer = videos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );

  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="min-h-screen bg-black text-white"
    >
      <div className="relative h-[72vh] w-full overflow-hidden border-b border-white/5 bg-zinc-950">
        {trailer ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=0&controls=0&rel=0`}
            title={`Trailer for ${movie.title}`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-400">
            No trailer available
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="mb-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setProgress((current) => Math.min(current + 15, 100))}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-all duration-200 hover:scale-[1.02] hover:opacity-95"
            >
              Skip Intro
            </button>
            <button
              type="button"
              className="rounded-full border border-white/15 bg-black/40 px-5 py-3 text-sm transition-all duration-200 hover:scale-[1.02] hover:border-white/30 hover:opacity-95"
            >
              Next Episode
            </button>
          </div>

          <div className="rounded-[1.8rem] border border-white/10 bg-black/70 p-5 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
                  Now Watching
                </p>
                <h1 className="mt-2 text-2xl font-semibold">{movie.title}</h1>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
                  Progress
                </p>
                <p className="mt-2 text-lg font-semibold">{progress}%</p>
              </div>
            </div>

            <div className="mb-5">
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                  className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-400"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying((current) => !current)}
                  className="rounded-full bg-white px-5 py-3 font-semibold text-black transition-all duration-200 hover:scale-[1.02] hover:opacity-95"
                >
                  {isPlaying ? "Pause" : "Play"}
                </button>
                <button
                  type="button"
                  className="rounded-full border border-white/15 px-4 py-3 text-sm transition-all duration-200 hover:scale-[1.02] hover:border-white/30 hover:opacity-95"
                >
                  Volume {volume}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setVolume((current) => (current >= 100 ? 0 : current + 25))
                  }
                  className="rounded-full border border-white/15 px-4 py-3 text-sm transition-all duration-200 hover:scale-[1.02] hover:border-white/30 hover:opacity-95"
                >
                  Adjust Volume
                </button>
              </div>

              <button
                type="button"
                className="rounded-full border border-white/15 px-4 py-3 text-sm transition-all duration-200 hover:scale-[1.02] hover:border-white/30 hover:opacity-95"
              >
                Fullscreen
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-8">
        <p className="max-w-3xl text-zinc-400">{movie.overview}</p>
      </div>
    </motion.main>
  );
}
