import axios from "axios";
import type { Movie, MovieDetails, PagedResponse } from "./types";

export const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` },
});

export const IMG = (path: string | null, size = "w500") =>
  path
    ? `https://image.tmdb.org/t/p/${size}${path}`
    : "/placeholder-poster.png";

export const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (!error.response) return "Network error. Check your connection.";
    const { status } = error.response;
    if (status === 401) return "Invalid API key. Please check configuration.";
    if (status === 404) return "Movie not found.";
    if (status === 429) return "Too many requests. Please wait a moment.";
    if (status >= 500)
      return "TMDb is having trouble right now. Try again later.";
  }
  return "Something went wrong. Please try again.";
};

export const getTrending = (page = 1) =>
  tmdb
    .get<PagedResponse<Movie>>("/trending/movie/week", { params: { page } })
    .then((r) => r.data);

export const searchMovies = (query: string, page = 1) =>
  tmdb
    .get<PagedResponse<Movie>>("/search/movie", { params: { query, page } })
    .then((r) => r.data);

export const getMovieDetails = (id: string) =>
  tmdb
    .get<MovieDetails>(`/movie/${id}`, {
      params: { append_to_response: "credits,videos" },
    })
    .then((r) => r.data);
