export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

export interface MovieDetails extends Movie {
  overview: string;
  tagline?: string;
  runtime?: number | null;
  backdrop_path?: string | null;
  genres: { id: number; name: string }[];
  credits: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path?: string | null;
    }[];
  };
  videos: { results: { key: string; site: string; type: string }[] };
}

export interface PagedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
}
