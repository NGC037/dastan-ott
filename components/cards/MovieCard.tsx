"use client";

import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import Image from "next/image";

export default function MovieCard({ movie }: any) {
  const router = useRouter();
  const setSelectedMovie = useAppStore((s) => s.setSelectedMovie);

  const handleClick = () => {
    setSelectedMovie(movie);
    router.push("/watch");
  };

  return (
    <div
      onClick={handleClick}
      className="group relative min-w-[180px] h-[270px] rounded-xl overflow-hidden cursor-pointer transition duration-300 transform hover:scale-110 hover:z-30"
    >
      {/* Poster */}
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 180px"
        className="object-cover"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

      {/* Info */}
      <div className="absolute bottom-0 p-3 opacity-0 group-hover:opacity-100 transition">
        <p className="text-sm font-semibold">{movie.title}</p>
        <p className="text-xs text-zinc-400">⭐ {movie.vote_average}</p>
      </div>
    </div>
  );
}
