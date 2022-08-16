import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  OutlinedInput,
  Typography,
  Stack,
  Grid,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import SettingsLayout from "../../../components/layouts/SettingsLayout";
import SnackMessage from "src/components/SnackMessage";
import axios from "axios";
import { API_SERVICE } from "src/config/uri";

const AddNewTeam = () => {
  const [teamName, setTeamName] = useState("");
  const [organization, setOrganization] = useState(null);
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState("");
  const [message, setMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const data = JSON.parse(window.sessionStorage.getItem("user"));
    setOrganization(data.organization);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const snackClose = () => {
    setSnackOpen(false);
  };

  const addTeam = async () => {
    try {
      if (teamName === "" || organization === null) {
        return;
      }

      const teamNames = [];
      teamNames.push(teamName);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        teamNames,
        organization,
      };

      setOpen(true);

      await axios
        .post(`${API_SERVICE}/api/team/create`, body, config)
        .then((res) => console.log(res.data))
        .then(() => setOpen(false))
        .then(() => {
          setTeamName("");
          setVariant("success");
          setMessage("Team Added Successfully");
          setSnackOpen(true);
        })
        .catch((error) => {
          console.log(error.response.data.message);
          setOpen(false);
          setVariant("error");
          setMessage(error.response.data.message);
          setSnackOpen(true);
        });
    } catch (error) {
      setOpen(false);
      setVariant("error");
      setMessage(error.message);
      setSnackOpen(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <Box sx={{ width: 700, p: 3 }}>
        <Typography component="h1" variant="h5">
          Add New Team
        </Typography>
        <Grid container sx={{ mb: 3, mt: 8 }}>
          <Grid item md={4} sx={{ display: "flex", alignItems: "center" }}>
            <Typography component="h1" variant="h6">
              Enter Team Name:
            </Typography>
          </Grid>
          <Grid item md={8}>
            <OutlinedInput
              fullWidth
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 7 }}>
          <Button
            variant="contained"
            sx={{ px: 5, py: 1.1, mr: 2 }}
            onClick={() => router.push("/settings/users")}
          >
            Cancel
          </Button>
          <Button variant="contained" sx={{ px: 5, py: 1.1 }} onClick={() => addTeam()}>
            Add Team
          </Button>
        </Stack>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <SnackMessage
        variant={variant}
        message={message}
        snackOpen={snackOpen}
        handleSnackClose={snackClose}
      />
    </Box>
  );
};

AddNewTeam.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default AddNewTeam;
