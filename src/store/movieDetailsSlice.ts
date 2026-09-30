import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getErrorMessage, getMovieDetails } from "../api/tmdb";
import type { MovieDetails } from "../api/types";
import type { Status } from "./moviesSlice";

interface MovieDetailsState {
  data: MovieDetails | null;
  status: Status;
  error: string | null;
  requestId: string | null;
}

const initialState: MovieDetailsState = {
  data: null,
  status: "idle",
  error: null,
  requestId: null,
};

export const fetchMovieDetails = createAsyncThunk<
  MovieDetails,
  string,
  { rejectValue: string }
>("movieDetails/fetch", async (id, { rejectWithValue }) => {
  try {
    return await getMovieDetails(id);
  } catch (e) {
    return rejectWithValue(getErrorMessage(e));
  }
});

const movieDetailsSlice = createSlice({
  name: "movieDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state, action) => {
        state.requestId = action.meta.requestId;
        state.data = null;
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        if (action.meta.requestId !== state.requestId) return;
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        if (action.meta.requestId !== state.requestId) return;
        state.status = "failed";
        state.error = action.payload ?? "Something went wrong.";
      });
  },
});

export default movieDetailsSlice.reducer;
