import axios from "axios";

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

export const fetchData = async (url: string) => {
  const res = await api.get(url);
  return res.data.results;
};
export const fetchMovieVideos = async (movieId: number) => {
  const res = await api.get(`/movie/${movieId}/videos?api_key=${API_KEY}`);
  return res.data.results;
};
