export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  genres?: TMDBGenre[];
  progress?: number;
}

export interface TMDBVideo {
  id?: string;
  key: string;
  type: string;
  site?: string;
}
