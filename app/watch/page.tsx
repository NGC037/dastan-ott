"use client";

import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieVideos } from "@/services/api";

export default function WatchPage() {
  const movie = useAppStore((s) => s.selectedMovie);
  const router = useRouter();

  const { data: videos = [] } = useQuery({
    queryKey: ["videos", movie?.id],
    queryFn: () => fetchMovieVideos(movie.id),
    enabled: !!movie,
  });

  const trailer = videos.find((v: any) => v.type === "Trailer");

  if (!movie) {
    return <button onClick={() => router.push("/")}>Go Back</button>;
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* 🎬 Video */}
      <div className="w-full h-[70vh]">
        {trailer ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={`Trailer for ${movie.title}`}
            allowFullScreen
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            No Trailer Available
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-8 py-6">
        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
        <p className="text-zinc-400 max-w-2xl">{movie.overview}</p>
      </div>
    </main>
  );
}
