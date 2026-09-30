import { useEffect } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import MovieGrid from "../components/MovieGrid";
import SearchBar from "../components/SearchBar";
import ErrorMessage from "../../components/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchSearch, fetchTrending, setQuery } from "../../store/moviesSlice";

export default function Movies() {
  const dispatch = useAppDispatch();
  const trending = useAppSelector((s) => s.movies.trending);
  const search = useAppSelector((s) => s.movies.search);

  const isSearching = search.query !== "";
  const list = isSearching ? search : trending;
  const hasMore = list.page < list.totalPages;

  const fetchPage = (page: number) => {
    if (isSearching) dispatch(fetchSearch({ query: search.query, page }));
    else dispatch(fetchTrending(page));
  };

  useEffect(() => {
    if (list.status === "idle") fetchPage(1);
  }, [isSearching]);

  const onSearch = (query: string) => {
    const q = query.trim();
    dispatch(setQuery(q));
    if (q) dispatch(fetchSearch({ query: q, page: 1 }));
    else if (trending.status !== "succeeded") dispatch(fetchTrending(1));
  };

  const onLoadMore = () => fetchPage(list.page + 1);

  return (
    <Box
      sx={{
        maxHeight: "calc(100vh - 72px)",
        minHeight: "calc(100vh - 72px)",
        overflowY: "scroll",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: 520, md: "40%" },
          ml: "auto",
          px: 4,
        }}
      >
        <SearchBar onSearch={onSearch} initialValue={search.query} />
      </Box>

      {list.items.length > 0 && (
        <Typography variant="h4" component="h4" sx={{ p: 4 }}>
          {isSearching
            ? `Search Results for "${search.query}"`
            : "Trending Movies"}
        </Typography>
      )}

      {isSearching &&
        search.status === "succeeded" &&
        search.items.length === 0 && (
          <Typography sx={{ p: 4, textAlign: "center" }} color="text.secondary">
            No movies found for "{search.query}". Try a different title.
          </Typography>
        )}

      <MovieGrid movies={list.items} />

      {list.status === "loading" && list.items.length === 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {list.status === "failed" && list.error && (
        <Box sx={{ maxWidth: 560, mx: "auto", p: 4 }}>
          <ErrorMessage message={list.error} onRetry={onLoadMore} />
        </Box>
      )}

      {list.items.length > 0 && hasMore && list.status !== "failed" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 4,
          }}
        >
          <Button
            type="button"
            variant="contained"
            size="large"
            onClick={onLoadMore}
            loading={list.status === "loading"}
            sx={{
              width: { xs: "70%", sm: 320, md: "25%" },
            }}
          >
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
}
