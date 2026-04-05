"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppStore, type GenreCategory } from "@/store/useAppStore";

const SIDEBAR_ITEMS: Array<{
  label: string;
  value: GenreCategory;
  icon: string;
}> = [
  { label: "Home", value: "all", icon: "Home" },
  { label: "Movies", value: "movies", icon: "Film" },
  { label: "TV Shows", value: "tv-shows", icon: "Series" },
  { label: "Action", value: "action", icon: "Rush" },
  { label: "Drama", value: "drama", icon: "Drama" },
  { label: "Comedy", value: "comedy", icon: "Laugh" },
  { label: "Indian", value: "indian", icon: "India" },
  { label: "My List", value: "my-list", icon: "List" },
];

export default function Sidebar() {
  const router = useRouter();
  const activeGenre = useAppStore((state) => state.activeGenre);
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);
  const setGenre = useAppStore((state) => state.setGenre);

  const handleNavigate = (value: GenreCategory) => {
    setGenre(value);
    router.push(value === "my-list" ? "/my-list" : "/browse");
  };

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: isSidebarOpen ? 0 : -300 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 z-40 h-screen w-64 overflow-hidden border-r border-white/5 bg-gradient-to-b from-zinc-950 via-black to-black"
    >
      <div className="px-6 pb-8 pt-20">
        <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.35em] text-zinc-500">
          Browse
        </h2>

        <div className="space-y-2">
          {SIDEBAR_ITEMS.map((item) => (
            <motion.button
              key={item.value}
              type="button"
              onClick={() => handleNavigate(item.value)}
              className={`relative flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 hover:opacity-100 ${
                activeGenre === item.value
                  ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-950/50"
                  : "text-zinc-300 hover:bg-white/5 hover:text-white"
              }`}
              whileHover={{ scale: 1.02, opacity: 1 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeGenre === item.value && (
                <motion.div
                  layoutId="active-indicator"
                  className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white/90"
                />
              )}

              <span className="w-11 text-xs font-medium uppercase tracking-[0.24em] text-zinc-500">
                {item.icon}
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 border-t border-white/5 bg-black/50 p-6 backdrop-blur-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          Premium Edition
        </p>
      </div>
    </motion.aside>
  );
}
