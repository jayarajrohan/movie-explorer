import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { getErrorMessage, getTrending, searchMovies } from "../api/tmdb";
import type { Movie, PagedResponse } from "../api/types";
import { loadJSON } from "../utils/storage";

export type Status = "idle" | "loading" | "succeeded" | "failed";

export interface MovieList {
  items: Movie[];
  page: number;
  totalPages: number;
  status: Status;
  error: string | null;
}

interface MoviesState {
  trending: MovieList;
  search: MovieList & { query: string };
}

export const LAST_SEARCH_KEY = "lastSearch";

const emptyList = (): MovieList => ({
  items: [],
  page: 0,
  totalPages: 0,
  status: "idle",
  error: null,
});

const initialState: MoviesState = {
  trending: emptyList(),
  search: { ...emptyList(), query: loadJSON(LAST_SEARCH_KEY, "") },
};

type WithMovies = { movies: MoviesState };

export const fetchTrending = createAsyncThunk<
  PagedResponse<Movie>,
  number,
  { rejectValue: string; state: WithMovies }
>(
  "movies/fetchTrending",
  async (page, { rejectWithValue }) => {
    try {
      return await getTrending(page);
    } catch (e) {
      return rejectWithValue(getErrorMessage(e));
    }
  },
  {
    condition: (page, { getState }) =>
      !(page > 1 && getState().movies.trending.status === "loading"),
  },
);

export const fetchSearch = createAsyncThunk<
  PagedResponse<Movie>,
  { query: string; page: number },
  { rejectValue: string; state: WithMovies }
>(
  "movies/fetchSearch",
  async ({ query, page }, { rejectWithValue }) => {
    try {
      return await searchMovies(query, page);
    } catch (e) {
      return rejectWithValue(getErrorMessage(e));
    }
  },
  {
    condition: ({ page }, { getState }) =>
      !(page > 1 && getState().movies.search.status === "loading"),
  },
);

const applyPage = (list: MovieList, data: PagedResponse<Movie>) => {
  if (data.page !== 1 && data.page !== list.page + 1) return;

  const items = data.page === 1 ? data.results : [...list.items, ...data.results];
  const seen = new Set<number>();
  list.items = items.filter((m) => !seen.has(m.id) && seen.add(m.id));
  list.page = data.page;
  list.totalPages = data.total_pages;
  list.status = "succeeded";
  list.error = null;
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.search = { ...emptyList(), query: action.payload.trim() };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrending.pending, (state) => {
        state.trending.status = "loading";
        state.trending.error = null;
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        applyPage(state.trending, action.payload);
      })
      .addCase(fetchTrending.rejected, (state, action) => {
        state.trending.status = "failed";
        state.trending.error = action.payload ?? "Something went wrong.";
      })
      .addCase(fetchSearch.pending, (state, action) => {
        if (action.meta.arg.query !== state.search.query) return;
        state.search.status = "loading";
        state.search.error = null;
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        if (action.meta.arg.query !== state.search.query) return;
        applyPage(state.search, action.payload);
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        if (action.meta.arg.query !== state.search.query) return;
        state.search.status = "failed";
        state.search.error = action.payload ?? "Something went wrong.";
      });
  },
});

export const { setQuery } = moviesSlice.actions;
export default moviesSlice.reducer;
