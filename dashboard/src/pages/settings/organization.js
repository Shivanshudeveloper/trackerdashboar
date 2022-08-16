import React, { useState, useEffect, useContext } from "react";
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
  Backdrop,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { DatePicker, DateRangePicker } from "rsuite";

import SettingsLayout from "src/components/layouts/SettingsLayout";
import SnackMessage from "src/components/SnackMessage";
import { timezone } from "src/utils/timezone";
import axios from "axios";
import { API_SERVICE } from "src/config/uri";
import { storage, ref, getDownloadURL, uploadBytesResumable } from "src/config/firebase";
import { Create } from "@mui/icons-material";
import { AuthContext } from "src/contextx/authContext";

const Organization = () => {
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
  const [url, setUrl] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(async () => {
    if (user !== null) {
      await axios
        .get(`${API_SERVICE}/api/organization/${user.organization}`)
        .then((res) => {
          console.log(res.data);
          if (res.data !== null) {
            setDetails(res.data);
          }
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

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

    console.log(body);

    await axios
      .put(`${API_SERVICE}/api/organization/update`, body, config)
      .then((res) => {
        setOpen(false);
        setVariant("success");
        setMessage(res.data);
        setSnackOpen(true);
      })
      .then(async () => {
        await axios
          .put(`${API_SERVICE}/api/admin/update`, { organization: details.name }, config)
          .then(() => {
            console.log("Admin Updated Successfully");
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        setVariant("error");
        setMessage(error.message);
        setSnackOpen(true);
        setOpen(false);
      });
  };

  useEffect(() => {
    if (url !== null) {
      const temp = details;
      temp.logo = url;
      setDetails(temp);
    }
  }, [url]);

  // closing backdrop
  const backdropClose = () => {
    setOpen(false);
  };

  // closing snack
  const snackClose = () => {
    setSnackOpen(false);
  };

  const changeHandler = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      const storageRef = ref(storage, `trackerData/organization/${details.id}`);

      const uploadTask = uploadBytesResumable(storageRef, selected);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
          });
        }
      );
    } else {
      console.log("Please again upload file");
    }
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
              <Stack direction="row" alignItems="center">
                {url === null ? (
                  <Avatar src={details.logo} sx={{ width: 120, height: 120, mx: 2 }} />
                ) : (
                  <Avatar src={url} sx={{ width: 120, height: 120, mx: 2 }} />
                )}

                <IconButton sx={{ height: 40, width: 40 }} component="label" color="primary">
                  <Create />
                  <input hidden type="file" onChange={changeHandler} />
                </IconButton>
              </Stack>
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

          <Grid container sx={{ py: 2, mt: 3 }}>
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
