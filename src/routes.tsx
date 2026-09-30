import { createBrowserRouter, type RouteObject } from "react-router";
import Login from "./auth/pages/Login";
import RootLayout from "./layouts/RootLayout";
import Movies from "./movies/pages/Movies";
import MovieDetails from "./movies/pages/MovieDetails";
import Favorites from "./movies/pages/Favorites";

export const routes: RouteObject[] = [
  {
    Component: RootLayout,
    children: [
      { path: "/", Component: Login },
      { path: "/movies", Component: Movies },
      { path: "/movie/:id", Component: MovieDetails },
      { path: "/favorites", Component: Favorites },
    ],
  },
];

export const router = createBrowserRouter(routes);
