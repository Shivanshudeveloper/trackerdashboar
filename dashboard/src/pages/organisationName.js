import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  OutlinedInput,
  Stack,
  Button,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { API_SERVICE } from "src/config/uri";
import SnackMessage from "src/components/SnackMessage";

const organisationName = () => {
  const [organization, setOrganization] = useState("");
  const [variant, setVariant] = useState("success");
  const [message, setMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [userData, setUserData] = useState({ email: "", fullName: "" });
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const snackClose = () => {
    setSnackOpen(false);
  };

  const router = useRouter();

  useEffect(() => {
    const data = JSON.parse(window.sessionStorage.getItem("userData"));
    setUserData(data);
  }, []);

  const updateOrganizationName = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        organization,
        email: userData.email,
      };

      if (organization === "") {
        setVariant("error");
        setMessage("Organization name cannot be empty");
        setSnackOpen(true);
        return;
      }

      setOpen(true);

      await axios
        .put(`${API_SERVICE}/api/admin/update`, body, config)
        .then((res) => {
          console.log("Admin updated");
          const { data } = res;
          window.sessionStorage.setItem("userData", JSON.stringify(data));
          setOpen(false);
          router.push("/setupteams");
        })
        .catch((e) => {
          setOpen(false);
          console.log(e);
        });
    } catch (error) {
      setOpen(false);
      setVariant("error");
      setMessage(error.response.data.message);
      setSnackOpen(true);
      console.log(error);
    }
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
            Hi {userData.fullName}!
          </Typography>
          <Typography component="h2" variant="h5" sx={{ mt: 5, fontSize: 28 }}>
            Let's get started...
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
          <Box>
            <FormControl
              fullWidth
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
                mb: 8,
              }}
            >
              <FormLabel sx={{ mr: 5 }}>Enter Organisation Name</FormLabel>
              <OutlinedInput
                sx={{ borderRadius: 2.2, width: 500 }}
                name="organisationName"
                type="text"
                id="organisationName"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </FormControl>

            <Stack direction="row" justifyContent="space-between">
              <Button
                variant="contained"
                sx={{ mt: 2, mb: 2, py: 1.4, px: 4.2, fontSize: 16 }}
                onClick={() => router.push("/setUpTeams")}
              >
                SKip
              </Button>
              <Button
                variant="contained"
                sx={{ mt: 2, mb: 2, py: 1.4, px: 4.2, fontSize: 16 }}
                onClick={() => updateOrganizationName()}
              >
                Next
              </Button>
            </Stack>
          </Box>
        </Box>
        <Typography textAlign="center" component="h2" variant="h5" sx={{ my: 2 }}>
          Step 1/2
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

export default organisationName;
