"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";

export default function LoginPage() {
  const [name, setName] = useState("");
  const login = useAppStore((state) => state.login);
  const router = useRouter();

  const handleLogin = () => {
    if (!name.trim()) {
      return;
    }

    login(name.trim());
    router.push("/profiles");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(220,38,38,0.25),_transparent_35%),linear-gradient(180deg,_#09090b_0%,_#000_100%)] px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950/80 p-8 shadow-2xl shadow-black/50 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.35em] text-red-300">
          Welcome Back
        </p>
        <h1 className="mt-4 text-3xl font-semibold">Enter Dastan</h1>
        <p className="mt-3 text-sm text-zinc-400">
          Sign in once, then choose who&apos;s watching.
        </p>

        <div className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-white outline-none transition focus:border-red-500/50"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <button
            type="button"
            onClick={handleLogin}
            className="w-full rounded-2xl bg-white px-4 py-3 font-semibold text-black transition-transform hover:scale-[1.01]"
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}
