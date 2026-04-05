"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PROFILE_OPTIONS } from "@/lib/content";
import { useAppStore } from "@/store/useAppStore";

const BRAND_LETTERS = [
  { char: "D", x: -170, y: -54, rotate: -18 },
  { char: "A", x: -92, y: 62, rotate: 14 },
  { char: "S", x: -28, y: -70, rotate: -16 },
  { char: "T", x: 36, y: 68, rotate: 16 },
  { char: "A", x: 102, y: -52, rotate: -15 },
  { char: "N", x: 176, y: 56, rotate: 13 },
];

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
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(220,38,38,0.18),_transparent_30%),linear-gradient(180deg,_#09090b_0%,_#000000_100%)] px-6 text-white">
      <div className="w-full max-w-5xl text-center">
        <div className="relative mx-auto mb-10 flex h-28 items-center justify-center overflow-visible">
          {BRAND_LETTERS.map((letter, index) => (
            <motion.span
              key={`${letter.char}-${index}`}
              initial={{
                opacity: 0,
                x: letter.x,
                y: letter.y,
                rotate: letter.rotate,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
                filter: "blur(0px)",
              }}
              transition={{
                delay: 0.04 * index,
                duration: 0.38,
                ease: "easeOut",
              }}
              className="inline-block text-5xl font-semibold tracking-[0.32em] text-white md:text-7xl"
              style={{ textShadow: "0 0 24px rgba(255,255,255,0.18)" }}
            >
              {letter.char}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.28 }}
          className="text-xs uppercase tracking-[0.4em] text-red-300"
        >
          Dastan Profiles
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.28 }}
          className="mt-4 text-4xl font-semibold md:text-6xl"
        >
          Who&apos;s watching?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.28 }}
          className="mx-auto mt-4 max-w-2xl text-sm text-zinc-400 md:text-base"
        >
          Choose a profile to tailor the experience before you start watching.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { delayChildren: 0.46, staggerChildren: 0.1 },
            },
          }}
          className="mt-12 grid gap-6 md:grid-cols-2"
        >
          {PROFILE_OPTIONS.map((option) => (
            <motion.button
              key={option.key}
              type="button"
              variants={{
                hidden: { opacity: 0, y: 22, scale: 0.98 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              onClick={() => {
                setGenre("all");
                setProfile(option.key);
                router.push(option.destination);
              }}
              className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-left transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-white/[0.05]"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-red-500 to-orange-400 text-2xl font-semibold text-white shadow-[0_0_30px_rgba(239,68,68,0.25)]">
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
        </motion.div>
      </div>
    </main>
  );
}
