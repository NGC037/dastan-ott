import type { GenreCategory, ProfileType } from "@/store/useAppStore";
import { endpoints } from "@/services/api";
import type { TMDBMovie } from "@/types/tmdb";

export interface ProfileOption {
  key: ProfileType;
  label: string;
  tagline: string;
  destination: "/" | "/kids";
}

export interface ContentRow {
  title: string;
  fetchUrl?: string;
  customMovies?: TMDBMovie[];
}

export const PROFILE_OPTIONS: ProfileOption[] = [
  {
    key: "adult",
    label: "Adult",
    tagline: "Thrillers, prestige drama, and blockbuster nights.",
    destination: "/",
  },
  {
    key: "kids",
    label: "Kids",
    tagline: "Gentle adventures and family-safe picks.",
    destination: "/kids",
  },
];

export const HOME_ROWS_BY_GENRE: Record<GenreCategory, ContentRow[]> = {
  all: [
    { title: "Trending Now", fetchUrl: endpoints.trending },
    { title: "Popular", fetchUrl: endpoints.popular },
    { title: "Top Rated", fetchUrl: endpoints.topRated },
    { title: "Upcoming", fetchUrl: endpoints.upcoming },
    { title: "Because You Watched", fetchUrl: endpoints.popular },
  ],
  movies: [
    { title: "Popular Movies", fetchUrl: endpoints.popular },
    { title: "Top Rated Movies", fetchUrl: endpoints.topRated },
    { title: "Upcoming Movies", fetchUrl: endpoints.upcoming },
  ],
  "tv-shows": [
    { title: "Trending TV Shows", fetchUrl: endpoints.trending },
    { title: "Popular TV Shows", fetchUrl: endpoints.popular },
  ],
  action: [
    { title: "Action Movies", fetchUrl: endpoints.popular },
    { title: "Top Action Picks", fetchUrl: endpoints.topRated },
  ],
  drama: [
    { title: "Drama Series", fetchUrl: endpoints.popular },
    { title: "Award Winning Drama", fetchUrl: endpoints.topRated },
  ],
  comedy: [
    { title: "Comedy Central", fetchUrl: endpoints.popular },
    { title: "Laugh Out Loud", fetchUrl: endpoints.trending },
  ],
  indian: [
    { title: "Indian Blockbusters", fetchUrl: endpoints.popular },
    { title: "Hindi Cinema", fetchUrl: endpoints.topRated },
  ],
  "my-list": [],
};

export const KIDS_ROW_KEYWORDS = [
  "family",
  "animation",
  "adventure",
  "fantasy",
  "music",
];
