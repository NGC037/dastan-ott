"use client";

import { useRouter } from "next/navigation";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { useAppStore } from "@/store/useAppStore";

export default function AccountPage() {
  const router = useRouter();
  const { isReady, profile, user } = useProtectedRoute();
  const logout = useAppStore((state) => state.logout);

  if (!isReady) {
    return <div className="min-h-[60vh] bg-black" />;
  }

  return (
    <main className="p-8 text-white">
      <div className="max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
          Account
        </p>
        <h1 className="mt-3 text-3xl font-semibold">{user}</h1>
        <p className="mt-3 text-zinc-400">
          Manage the active profile and current subscription details.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
              Current Profile
            </p>
            <p className="mt-4 text-2xl font-semibold capitalize">{profile}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
              Plan
            </p>
            <p className="mt-4 text-2xl font-semibold">Premium Ultra HD</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/40 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
              Status
            </p>
            <p className="mt-4 text-2xl font-semibold text-emerald-300">
              Active
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => router.push("/profiles")}
            className="rounded-full border border-white/15 px-5 py-3 transition-colors hover:border-white/30"
          >
            Switch Profile
          </button>
          <button
            type="button"
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="rounded-full bg-white px-5 py-3 font-medium text-black transition-transform hover:scale-[1.02]"
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}
