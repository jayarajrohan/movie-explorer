import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "../api/types";
import { loadJSON } from "../utils/storage";

export const FAVORITES_KEY = "favorites";

interface FavoritesState {
  items: Movie[];
}

const initialState: FavoritesState = {
  items: loadJSON<Movie[]>(FAVORITES_KEY, []),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<Movie>) {
      const { id, title, poster_path, release_date, vote_average } =
        action.payload;
      const index = state.items.findIndex((m) => m.id === id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.unshift({
          id,
          title,
          poster_path,
          release_date,
          vote_average,
        });
      }
    },
  },
});

export const selectIsFavorite =
  (id: number) => (state: { favorites: FavoritesState }) =>
    state.favorites.items.some((m) => m.id === id);

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
