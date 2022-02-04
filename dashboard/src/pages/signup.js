import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
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
import { API_SERVICE, Application_Id } from "../config/uri";
import SnackMessage from "src/components/SnackMessage";
import axios from "axios";

const theme = createTheme();

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmaPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [variant, setVariant] = useState("");
  const [message, setMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [open, setOpen] = useState(false);

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

    if (email === "" || name === "" || password === "") {
      setVariant("error");
      setMessage("All fields are required");
      setSnackOpen(true);
      return;
    }

    if (password !== confirmPassword) {
      setVariant("error");
      setMessage("Passwords do not match");
      setSnackOpen(true);
      return;
    }

    if (!checked) {
      setVariant("error");
      setMessage("Please accept terms of services");
      setSnackOpen(true);
      return;
    }

    signUp({
      email: data.get("email"),
      password: data.get("password"),
      fullName: data.get("name"),
    });
  };

  const signUp = (obj) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      user: {
        fullName: obj.fullName,
        email: obj.email,
        password: obj.password,
      },
      sendSetPasswordEmail: false,
      skipVerification: false,
      registration: {
        applicationId: Application_Id,
      },
    };

    setOpen(true);

    axios
      .post(`${API_SERVICE}/api/register`, body, config)
      .then(async (res) => {
        const successResponse = res.data;

        const userData = {
          id: successResponse.user.id,
          fullName: successResponse.user.fullName,
          email: successResponse.user.email,
        };

        console.log(userData);

        const newBody = {
          id: userData.id,
          fullName: userData.fullName,
          email: userData.email,
        };

        const { data } = await axios.post(`${API_SERVICE}/api/admin/register`, newBody, config);

        window.sessionStorage.setItem("userData", JSON.stringify({ ...data, role: "Admin" }));
        setOpen(false);

        router.push({ pathname: "/verifyemail" });
      })
      .catch((error) => {
        setOpen(false);
        setVariant("error");
        setMessage(error.response.data.message);
        setSnackOpen(true);
        console.log(`Error: ${error}`);
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
                  name="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmaPassword(e.target.value)}
                />
              </FormControl>

              <FormControlLabel
                sx={{ my: 2 }}
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    value="remember"
                    color="primary"
                  />
                }
                label="I have read and agreed to the Terms of Service"
              />
              <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, mb: 2, py: 1.4, px: 4.2, fontSize: 16 }}
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
              <Link href="/signin">
                <Typography
                  textAlign="center"
                  component="h1"
                  variant="h6"
                  sx={{ cursor: "pointer" }}
                >
                  Already have an account? Sign In
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

export default SignUp;
