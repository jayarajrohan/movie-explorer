import { Link } from "react-router";
import { Box, Button, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MovieGrid from "../components/MovieGrid";
import { useAppSelector } from "../../store/hooks";

export default function Favorites() {
  const favorites = useAppSelector((s) => s.favorites.items);

  return (
    <Box sx={{ pb: 4 }}>
      <Typography variant="h4" component="h1" sx={{ p: 4 }}>
        Favorites
      </Typography>

      {favorites.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            p: 4,
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          <FavoriteBorderIcon sx={{ fontSize: 48 }} />
          <Typography>
            No favorites yet. Tap the heart on any movie to save it here.
          </Typography>
          <Button component={Link} to="/movies" variant="contained">
            Browse movies
          </Button>
        </Box>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </Box>
  );
}
