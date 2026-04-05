"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type GatePhase = "idle" | "press" | "expand" | "form" | "reveal";

const BACKDROP_POSTERS = [
  { className: "-left-16 top-12 rotate-[-10deg]" },
  { className: "left-[18%] top-2 rotate-[8deg]" },
  { className: "left-[44%] top-20 rotate-[-7deg]" },
  { className: "right-[16%] top-10 rotate-[6deg]" },
  { className: "right-[-4rem] top-24 rotate-[12deg]" },
];

export default function LandingPage() {
  const router = useRouter();
  const [gatePhase, setGatePhase] = useState<GatePhase>("idle");
  const [activeAction, setActiveAction] = useState<"register" | "signin" | null>(
    null,
  );

  const isTransitioning = gatePhase !== "idle";

  const gateWidth = useMemo(() => {
    switch (gatePhase) {
      case "press":
        return 240;
      case "expand":
      case "form":
      case "reveal":
        return "70vw";
      default:
        return 240;
    }
  }, [gatePhase]);

  const beginGateTransition = (action: "register" | "signin") => {
    if (isTransitioning) {
      return;
    }

    setActiveAction(action);
    setGatePhase("press");
    window.setTimeout(() => setGatePhase("expand"), 120);
    window.setTimeout(() => setGatePhase("form"), 300);
    window.setTimeout(() => setGatePhase("reveal"), 500);
    window.setTimeout(() => router.push("/login"), 700);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(220,38,38,0.16),_transparent_28%),linear-gradient(180deg,_#050505_0%,_#000000_100%)] text-white">
      <div className="absolute inset-0">
        {BACKDROP_POSTERS.map((poster, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 18 }}
            animate={{
              opacity: gatePhase === "reveal" ? 0.34 : 0.18,
              y: 0,
              scale: gatePhase === "reveal" ? 1.03 : 1,
              filter: gatePhase === "reveal" ? "blur(2px)" : "blur(6px)",
            }}
            transition={{ delay: 0.06 * index, duration: 0.45 }}
            className={`absolute h-[25rem] w-[16rem] overflow-hidden rounded-[2rem] border border-white/5 ${poster.className}`}
          >
            <Image
              src="/fallback-poster.svg"
              alt=""
              fill
              priority={index < 2}
              sizes="256px"
              className="object-cover"
            />
          </motion.div>
        ))}

        <motion.div
          animate={{ opacity: gatePhase === "reveal" ? 0.22 : 0.45 }}
          transition={{ duration: 0.22 }}
          className="absolute inset-0 bg-black"
        />
        <motion.div
          animate={{
            opacity: gatePhase === "reveal" ? 1 : 0.7,
            scale: gatePhase === "reveal" ? 1.03 : 1,
          }}
          transition={{ duration: 0.26 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.24)_45%,_rgba(0,0,0,0.82)_100%)]"
        />
      </div>

      <motion.div
        animate={{
          opacity: gatePhase === "reveal" ? 0.18 : 1,
          scale: gatePhase === "reveal" ? 0.98 : 1,
        }}
        transition={{ duration: 0.24 }}
        className="relative z-10 flex min-h-screen items-center justify-center px-6"
      >
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="text-xs uppercase tracking-[0.6em] text-red-300/90">
            Premium OTT
          </p>
          <h1 className="mt-6 text-6xl font-semibold tracking-[0.28em] md:text-8xl">
            DASTAN
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-300 md:text-xl">
            Stories that pull you in.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {[
              { key: "register", label: "Register", solid: true },
              { key: "signin", label: "Sign In", solid: false },
            ].map((action) => (
              <motion.button
                key={action.key}
                type="button"
                whileHover={{ scale: 1.03, filter: "brightness(1.06)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  beginGateTransition(action.key as "register" | "signin")
                }
                animate={{
                  scale:
                    activeAction === action.key && gatePhase === "press"
                      ? 0.96
                      : 1,
                  boxShadow:
                    activeAction === action.key && gatePhase === "press"
                      ? "inset 0 4px 18px rgba(0,0,0,0.35)"
                      : action.solid
                        ? "0 0 50px rgba(255,255,255,0.16)"
                        : "0 0 40px rgba(239,68,68,0.12)",
                }}
              transition={{ duration: 0.12 }}
              className={`w-full rounded-full px-8 py-4 text-base sm:w-auto ${
                  action.solid
                    ? "bg-white font-semibold text-black"
                    : "border border-white/15 bg-white/5 font-medium text-white backdrop-blur-md"
                }`}
              >
                <motion.span
                  animate={{
                    opacity: activeAction === action.key && isTransitioning ? 0 : 1,
                    y: activeAction === action.key && gatePhase === "press" ? 1.5 : 0,
                  }}
                  transition={{ duration: 0.12 }}
                  className="block"
                >
                  {action.label}
                </motion.span>
              </motion.button>
            ))}
          </div>
        </motion.section>
      </motion.div>

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
          >
            <motion.div
              animate={{
                width: gateWidth,
                height: gatePhase === "press" ? 56 : 18,
                backgroundColor:
                  gatePhase === "expand" || gatePhase === "form" || gatePhase === "reveal"
                    ? "rgba(185,28,28,0.34)"
                    : "rgba(255,255,255,0.12)",
              }}
              transition={{ duration: gatePhase === "press" ? 0.12 : 0.18 }}
              className="relative max-w-[760px] rounded-full border border-white/30 shadow-[0_0_60px_rgba(239,68,68,0.2)] backdrop-blur-lg"
            >
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: gatePhase === "form" || gatePhase === "reveal" ? 160 : 0,
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
                  opacity: gatePhase === "reveal" ? 0.95 : 0.45,
                  scale: gatePhase === "reveal" ? 1.05 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.24),_transparent_55%)]"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: gatePhase === "form" || gatePhase === "reveal" ? 1 : 0,
                y: gatePhase === "form" || gatePhase === "reveal" ? 0 : 10,
              }}
              transition={{ duration: 0.18, delay: 0.04 }}
              className="absolute top-[calc(50%+54px)] text-xs uppercase tracking-[0.42em] text-white/80"
            >
              Entering Dastan...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
