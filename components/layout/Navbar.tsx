"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter(); // ✅ INSIDE component

  return (
    <nav className="fixed top-0 w-full z-50 px-8 py-4 flex items-center justify-between backdrop-blur-md bg-black/60 border-b border-white/5">
      <h1 className="text-xl font-semibold tracking-wide">Dastan</h1>

      <div className="flex items-center gap-6 text-sm text-zinc-300">
        <span
          onClick={() => router.push("/")}
          className="cursor-pointer hover:text-white"
        >
          Home
        </span>

        <span
          onClick={() => router.push("/search")}
          className="cursor-pointer hover:text-white"
        >
          Search
        </span>

        <span className="cursor-pointer hover:text-white">My List</span>
      </div>
    </nav>
  );
}
