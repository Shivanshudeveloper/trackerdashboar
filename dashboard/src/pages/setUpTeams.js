import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  OutlinedInput,
  Stack,
  Button,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { API_SERVICE } from "src/config/uri";
import { AuthContext } from "src/contextx/authContext";

const Field = (props) => {
  const { removeField, index, setTeamNames, teamNames } = props;

  const onChange = (e, index) => {
    const name = e.target.value;
    teamNames[index] = name;
    setTeamNames([...teamNames]);
  };

  return (
    <FormControl
      fullWidth
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        mt: 2,
        mb: 4,
      }}
    >
      <FormLabel sx={{ mr: 5 }}>Enter Team Name</FormLabel>
      <OutlinedInput
        sx={{ borderRadius: 2.2, width: 500 }}
        name="teamName"
        type="text"
        id="teamName"
        placeholder="Team Name"
        onChange={(e) => onChange(e, index)}
        endAdornment={
          <IconButton onClick={() => removeField(index)}>
            <Close />
          </IconButton>
        }
      />
    </FormControl>
  );
};

const setUpTeams = () => {
  const [teamNames, setTeamNames] = useState([]);
  const [fields, setFields] = useState([1]);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { org, addTeams, teams } = useContext(AuthContext);

  useEffect(() => {
    if (teams !== null) {
      router.replace("/signin");
    }
  }, teams);

  const handleClose = () => {
    setOpen(false);
  };

  const addNewField = () => {
    setFields([...fields, 1]);
  };

  const removeField = (index) => {
    fields.splice(index, 1);
    teamNames.splice(index, 1);
    setFields([...fields]);
  };

  const addTeam = async () => {
    const body = {
      teamNames,
      organization: org.id,
    };

    addTeams(body);
  };

  return (
    <React.Fragment>
      <Stack
        direction="column"
        sx={{ px: 10, py: 8, height: "100vh" }}
        justifyContent="space-between"
      >
        <Typography component="h1" variant="h4">
          Set up your Teams
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            py: 6,
          }}
        >
          <Box>
            {fields.map((x, index) => (
              <Field
                key={index++}
                removeField={removeField}
                index={index}
                teamNames={teamNames}
                setTeamNames={setTeamNames}
              />
            ))}
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 8, py: 1.4, px: 4.2, fontSize: 16 }}
              onClick={() => addNewField()}
            >
              Add New Team
            </Button>
            <Stack sx={{ mt: 2 }} direction="row" justifyContent="space-between">
              <Button
                variant="contained"
                sx={{ mt: 2, mb: 2, py: 1.4, px: 4.2, fontSize: 16 }}
                onClick={() => router.push("/")}
              >
                Skip
              </Button>
              <Button
                variant="contained"
                sx={{ mt: 2, mb: 2, py: 1.4, px: 4.2, fontSize: 16 }}
                onClick={() => addTeam()}
              >
                Next
              </Button>
            </Stack>
          </Box>
        </Box>
        <Typography textAlign="center" component="h2" variant="h5" sx={{ my: 2 }}>
          Step 2/2
        </Typography>
      </Stack>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </React.Fragment>
  );
};

export default setUpTeams;
