import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Typography, OutlinedInput, Stack, Button, Grid, Avatar } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { API_SERVICE } from "src/config/uri";
import SnackMessage from "src/components/SnackMessage";

const ConfirmDetails = () => {
  const [variant, setVariant] = useState("success");
  const [message, setMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(window.sessionStorage.getItem("userData"));
    setUserData(data);
  }, []);

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    const data = {
      ...userData,
      [event.target.name]: event.target.value,
    };

    setUserData(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const snackClose = () => {
    setSnackOpen(false);
  };

  const router = useRouter();

  const confirm = async () => {
    setOpen(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      id: userData.id,
      data: userData,
    };

    await axios
      .post(`${API_SERVICE}/api/teamUser/update`, body, config)
      .then(() => {
        router.push("/user/starttracking");
        setOpen(false);
      })
      .catch((error) => {
        setMessage(error.message);
        setVariant("error");
        setSnackOpen(true);
        setOpen(false);
      });
  };

  return (
    <>
      <Stack
        direction="column"
        justifyContent="space-between"
        sx={{ px: 10, py: 8, height: "100vh" }}
      >
        <Box>
          <Typography component="h1" variant="h4">
            Confirm user details
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {userData !== null && (
            <Box>
              <Grid container sx={{ my: 2, display: "flex", alignItems: "center" }}>
                <Grid item md={3}>
                  User Id
                </Grid>
                <Grid item md={9} sx={{ width: 700 }}>
                  <OutlinedInput
                    fullWidth
                    sx={{ borderRadius: 2.2 }}
                    name="id"
                    type="text"
                    id="userId"
                    value={userData.id}
                    disabled
                  />
                </Grid>
              </Grid>
              <Grid container sx={{ my: 2, display: "flex", alignItems: "center" }}>
                <Grid item md={3}>
                  Name
                </Grid>
                <Grid item md={9} sx={{ width: 700 }}>
                  <OutlinedInput
                    fullWidth
                    sx={{ borderRadius: 2.2 }}
                    name="fullName"
                    type="text"
                    id="userId"
                    value={userData.fullName}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
              </Grid>
              <Grid container sx={{ my: 2, display: "flex", alignItems: "center" }}>
                <Grid item md={3}>
                  Profile Picture
                </Grid>
                <Grid item md={9} sx={{ width: 700 }}>
                  <Avatar sx={{ width: 150, height: 150 }} />
                </Grid>
              </Grid>
              <Grid container sx={{ my: 2, display: "flex", alignItems: "center" }}>
                <Grid item md={3}>
                  Team
                </Grid>
                <Grid item md={9} sx={{ width: 700 }}>
                  <OutlinedInput
                    fullWidth
                    sx={{ borderRadius: 2.2 }}
                    disabled
                    name="team"
                    type="text"
                    id="userId"
                    value={userData.team}
                  />
                </Grid>
              </Grid>
              <Grid container sx={{ my: 2, display: "flex", alignItems: "center" }}>
                <Grid item md={3}>
                  Role
                </Grid>
                <Grid item md={9} sx={{ width: 700 }}>
                  <OutlinedInput
                    fullWidth
                    sx={{ borderRadius: 2.2 }}
                    name="role"
                    type="text"
                    id="userId"
                    disabled
                    value={userData.role}
                  />
                </Grid>
              </Grid>
              <Grid container sx={{ my: 2, display: "flex", alignItems: "center" }}>
                <Grid item md={3}>
                  Tracking Mode
                </Grid>
                <Grid item md={9} sx={{ width: 700 }}>
                  <OutlinedInput
                    fullWidth
                    sx={{ borderRadius: 2.2 }}
                    name="trackingMode"
                    disabled
                    type="text"
                    id="userId"
                    value={userData.trackingMode}
                  />
                </Grid>
              </Grid>
              <Grid container sx={{ my: 2, display: "flex", alignItems: "center" }}>
                <Grid item md={3}>
                  Track On
                </Grid>
                <Grid item md={9} sx={{ width: 700 }}>
                  <OutlinedInput
                    fullWidth
                    sx={{ borderRadius: 2.2 }}
                    name="trackOn"
                    disabled
                    type="text"
                    id="userId"
                    value={userData.trackOn}
                  />
                </Grid>
              </Grid>
              <Grid container sx={{ my: 2, display: "flex", alignItems: "center" }}>
                <Grid item md={3}>
                  Track Between
                </Grid>
                <Grid item md={9} sx={{ width: 700 }}>
                  <OutlinedInput
                    fullWidth
                    sx={{ borderRadius: 2.2 }}
                    name="trackBetween"
                    type="text"
                    id="userId"
                    value={userData.trackBetween}
                    disabled
                  />
                </Grid>
              </Grid>

              <Stack direction="row" justifyContent="flex-end">
                <Button
                  variant="contained"
                  sx={{ mt: 2, mb: 2, py: 1.4, px: 4.2, fontSize: 16 }}
                  onClick={() => confirm()}
                >
                  Next
                </Button>
              </Stack>
            </Box>
          )}
        </Box>
        <Typography textAlign="center" component="h2" variant="h5" sx={{ my: 2 }}>
          Step 3/4
        </Typography>
      </Stack>
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
    </>
  );
};

export default ConfirmDetails;
