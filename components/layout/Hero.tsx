"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBackdropImageSrc } from "@/lib/images";
import { endpoints, fetchData } from "@/services/api";
import { useAppStore } from "@/store/useAppStore";
import type { TMDBMovie } from "@/types/tmdb";

const ROTATION_INTERVAL = 6000;

export default function Hero() {
  const addToList = useAppStore((state) => state.addToList);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const { data: movies = [] } = useQuery<TMDBMovie[]>({
    queryKey: ["trending"],
    queryFn: () => fetchData(endpoints.trending),
  });

  const heroMovies = useMemo(
    () => movies.filter((movie) => Boolean(movie.backdrop_path)).slice(0, 6),
    [movies],
  );

  useEffect(() => {
    if (heroMovies.length <= 1 || isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroMovies.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, [heroMovies.length, isPaused]);

  const featuredMovie = heroMovies[activeIndex] ?? movies[0] ?? null;
  const nextMovie =
    heroMovies.length > 1 ? heroMovies[(activeIndex + 1) % heroMovies.length] : null;

  useEffect(() => {
    if (!nextMovie) {
      return;
    }

    const image = new window.Image();
    image.src = getBackdropImageSrc(nextMovie.backdrop_path);
  }, [nextMovie]);

  if (!featuredMovie) {
    return null;
  }

  return (
    <section
      className="relative flex h-[85vh] items-end overflow-hidden px-10 pb-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={featuredMovie.id}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={getBackdropImageSrc(featuredMovie.backdrop_path)}
              alt={featuredMovie.title}
              fill
              priority
              sizes="100vw"
              className="absolute inset-0 object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/45 to-black/35" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`hero-copy-${featuredMovie.id}`}
          initial="hidden"
          animate="show"
          exit="exit"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.06,
              },
            },
            exit: {
              transition: {
                staggerChildren: 0.04,
                staggerDirection: -1,
              },
            },
          }}
          className="max-w-xl"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -10 },
            }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="mb-4 text-xs uppercase tracking-[0.45em] text-red-300/90"
          >
            Featured Tonight
          </motion.p>
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -10 },
            }}
            transition={{ duration: 0.34, ease: "easeOut" }}
            className="text-5xl font-bold leading-tight md:text-7xl"
          >
            {featuredMovie.title}
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -10 },
            }}
            transition={{ duration: 0.34, ease: "easeOut" }}
            className="mb-6 mt-4 text-sm text-zinc-300 md:text-base"
          >
            {featuredMovie.overview?.slice(0, 150)}...
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -10 },
            }}
            transition={{ duration: 0.34, ease: "easeOut" }}
            className="flex gap-4"
          >
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              className="rounded-md bg-white px-6 py-2 font-medium text-black transition-all duration-200 hover:scale-[1.02] hover:opacity-95"
            >
              Play
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => addToList(featuredMovie)}
              className="rounded-md bg-white/20 px-6 py-2 transition-all duration-200 hover:scale-[1.02] hover:bg-white/25"
            >
              + My List
            </motion.button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
