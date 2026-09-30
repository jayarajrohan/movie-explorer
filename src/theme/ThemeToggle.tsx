import { useColorScheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function ThemeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();

  if (!mode) return null;

  const resolved = mode === "system" ? systemMode : mode;

  return (
    <IconButton
      onClick={() => setMode(resolved === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${resolved === "dark" ? "light" : "dark"} mode`}
    >
      {resolved === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
