import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { FormLabel, FormControl, OutlinedInput } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SnackMessage from "src/components/SnackMessage";
import { AuthContext } from "src/contextx/authContext";

const theme = createTheme();

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("success");
  const [message, setMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false)

  const { signIn } = useContext(AuthContext);
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
  };

  const snackClose = () => {
    setSnackOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    if (email === "" || password === "") {
      setVariant("error");
      setMessage("All fields are required");
      setSnackOpen(true);
      return;
    }

    setDisabled(true)
    const res = signIn({
      email: data.get("email"),
      password: data.get("password"),
    });

    if (res) {
      router.replace('/dashboard')
    }
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
              Sign-In
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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

              <Button
                fullWidth
                type="submit"
                disabled={disabled}
                variant="contained"
                sx={{ mt: 2, mb: 2, py: 1.4, px: 4.2, fontSize: 16 }}
              >
                Sign In
              </Button>

              <Link href="/signup">
                <Typography
                  textAlign="center"
                  component="h1"
                  variant="h6"
                  sx={{ cursor: "pointer", fontSize: 18, mt: 2 }}
                >
                  Don't have an account? Sign Up
                </Typography>
              </Link>
              <Link href="/teamadmin/signin">
                <Typography
                  textAlign="center"
                  component="h1"
                  variant="h6"
                  sx={{ cursor: "pointer", mt: 2, fontSize: 18 }}
                >
                  Login as a Team Admin
                </Typography>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <SnackMessage
        variant={variant}
        message={message}
        snackOpen={snackOpen}
        handleSnackClose={snackClose}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
};

export default SignIn;
