import { Outlet } from "react-router";
import ThemeToggle from "../theme/ThemeToggle";
import { Box } from "@mui/material";

export default function RootLayout() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          pr: 4,
          py: 2,
        }}
      >
        <ThemeToggle />
      </Box>

      <Outlet />
    </>
  );
}
