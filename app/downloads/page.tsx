"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { getPosterImageSrc } from "@/lib/images";
import type { TMDBMovie } from "@/types/tmdb";

const MOCK_DOWNLOADS: TMDBMovie[] = [
  {
    id: 900001,
    title: "Midnight Run",
    overview: "Downloaded for your next flight.",
    poster_path: "/9O1Iy9od7u2wRJ4E4xI4RAnrmYB.jpg",
    backdrop_path: "/9O1Iy9od7u2wRJ4E4xI4RAnrmYB.jpg",
    vote_average: 8.3,
  },
  {
    id: 900002,
    title: "The Last Empire",
    overview: "Ready offline in crisp Ultra HD.",
    poster_path: "/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
    backdrop_path: "/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
    vote_average: 7.9,
  },
];

export default function DownloadsPage() {
  const { isReady } = useProtectedRoute();
  const [downloads, setDownloads] = useState(MOCK_DOWNLOADS);

  if (!isReady) {
    return <div className="min-h-[60vh] bg-black" />;
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-8 text-white"
    >
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            Downloads
          </p>
          <h1 className="mt-3 text-3xl font-semibold">Offline viewing</h1>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Keep a few favorites ready for travel or low-connectivity moments.
          </p>
        </div>

        {downloads.length === 0 ? (
          <div className="mt-8 rounded-[2rem] border border-dashed border-white/10 bg-white/[0.03] px-8 py-16 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
              Empty State
            </p>
            <h2 className="mt-4 text-2xl font-semibold">No downloads yet</h2>
            <p className="mt-3 text-zinc-400">
              Titles you save for offline viewing will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4">
            {downloads.map((movie) => (
              <div
                key={movie.id}
                className="flex items-center gap-5 rounded-[1.6rem] border border-white/10 bg-zinc-950/70 p-4"
              >
                <div className="relative h-24 w-16 overflow-hidden rounded-xl">
                  <Image
                    src={getPosterImageSrc(movie.poster_path)}
                    alt={movie.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-lg font-semibold">{movie.title}</p>
                  <p className="mt-1 text-sm text-zinc-400">{movie.overview}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.28em] text-emerald-300">
                    Downloaded
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setDownloads((current) =>
                      current.filter((item) => item.id !== movie.id),
                    )
                  }
                  className="rounded-full border border-white/10 px-4 py-2 text-sm transition-all duration-200 hover:scale-[1.02] hover:border-red-400/40 hover:text-red-200"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.main>
  );
}
