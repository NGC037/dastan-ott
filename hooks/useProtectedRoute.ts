"use client";

import { useAppStore } from "@/store/useAppStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface UseProtectedRouteOptions {
  allowKids?: boolean;
}

export function useProtectedRoute(options: UseProtectedRouteOptions = {}) {
  const { allowKids = true } = options;
  const router = useRouter();
  const pathname = usePathname();
  const user = useAppStore((state) => state.user);
  const profile = useAppStore((state) => state.profile);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }

    if (!profile) {
      router.replace("/profiles");
      return;
    }

    if (!allowKids && profile === "kids" && pathname !== "/kids") {
      router.replace("/kids");
    }
  }, [allowKids, pathname, profile, router, user]);

  return {
    isReady: Boolean(user && profile && (allowKids || profile !== "kids")),
    profile,
    user,
  };
}
