import { configureStore } from "@reduxjs/toolkit";
import moviesReducer, { LAST_SEARCH_KEY } from "./moviesSlice";
import movieDetailsReducer from "./movieDetailsSlice";
import favoritesReducer, { FAVORITES_KEY } from "./favoritesSlice";
import { saveJSON } from "../utils/storage";

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movieDetails: movieDetailsReducer,
    favorites: favoritesReducer,
  },
});

let prevQuery = store.getState().movies.search.query;
let prevFavorites = store.getState().favorites.items;

store.subscribe(() => {
  const state = store.getState();
  if (state.movies.search.query !== prevQuery) {
    prevQuery = state.movies.search.query;
    saveJSON(LAST_SEARCH_KEY, prevQuery);
  }
  if (state.favorites.items !== prevFavorites) {
    prevFavorites = state.favorites.items;
    saveJSON(FAVORITES_KEY, prevFavorites);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
