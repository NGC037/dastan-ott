"use client";

import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";

export default function Navbar() {
  const router = useRouter();
  const user = useAppStore((state) => state.user);
  const profile = useAppStore((state) => state.profile);
  const isSidebarOpen = useAppStore((state) => state.isSidebarOpen);
  const setGenre = useAppStore((state) => state.setGenre);
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);
  const logout = useAppStore((state) => state.logout);

  const profileLabel = profile === "kids" ? "Kids" : "Adult";

  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-white/5 bg-black/70 px-4 py-4 backdrop-blur-xl md:px-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={toggleSidebar}
          className="rounded-lg p-2 transition-all duration-200 hover:scale-[1.03] hover:bg-white/10 hover:opacity-100"
          title="Toggle sidebar"
          aria-label="Toggle sidebar navigation"
        >
          <div className="w-6 space-y-1.5">
            <div
              className={`h-0.5 bg-white transition-all duration-300 ${
                isSidebarOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <div
              className={`h-0.5 bg-white transition-all duration-300 ${
                isSidebarOpen ? "opacity-0" : ""
              }`}
            />
            <div
              className={`h-0.5 bg-white transition-all duration-300 ${
                isSidebarOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            setGenre("all");
            router.push("/browse");
          }}
          className="text-left transition-all duration-200 hover:scale-[1.01] hover:opacity-95"
        >
          <p className="text-xl font-semibold tracking-[0.2em] text-white">
            Dastan
          </p>
          <p className="text-[10px] uppercase tracking-[0.35em] text-zinc-500">
            Premium OTT
          </p>
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm text-zinc-300 md:gap-3">
        <button
          type="button"
          onClick={() => router.push("/search")}
          className="rounded-full border border-white/10 px-3 py-2 transition-all duration-200 hover:scale-[1.02] hover:border-white/20 hover:text-white md:px-4"
        >
          Search
        </button>
        <button
          type="button"
          onClick={() => router.push("/downloads")}
          className="hidden rounded-full border border-white/10 px-4 py-2 transition-all duration-200 hover:scale-[1.02] hover:border-white/20 hover:text-white md:block"
        >
          Downloads
        </button>
        <button
          type="button"
          onClick={() => router.push("/my-list")}
          className="hidden rounded-full border border-white/10 px-4 py-2 transition-all duration-200 hover:scale-[1.02] hover:border-white/20 hover:text-white md:block"
        >
          My List
        </button>
        <button
          type="button"
          onClick={() => router.push("/account")}
          className="rounded-full border border-white/10 px-3 py-2 transition-all duration-200 hover:scale-[1.02] hover:border-white/20 hover:text-white md:px-4"
        >
          Account
        </button>
        <div className="hidden rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-red-200 lg:block">
          {profileLabel}
        </div>
        <div className="hidden text-right lg:block">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Signed in
          </p>
          <p className="text-sm font-medium text-white">{user ?? "Guest"}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            logout();
            router.push("/login");
          }}
          className="rounded-full bg-white px-3 py-2 font-medium text-black transition-all duration-200 hover:scale-[1.02] hover:opacity-95 md:px-4"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
