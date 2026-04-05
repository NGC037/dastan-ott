"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useAppStore } from "@/store/useAppStore";

type GatePhase = "idle" | "press" | "form" | "reveal";

const BACKGROUND_POSTERS = [
  { className: "-left-12 top-8 rotate-[-10deg]" },
  { className: "left-[24%] top-0 rotate-[6deg]" },
  { className: "right-[22%] top-10 rotate-[-8deg]" },
  { className: "right-[-3rem] top-24 rotate-[12deg]" },
];

export default function LoginPage() {
  const [name, setName] = useState("");
  const [gatePhase, setGatePhase] = useState<GatePhase>("idle");
  const login = useAppStore((state) => state.login);
  const router = useRouter();

  const isTransitioning = gatePhase !== "idle";

  const gateWidth = useMemo(() => {
    switch (gatePhase) {
      case "press":
        return 270;
      case "form":
      case "reveal":
        return "70vw";
      default:
        return 270;
    }
  }, [gatePhase]);

  const handleLogin = () => {
    if (!name.trim() || isTransitioning) {
      return;
    }

    login(name.trim());
    setGatePhase("press");

    window.setTimeout(() => setGatePhase("form"), 120);
    window.setTimeout(() => setGatePhase("reveal"), 320);
    window.setTimeout(() => router.push("/profiles"), 560);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(220,38,38,0.16),_transparent_26%),linear-gradient(180deg,_#070707_0%,_#000000_100%)] px-6 text-white">
      <div className="absolute inset-0">
        {BACKGROUND_POSTERS.map((poster, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 22 }}
            animate={{
              opacity: gatePhase === "reveal" ? 0.28 : 0.12,
              y: 0,
              scale: gatePhase === "reveal" ? 1.04 : 1,
            }}
            transition={{ duration: 0.38, delay: index * 0.05 }}
            className={`absolute h-[25rem] w-[16.5rem] overflow-hidden rounded-[2rem] border border-white/5 blur-[5px] ${poster.className}`}
          >
            <Image
              src="/fallback-poster.svg"
              alt=""
              fill
              priority={index < 2}
              sizes="264px"
              className="object-cover"
            />
          </motion.div>
        ))}
        <motion.div
          animate={{ opacity: gatePhase === "reveal" ? 0.42 : 0.2 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 bg-black"
        />
        <motion.div
          animate={{
            opacity: gatePhase === "reveal" ? 1 : 0.55,
            scale: gatePhase === "reveal" ? 1.04 : 1,
          }}
          transition={{ duration: 0.32 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05),_transparent_32%),radial-gradient(circle_at_top,_rgba(239,68,68,0.14),_transparent_30%)]"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key="login-shell"
          initial={{ opacity: 0, scale: 0.98, y: 24 }}
          animate={{
            opacity: gatePhase === "reveal" ? 0 : 1,
            scale: gatePhase === "reveal" ? 0.96 : 1,
            y: gatePhase === "reveal" ? 18 : 0,
          }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="rounded-[2rem] border border-white/10 bg-zinc-950/75 p-8 shadow-[0_20px_90px_rgba(0,0,0,0.55)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.35em] text-red-300">
              Dastan Gate
            </p>
            <h1 className="mt-4 text-3xl font-semibold">Enter Dastan</h1>
            <p className="mt-3 text-sm text-zinc-400">
              One step closer to your next world.
            </p>

            <div className="mt-8 space-y-4">
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-white outline-none transition focus:border-red-500/50"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />

              <div className="relative flex justify-center">
                <motion.button
                  type="button"
                  onClick={handleLogin}
                  animate={{
                    scale: gatePhase === "press" ? 0.97 : 1,
                    boxShadow:
                      gatePhase === "press"
                        ? "inset 0 4px 18px rgba(0,0,0,0.35)"
                        : "0 0 40px rgba(255,255,255,0.12)",
                  }}
                  transition={{ duration: 0.12 }}
                  className="relative z-20 w-full overflow-hidden rounded-full bg-white px-4 py-3 font-semibold text-black"
                >
                  <motion.span
                    animate={{
                      opacity: isTransitioning ? 0 : 1,
                      y: gatePhase === "press" ? 1.5 : 0,
                    }}
                    transition={{ duration: 0.12 }}
                    className="block"
                  >
                    Continue
                  </motion.span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
          >
            <motion.div
              animate={{
                width: gateWidth,
                height: gatePhase === "press" ? 54 : 18,
                opacity: gatePhase === "reveal" ? 0.88 : 1,
              }}
              transition={{ duration: gatePhase === "press" ? 0.12 : 0.2 }}
              className="relative max-w-[720px] rounded-full border border-white/30 bg-white/8 shadow-[0_0_60px_rgba(255,255,255,0.16)] backdrop-blur-lg"
            >
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: gatePhase === "form" || gatePhase === "reveal" ? 140 : 0,
                  opacity: gatePhase === "form" || gatePhase === "reveal" ? 1 : 0,
                }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute left-1/2 bottom-full w-px -translate-x-1/2 bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.45)]"
              />

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: gatePhase === "form" || gatePhase === "reveal" ? 1 : 0,
                  opacity: gatePhase === "form" || gatePhase === "reveal" ? 1 : 0,
                }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute left-6 right-6 top-1/2 h-px origin-center -translate-y-1/2 bg-gradient-to-r from-transparent via-white to-transparent"
              />

              <motion.div
                animate={{
                  opacity: gatePhase === "reveal" ? 0.95 : 0.35,
                  scale: gatePhase === "reveal" ? 1.04 : 1,
                }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.28),_transparent_55%)]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
