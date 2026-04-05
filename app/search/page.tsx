"use client";

import { useState } from "react";
import { fetchData } from "@/services/api";
import MovieCard from "@/components/cards/MovieCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const searchMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}&query=${query}`,
    );
    const data = await res.json();
    setResults(data.results);
  };

  return (
    <main className="p-8">
      <input
        type="text"
        placeholder="Search movies..."
        className="w-full p-3 mb-6 bg-zinc-900 rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        onClick={searchMovies}
        className="mb-6 bg-white text-black px-4 py-2 rounded"
      >
        Search
      </button>

      <div className="flex flex-wrap gap-4">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}
