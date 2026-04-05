"use client";

import { motion } from "framer-motion";
import Hero from "@/components/layout/Hero";
import MovieRow from "@/components/rows/MovieRow";
import { HOME_ROWS_BY_GENRE } from "@/lib/content";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useAppStore } from "@/store/useAppStore";

export default function Home() {
  const { isReady } = useProtectedRoute({ allowKids: false });
  const activeGenre = useAppStore((state) => state.activeGenre);
  const continueWatching = useAppStore((state) => state.continueWatching);

  if (!isReady) {
    return <div className="min-h-[60vh] bg-black" />;
  }

  const rows = HOME_ROWS_BY_GENRE[activeGenre] ?? HOME_ROWS_BY_GENRE.all;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="pb-16"
    >
      {activeGenre === "all" && <Hero />}

      {activeGenre === "all" && continueWatching.length > 0 && (
        <MovieRow title="Continue Watching" customMovies={continueWatching} />
      )}

      {rows.map((row) => (
        <MovieRow
          key={`${activeGenre}-${row.title}`}
          title={row.title}
          fetchUrl={row.fetchUrl}
          customMovies={row.customMovies}
        />
      ))}
    </motion.main>
  );
}
