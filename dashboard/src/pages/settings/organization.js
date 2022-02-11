import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Button,
  Grid,
  Typography,
  OutlinedInput,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { DatePicker, DateRangePicker } from "rsuite";

import SettingsLayout from "src/components/layouts/SettingsLayout";
import SnackMessage from "src/components/SnackMessage";
import { timezone } from "src/utils/timezone";
import axios from "axios";
import { API_SERVICE } from "src/config/uri";

const Organization = () => {
  const [userData, setUserData] = useState(null);
  const [details, setDetails] = useState({
    name: null,
    logo: null,
    customDomain: null,
    timezone: null,
    trackBetween: null,
    trackOn: null,
    trackingMode: "visible",
  });
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState("error");
  const [message, setMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(window.sessionStorage.getItem("userData"));
    setUserData(user);
  }, []);

  useEffect(async () => {
    if (userData !== null) {
      await axios
        .get(`${API_SERVICE}/api/organization/${userData.organization}`)
        .then((res) => {
          if (res.data !== null) {
            setDetails(res.data);
          }
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [userData]);

  // handling change of form fields
  const handleChange = (event) => {
    const data = {
      ...details,
      [event.target.name]: event.target.value,
    };

    setDetails(data);
  };

  const selectTime = (e) => {
    console.log(e);
    if (e !== null) {
      const data = {
        ...details,
        trackOn: e,
      };
      setDetails(data);
    }
  };

  const setRange = (data) => {
    if (data !== null) {
      const newData = {
        ...details,
        trackBetween: {
          startDate: data[0],
          endData: data[1],
        },
      };
      setDetails(newData);
    }
  };

  const saveDetails = async () => {
    setOpen(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      data: details,
      id: details.id,
    };

    await axios
      .put(`${API_SERVICE}/api/organization/update`, body, config)
      .then((res) => {
        setOpen(false);
        setVariant("success");
        setMessage(res.data);
        setSnackOpen(true);
      })
      .catch((error) => {
        setVariant("error");
        setMessage(error.message);
        setSnackOpen(true);
        setOpen(false);
      });
  };

  // closing backdrop
  const backdropClose = () => {
    setOpen(false);
  };

  // closing snack
  const snackClose = () => {
    setSnackOpen(false);
  };

  return (
    <Box sx={{ py: 3 }}>
      <Stack direction="row" justifyContent="flex-end">
        {/* <Button variant="contained" sx={{ px: 4, py: 1.2, fontSize: 16, mx: 0.5 }}>
          Edit
        </Button> */}
        <Button
          variant="contained"
          sx={{ px: 4, py: 1.2, fontSize: 16, mx: 0.5 }}
          onClick={() => saveDetails()}
        >
          Save Changes
        </Button>
        <Button variant="contained" sx={{ px: 4, py: 1.2, fontSize: 16, mx: 0.5 }}>
          Add Users
        </Button>
      </Stack>
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: 500,
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}
      {!loading && (
        <>
          <Grid container sx={{ my: 4 }}>
            <Grid item md={2} sx={{ display: "flex", alignItems: "center" }}>
              <Typography component="h1" variant="h6">
                Organization Name:
              </Typography>
            </Grid>
            <Grid item md={10} sx={{ my: 3 }}>
              <OutlinedInput
                fullWidth
                value={details.name}
                name="name"
                onChange={(e) => handleChange(e)}
              />
            </Grid>

            <Grid item md={2} sx={{ display: "flex", alignItems: "center", my: 3 }}>
              <Typography component="h1" variant="h6">
                Logo:
              </Typography>
            </Grid>
            <Grid item md={10} sx={{ my: 3 }}>
              <Avatar src="" sx={{ width: 120, height: 120 }} />
            </Grid>

            <Grid item md={2} sx={{ display: "flex", alignItems: "center", my: 3 }}>
              <Typography component="h1" variant="h6">
                Custom Domain:
              </Typography>
            </Grid>
            <Grid item md={10} sx={{ my: 3 }}>
              <OutlinedInput
                fullWidth
                value={details.customDomain}
                name="customDomain"
                onChange={(e) => handleChange(e)}
              />
            </Grid>

            <Grid item md={2} sx={{ display: "flex", alignItems: "center", my: 3 }}>
              <Typography component="h1" variant="h6">
                Timezone:
              </Typography>
            </Grid>
            <Grid item md={10} sx={{ my: 3 }}>
              <FormControl fullWidth variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Timezone</InputLabel>
                <Select
                  label="Timezone"
                  value={details.timezone}
                  name="timezone"
                  onChange={(e) => handleChange(e)}
                >
                  {timezone.map((zone) => (
                    <MenuItem key={zone} value={zone}>
                      {zone}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Typography component="h1" variant="h5">
            Default Monitoring Settings
          </Typography>

          <Grid container sx={{ py: 2 }}>
            <Grid item md={1.5} sx={{ py: 3 }}>
              <Typography component="h1" variant="h6">
                Tracking Mode
              </Typography>
            </Grid>
            <Grid item md={4.5} sx={{ my: 2 }}>
              <FormControl component="fieldset">
                <RadioGroup
                  name="trackingMode"
                  defaultValue={details.trackingMode}
                  onChange={(e) => handleChange(e)}
                >
                  <FormControlLabel
                    sx={{ mb: 2 }}
                    value="stealth"
                    name="trackingMode"
                    control={<Radio />}
                    label="Stealth Mode"
                  />
                  <FormControlLabel
                    name="trackingMode"
                    value="visible"
                    control={<Radio />}
                    label="Visible Mode"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} sx={{ py: 1 }}>
              <Box>
                <Grid container>
                  <Grid item md={3} sx={{ display: "flex", alignItems: "center" }}>
                    <Typography component="h1" variant="h6">
                      Track On
                    </Typography>
                  </Grid>
                  <Grid item md={9}>
                    <div className="field">
                      <DatePicker
                        format="HH:mm"
                        ranges={[]}
                        style={{ width: 260 }}
                        onChange={selectTime}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Box>

              <Box>
                <Grid container>
                  <Grid item md={3} sx={{ display: "flex", alignItems: "center" }}>
                    <Typography component="h1" variant="h6">
                      Track Between
                    </Typography>
                  </Grid>
                  <Grid item md={9} sx={{ my: 2 }}>
                    <DateRangePicker onChange={setRange} style={{ width: 260 }} />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </>
      )}

      <SnackMessage
        variant={variant}
        message={message}
        snackOpen={snackOpen}
        handleSnackClose={snackClose}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={backdropClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

Organization.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default Organization;
