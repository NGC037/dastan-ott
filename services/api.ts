import axios from "axios";
import type { TMDBMovie, TMDBVideo } from "@/types/tmdb";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY;

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const endpoints = {
  trending: `/trending/movie/week?api_key=${API_KEY}`,
  popular: `/movie/popular?api_key=${API_KEY}`,
  topRated: `/movie/top_rated?api_key=${API_KEY}`,
  upcoming: `/movie/upcoming?api_key=${API_KEY}`,
};

export const fetchData = async (url: string): Promise<TMDBMovie[]> => {
  const res = await api.get(url);
  return res.data.results;
};
export const fetchMovieVideos = async (movieId: number): Promise<TMDBVideo[]> => {
  const res = await api.get(`/movie/${movieId}/videos?api_key=${API_KEY}`);
  return res.data.results;
};
export const fetchMovieDetails = async (id: number): Promise<TMDBMovie> => {
  const res = await api.get(`/movie/${id}?api_key=${API_KEY}`);
  return res.data;
};

export const fetchSimilarMovies = async (id: number): Promise<TMDBMovie[]> => {
  const res = await api.get(`/movie/${id}/similar?api_key=${API_KEY}`);
  return res.data.results;
};

export const fetchSearchMovies = async (
  query: string,
): Promise<TMDBMovie[]> => {
  const res = await api.get(
    `/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  );
  return res.data.results;
};
