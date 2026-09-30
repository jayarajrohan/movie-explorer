import { createBrowserRouter, type RouteObject } from "react-router";
import Login from "./auth/pages/Login";
import RootLayout from "./layouts/RootLayout";

export const routes: RouteObject[] = [
  {
    Component: RootLayout,
    children: [{ path: "/", Component: Login }],
  },
];

export const router = createBrowserRouter(routes);
