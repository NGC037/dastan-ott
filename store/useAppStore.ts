import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  selectedMovie: any;
  myList: any[];
  setSelectedMovie: (movie: any) => void;
  addToList: (movie: any) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      selectedMovie: null,
      myList: [],

      setSelectedMovie: (movie) => set({ selectedMovie: movie }),

      addToList: (movie) => {
        const exists = get().myList.find((m) => m.id === movie.id);
        if (!exists) {
          set({ myList: [...get().myList, movie] });
        }
      },
    }),
    {
      name: "dastan-storage",
    },
  ),
);
