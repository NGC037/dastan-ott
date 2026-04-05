"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PROFILE_OPTIONS } from "@/lib/content";
import { useAppStore } from "@/store/useAppStore";

export default function ProfilesPage() {
  const router = useRouter();
  const user = useAppStore((state) => state.user);
  const setProfile = useAppStore((state) => state.setProfile);
  const setGenre = useAppStore((state) => state.setGenre);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [router, user]);

  if (!user) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(220,38,38,0.18),_transparent_30%),linear-gradient(180deg,_#0a0a0a_0%,_#000_100%)] px-6 text-white">
      <div className="w-full max-w-5xl text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-red-300">
          Dastan Profiles
        </p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">
          Who&apos;s watching?
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-400 md:text-base">
          Choose a profile to tailor the experience before you start watching.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PROFILE_OPTIONS.map((option, index) => (
            <motion.button
              key={option.key}
              type="button"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => {
                setGenre("all");
                setProfile(option.key);
                router.push(option.destination);
              }}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-white/[0.05]"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-red-500 to-orange-400 text-2xl font-semibold text-white">
                {option.label.slice(0, 1)}
              </div>
              <h2 className="mt-8 text-2xl font-semibold">{option.label}</h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400">
                {option.tagline}
              </p>
              <p className="mt-8 text-xs uppercase tracking-[0.35em] text-zinc-500 transition-colors group-hover:text-red-200">
                Enter profile
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </main>
  );
}
