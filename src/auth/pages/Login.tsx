import { Box, Button, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  const onLogin = () => {
    navigate("/movies");
  };

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Stack component="form" spacing={2} sx={{ width: "100%", maxWidth: 400 }}>
        <TextField
          id="username"
          name="username"
          label="Username"
          placeholder="Enter your username"
          autoComplete="username"
          required
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          onClick={onLogin}
        >
          Log in
        </Button>
      </Stack>
    </Box>
  );
}
