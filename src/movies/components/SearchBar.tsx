import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface IProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export default function SearchBar(props: IProps) {
  const { onSearch, initialValue = "" } = props;

  const [query, setQuery] = useState(initialValue);

  return (
    <TextField
      fullWidth
      size="small"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        if (!e.target.value.trim()) onSearch("");
      }}
      onKeyDown={(e) => e.key === "Enter" && onSearch(query)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: query && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={() => {
                  setQuery("");
                  onSearch("");
                }}
                aria-label="Clear search"
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
