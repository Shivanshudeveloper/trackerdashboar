import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { FormLabel, FormControl, OutlinedInput } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Google } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function SignInSide() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmaPassword] = useState("");

  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 8,
              px: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5" sx={{ fontWeight: 500, fontSize: 30, my: 2 }}>
              Sign-Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <FormLabel>Enter Name*</FormLabel>
                <OutlinedInput
                  sx={{ borderRadius: 2.2 }}
                  type="name"
                  id="name"
                  name="name"
                  value={name}
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <FormLabel>Enter Email*</FormLabel>
                <OutlinedInput
                  sx={{ borderRadius: 2.2 }}
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <FormLabel>Enter Password*</FormLabel>
                <OutlinedInput
                  sx={{ borderRadius: 2.2 }}
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <FormLabel>Confirm Password*</FormLabel>
                <OutlinedInput
                  sx={{ borderRadius: 2.2 }}
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmaPassword(e.target.value)}
                />
              </FormControl>

              <FormControlLabel
                sx={{ my: 2 }}
                control={<Checkbox value="remember" color="primary" />}
                label="I have read and agreed to the Terms of Service"
              />
              <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, mb: 2, py: 1.4, px: 4.2, fontSize: 16 }}
                  onClick={() => router.push("/verifyEmail")}
                >
                  Sign Up
                </Button>
              </Box>
              <Box>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Google />}
                  sx={{ mt: 2, mb: 2, py: 1.4, px: 4.2, fontSize: 16 }}
                >
                  Sign Up with Google
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
