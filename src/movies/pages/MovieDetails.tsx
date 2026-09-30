import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ErrorMessage from "../../components/ErrorMessage";
import { IMG } from "../../api/tmdb";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchMovieDetails } from "../../store/movieDetailsSlice";
import { selectIsFavorite, toggleFavorite } from "../../store/favoritesSlice";

const formatRuntime = (minutes?: number | null) =>
  minutes ? `${Math.floor(minutes / 60)}h ${minutes % 60}m` : null;

export default function MovieDetails() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: movie, status, error } = useAppSelector((s) => s.movieDetails);
  const isFavorite = useAppSelector(selectIsFavorite(Number(id)));

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  const backButton = (
    <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
      Back
    </Button>
  );

  if (status === "failed" && error) {
    return (
      <Box sx={{ maxWidth: 560, mx: "auto", p: 4 }}>
        {backButton}
        <Box sx={{ mt: 2 }}>
          <ErrorMessage
            message={error}
            onRetry={() => dispatch(fetchMovieDetails(id))}
          />
        </Box>
      </Box>
    );
  }

  if (!movie || movie.id !== Number(id)) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  const year = movie.release_date?.slice(0, 4);
  const runtime = formatRuntime(movie.runtime);
  const cast = movie.credits?.cast.slice(0, 12) ?? [];
  const trailer = movie.videos?.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer",
  );

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, pb: 6, maxWidth: 1200, mx: "auto" }}>
      {backButton}

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 3, md: 5 },
          mt: 2,
        }}
      >
        <Box
          component="img"
          src={IMG(movie.poster_path, "w500")}
          alt={movie.title}
          sx={{
            width: { xs: "60%", sm: 280, md: 320 },
            alignSelf: { xs: "center", md: "flex-start" },
            aspectRatio: "2 / 3",
            objectFit: "cover",
            borderRadius: 2,
            bgcolor: "action.hover",
            flexShrink: 0,
          }}
        />

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
            {movie.title}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", color: "text.secondary", mt: 1 }}
          >
            {year && <Typography>{year}</Typography>}
            {runtime && <Typography>· {runtime}</Typography>}
            {movie.vote_average > 0 && (
              <>
                <Typography>·</Typography>
                <StarRoundedIcon sx={{ fontSize: 18, color: "warning.main" }} />
                <Typography>{movie.vote_average.toFixed(1)}</Typography>
              </>
            )}
          </Stack>

          {movie.genres.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
              {movie.genres.map((g) => (
                <Chip key={g.id} label={g.name} size="small" />
              ))}
            </Box>
          )}

          {movie.tagline && (
            <Typography
              sx={{ mt: 3, fontStyle: "italic", color: "text.secondary" }}
            >
              {movie.tagline}
            </Typography>
          )}

          <Typography variant="h6" sx={{ mt: 2 }}>
            Overview
          </Typography>
          <Typography sx={{ mt: 1, lineHeight: 1.7 }}>
            {movie.overview || "No overview available."}
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mt: 3, flexWrap: "wrap" }}>
            {trailer && (
              <Button
                variant="contained"
                startIcon={<PlayArrowIcon />}
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch trailer
              </Button>
            )}
            <Button
              variant="outlined"
              color={isFavorite ? "error" : "primary"}
              startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              onClick={() => dispatch(toggleFavorite(movie))}
            >
              {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </Button>
          </Stack>
        </Box>
      </Box>

      {cast.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 5, mb: 2 }}>
            Cast
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 2,
            }}
          >
            {cast.map((c) => (
              <Stack
                key={c.id}
                direction="row"
                spacing={1.5}
                sx={{ alignItems: "center", minWidth: 0 }}
              >
                <Avatar
                  src={c.profile_path ? IMG(c.profile_path, "w185") : undefined}
                  alt={c.name}
                  sx={{ width: 48, height: 48 }}
                >
                  {c.name.charAt(0)}
                </Avatar>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="body2" noWrap sx={{ fontWeight: 600 }}>
                    {c.name}
                  </Typography>
                  <Typography variant="caption" noWrap component="p" color="text.secondary">
                    {c.character}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}
