import { Link } from "react-router";
import { Box, IconButton, Typography } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import type { Movie } from "../../api/types";
import { IMG } from "../../api/tmdb";

interface Props {
  movie: Movie;
  isFavorite?: boolean;
  onToggleFavorite?: (movie: Movie) => void;
}

export default function MovieCard({
  movie,
  isFavorite = false,
  onToggleFavorite,
}: Props) {
  const year = movie.release_date?.slice(0, 4) || "TBA";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;

  return (
    <Box
      sx={{
        position: "relative",
        "&:hover img": { transform: "scale(1.04)" },
        "@media (hover: hover)": {
          "& .fav-btn": { opacity: isFavorite ? 1 : 0 },
          "&:hover .fav-btn": { opacity: 1 },
        },
      }}
    >
      <Box
        component={Link}
        to={`/movie/${movie.id}`}
        sx={{ display: "block", color: "inherit", textDecoration: "none" }}
      >
        <Box
          sx={{
            aspectRatio: "2 / 3",
            borderRadius: 2,
            overflow: "hidden",
            bgcolor: "action.hover",
          }}
        >
          <Box
            component="img"
            src={IMG(movie.poster_path, "w342")}
            alt={movie.title}
            loading="lazy"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform .3s ease",
            }}
          />
        </Box>

        <Typography
          variant="body2"
          title={movie.title}
          sx={{
            fontWeight: 600,
            mt: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.3,
          }}
        >
          {movie.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            mt: 0.25,
            color: "text.secondary",
          }}
        >
          <Typography variant="caption">{year}</Typography>
          {rating && (
            <>
              <Typography variant="caption">·</Typography>
              <StarRoundedIcon sx={{ fontSize: 14, color: "warning.main" }} />
              <Typography variant="caption">{rating}</Typography>
            </>
          )}
        </Box>
      </Box>

      {onToggleFavorite && (
        <IconButton
          className="fav-btn"
          size="small"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={() => onToggleFavorite(movie)}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "rgba(0,0,0,0.55)",
            color: isFavorite ? "error.main" : "#fff",
            transition: "opacity .2s",
            "&:hover": { bgcolor: "rgba(0,0,0,0.75)" },
          }}
        >
          {isFavorite ? (
            <FavoriteIcon fontSize="small" />
          ) : (
            <FavoriteBorderIcon fontSize="small" />
          )}
        </IconButton>
      )}
    </Box>
  );
}
