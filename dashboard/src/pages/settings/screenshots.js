import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import SettingsLayout from "src/components/layouts/SettingsLayout";
import { TeamAndUserContext } from "src/contextx/teamAndUserContext";
import { AuthContext } from "src/contextx/authContext";
import axios from "axios";
import { API_SERVICE } from "src/config/uri";

const Screenshots = () => {
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [takeTime, setTakeTime] = useState({
    startTime: null,
    endTime: null,
  });

  const { user } = useContext(AuthContext);
  const { teams } = useContext(TeamAndUserContext);

  useEffect(() => {
    if (user !== null) {
      const getSetting = async () => {
        try {
          const { data } = await axios.get(
            `${API_SERVICE}/api/get/screenshot/${user.organization}`
          );
          if (data) {
            setTakeTime(data.takeTime);
            setSelectedTeams(data.teams);
          }
        } catch (error) {
          console.log(error);
        }
      };

      getSetting();
    }
  }, [user]);

  const handleChange = (event) => {
    const val = event.target.checked;
    const name = event.target.name;

    if (val) {
      setSelectedTeams((x) => [...x, name]);
    } else {
      setSelectedTeams((x) => {
        return x.filter((x) => x !== name);
      });
    }
  };

  const saveSetting = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = {
        organization: user.organization,
        body: {
          teams: selectedTeams,
          takeTime,
        },
      };

      const { data } = await axios.post(`${API_SERVICE}/api/update/screenshot`, body, config);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
        <Button onClick={saveSetting} variant="contained" sx={{ px: 5, py: 1.2, fontSize: 16 }}>
          Save Changes
        </Button>
      </Stack>

      <Typography component="h1" variant="h5">
        Default Screenshot Settings
      </Typography>

      <Grid container sx={{ mt: 8, mb: 4 }}>
        <Grid item md={3} sx={{ mt: 3 }}>
          <Typography component="h1" variant="h6">
            Capture Screenshots of:
          </Typography>
        </Grid>
        <Grid item md={9} sx={{ mt: 3 }}>
          <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
            {teams.map((x) => (
              <FormControlLabel
                key={x.id}
                sx={{ mr: 5 }}
                control={
                  <Checkbox
                    checked={selectedTeams.includes(x.team_name)}
                    onChange={handleChange}
                    name={x.team_name}
                  />
                }
                label={x.team_name}
              />
            ))}
          </FormGroup>
        </Grid>

        <Grid item md={3} sx={{ mt: 3, display: "flex", alignItems: "center" }}>
          <Typography component="h1" variant="h6">
            Screenshot time Interval:
          </Typography>
        </Grid>
        <Grid item md={9} sx={{ mt: 3, display: "flex", gap: "10px" }}>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Start Time"
                value={takeTime.startTime}
                onChange={(newValue) => {
                  setTakeTime({ ...takeTime, startTime: newValue });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="End Time"
                value={takeTime.endTime}
                onChange={(newValue) => {
                  setTakeTime({ ...takeTime, endTime: newValue });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

Screenshots.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default Screenshots;
