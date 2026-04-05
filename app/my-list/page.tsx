"use client";

import MovieCard from "@/components/cards/MovieCard";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useAppStore } from "@/store/useAppStore";

export default function MyListPage() {
  const { isReady } = useProtectedRoute({ allowKids: false });
  const myList = useAppStore((state) => state.myList);

  if (!isReady) {
    return <div className="min-h-[60vh] bg-black" />;
  }

  return (
    <main className="p-8 text-white">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
          Your Collection
        </p>
        <h1 className="mt-3 text-3xl font-semibold">My List</h1>
      </div>

      {myList.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.03] p-10 text-zinc-400">
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            Empty State
          </p>
          <h2 className="mt-4 text-2xl font-semibold text-white">
            Nothing saved yet
          </h2>
          <p className="mt-3">
            Save titles from the homepage to build your personal watchlist.
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {myList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </main>
  );
}
