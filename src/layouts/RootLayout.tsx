import { NavLink, Outlet, useLocation } from "react-router";
import ThemeToggle from "../theme/ThemeToggle";
import { Badge, Box, Button } from "@mui/material";
import { useAppSelector } from "../store/hooks";

const navSx = {
  color: "text.secondary",
  "&.active": { color: "primary.main", fontWeight: 700 },
};

export default function RootLayout() {
  const { pathname } = useLocation();
  const favoritesCount = useAppSelector((s) => s.favorites.items.length);
  const showNav = pathname !== "/";

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: 1,
          pr: 4,
          py: 2,
        }}
      >
        {showNav && (
          <>
            <Button component={NavLink} to="/movies" sx={navSx}>
              Movies
            </Button>
            <Button component={NavLink} to="/favorites" sx={navSx}>
              <Badge badgeContent={favoritesCount} color="error" max={99}>
                <Box component="span" sx={{ pr: favoritesCount ? 1.5 : 0 }}>
                  Favorites
                </Box>
              </Badge>
            </Button>
          </>
        )}
        <ThemeToggle />
      </Box>

      <Outlet />
    </>
  );
}
