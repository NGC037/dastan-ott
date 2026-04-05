import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TMDBMovie } from "@/types/tmdb";

export type GenreCategory =
  | "all"
  | "movies"
  | "tv-shows"
  | "action"
  | "drama"
  | "comedy"
  | "indian"
  | "my-list";

export type ProfileType = "adult" | "kids";

interface AppState {
  user: string | null;
  profile: ProfileType | null;
  activeGenre: GenreCategory;
  isSidebarOpen: boolean;
  selectedMovie: TMDBMovie | null;
  myList: TMDBMovie[];
  continueWatching: TMDBMovie[];
  login: (name: string) => void;
  logout: () => void;
  setProfile: (profile: ProfileType | null) => void;
  setGenre: (genre: GenreCategory) => void;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  setSelectedMovie: (movie: TMDBMovie) => void;
  addToList: (movie: TMDBMovie) => void;
  removeFromList: (id: number) => void;
  updateProgress: (movie: TMDBMovie, progress: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      profile: null,
      activeGenre: "all",
      isSidebarOpen: true,
      selectedMovie: null,
      myList: [],
      continueWatching: [],
      login: (name) => set({ user: name }),
      logout: () =>
        set({
          user: null,
          profile: null,
          activeGenre: "all",
          isSidebarOpen: true,
          selectedMovie: null,
        }),
      setProfile: (profile) => set({ profile }),
      setGenre: (genre) => set({ activeGenre: genre }),
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      closeSidebar: () => set({ isSidebarOpen: false }),
      setSelectedMovie: (movie) => set({ selectedMovie: movie }),
      addToList: (movie) => {
        const exists = get().myList.find((item) => item.id === movie.id);

        if (!exists) {
          set({ myList: [...get().myList, movie] });
        }
      },
      removeFromList: (id) => {
        set({
          myList: get().myList.filter((movie) => movie.id !== id),
        });
      },
      updateProgress: (movie, progress) => {
        const list = get().continueWatching;
        const exists = list.find((item) => item.id === movie.id);

        if (exists) {
          set({
            continueWatching: list.map((item) =>
              item.id === movie.id ? { ...item, progress } : item,
            ),
          });
          return;
        }

        set({
          continueWatching: [...list, { ...movie, progress }],
        });
      },
    }),
    { name: "dastan-storage" },
  ),
);
