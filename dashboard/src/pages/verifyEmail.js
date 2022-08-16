import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { FormLabel, FormControl, OutlinedInput } from "@mui/material";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "src/contextx/authContext";

const theme = createTheme();

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();
  const { signedUpUser } = useContext(AuthContext);

  useEffect(() => {
    if (signedUpUser !== null) {
      setEmail(signedUpUser.email);
    }
  }, [signedUpUser]);

  const handleSubmit = () => {
    router.push("/organisationname");
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
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          component={Paper}
          elevation={6}
          square
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              py: 8,
              mx: 8,
              px: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h3" sx={{ fontWeight: 500, fontSize: 25 }}>
              Verify that it's you
            </Typography>
            <Typography
              component="h1"
              variant="h5"
              sx={{ fontWeight: 500, fontSize: 20, textAlign: "center", mt: 10 }}
            >
              We have sent a one time verification code to your email address <b>{email}</b>
            </Typography>
            <FormControl fullWidth sx={{ my: 2 }}>
              <FormLabel>Enter OTP*</FormLabel>
              <OutlinedInput
                sx={{ borderRadius: 2.2 }}
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </FormControl>

            <Box sx={{ display: "flex", flexDirection: "row-reverse", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2, mb: 2, py: 1.4, px: 4.2, fontSize: 16 }}
                onClick={() => handleSubmit()}
              >
                OK
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default VerifyEmail;
