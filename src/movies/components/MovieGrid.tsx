import { Box } from "@mui/material";
import type { Movie } from "../../api/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleFavorite } from "../../store/favoritesSlice";
import MovieCard from "./MovieCard";

interface Props {
  movies: Movie[];
}

export default function MovieGrid({ movies }: Props) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((s) => s.favorites.items);
  const favoriteIds = new Set(favorites.map((m) => m.id));

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        px: 2,
        justifyContent: "center",
      }}
    >
      {movies.map((movie) => (
        <Box key={movie.id} sx={{ width: 180 }}>
          <MovieCard
            movie={movie}
            isFavorite={favoriteIds.has(movie.id)}
            onToggleFavorite={(m) => dispatch(toggleFavorite(m))}
          />
        </Box>
      ))}
    </Box>
  );
}
