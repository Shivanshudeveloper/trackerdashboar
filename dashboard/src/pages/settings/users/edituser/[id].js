import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
import SettingsLayout from "src/components/layouts/SettingsLayout";
import SaveChangeDialog from "src/components/settings/SaveChangeDialog";
import RemoveDialog from "src/components/settings/RemoveDialog";
import SnackMessage from "src/components/SnackMessage";
import axios from "axios";
import { API_SERVICE } from "src/config/uri";

const EditUser = () => {
  const [saveDialog, setSaveDialog] = useState(false);
  const [removeDialog, setRemoveDialog] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loginUserData, setLoginUserData] = useState(null);
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState("error");
  const [message, setMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const { id } = router.query;

  // getting login user data
  useEffect(() => {
    const data = JSON.parse(window.sessionStorage.getItem("userData"));
    setLoginUserData(data);
  }, []);

  // getting and setting Team list for admin and team admin
  useEffect(async () => {
    if (loginUserData !== null) {
      const { data } = await axios.get(`${API_SERVICE}/api/getTeams/${loginUserData.organization}`);

      if (loginUserData.role === "Admin") {
        setTeamList(data);
        return;
      }

      setTeamList([{ team_name: loginUserData.team }]);
    }
  }, [loginUserData]);

  useEffect(async () => {
    if (id === null || id === undefined) {
      return;
    }

    await axios
      .get(`${API_SERVICE}/api/teamUser/${id}`)
      .then((res) => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setVariant("error");
        setMessage(error.message);
        setSnackOpen(true);
        setLoading(false);
      });
  }, [id]);

  const handleChangeClose = () => {
    setSaveDialog(false);
  };

  const handleRemoveClose = () => {
    setRemoveDialog(false);
  };

  const backdropClose = () => {
    setOpen(false);
  };

  const snackClose = () => {
    setSnackOpen(false);
  };

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    const data = {
      ...userData,
      [event.target.name]: event.target.value,
    };

    setUserData(data);
  };

  const updateUser = async () => {
    setSaveDialog(false);
    setOpen(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      id,
      data: userData,
    };

    await axios
      .post(`${API_SERVICE}/api/teamUser/update`, body, config)
      .then((res) => {
        setMessage(res.data);
        setVariant("success");
        setSnackOpen(true);
        setOpen(false);
      })
      .catch((error) => {
        setMessage(error.message);
        setVariant("error");
        setSnackOpen(true);
        setOpen(false);
      });
  };

  const removeUser = async () => {
    setRemoveDialog(false);
    setOpen(true);

    await axios
      .delete(`${API_SERVICE}/api/teamUser/delete/${id}`)
      .then(() => {
        router.replace("/settings/users");
      })
      .catch((error) => {
        setOpen(false);
        setMessage(error.message);
        setVariant("error");
        setSnackOpen(true);
        console.log(error);
      });
  };

  return (
    <Box sx={{ py: 3 }}>
      <Typography component="h1" variant="h4">
        View / Edit User
      </Typography>

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

      {userData !== null && !loading && (
        <>
          <Grid container sx={{ my: 4 }}>
            <Grid item md={2} sx={{ display: "flex", alignItems: "center" }}>
              <Typography component="h1" variant="h6">
                Name:
              </Typography>
            </Grid>
            <Grid item md={10} sx={{ my: 3 }}>
              <OutlinedInput
                fullWidth
                value={userData.fullName}
                name="fullName"
                onChange={(event) => handleChange(event)}
              />
            </Grid>

            <Grid item md={2} sx={{ display: "flex", alignItems: "center", my: 3 }}>
              <Typography component="h1" variant="h6">
                Profile Picture:
              </Typography>
            </Grid>
            <Grid item md={4} sx={{ my: 3 }}>
              <Avatar src="" sx={{ width: 120, height: 120 }} />
            </Grid>

            <Grid item md={6} sx={{ my: 3 }}>
              <Box>
                <Grid container>
                  <Grid item md={3} sx={{ display: "flex", alignItems: "center" }}>
                    <Typography component="h1" variant="h6">
                      Team
                    </Typography>
                  </Grid>
                  <Grid item md={9}>
                    <FormControl variant="outlined" sx={{ m: 1, minWidth: 400 }}>
                      <InputLabel>Team</InputLabel>
                      <Select
                        label="Team"
                        value={userData.team}
                        name="team"
                        onChange={(e) => handleChange(e)}
                      >
                        {teamList.map((x) => (
                          <MenuItem key={x.team_name} value={x.team_name}>
                            {x.team_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>

              <Box>
                <Grid container>
                  <Grid item md={3} sx={{ display: "flex", alignItems: "center" }}>
                    <Typography component="h1" variant="h6">
                      Role
                    </Typography>
                  </Grid>
                  <Grid item md={9}>
                    <FormControl variant="outlined" sx={{ m: 1, minWidth: 400 }}>
                      <InputLabel>Role</InputLabel>
                      {loginUserData !== null && (
                        <>
                          {loginUserData.role === "Admin" ? (
                            <Select
                              value={userData.role}
                              name="role"
                              onChange={(e) => handleChange(e)}
                              label="Role"
                            >
                              <MenuItem value="Team Admin">Team Admin</MenuItem>
                              <MenuItem value="Team Member">Team Member</MenuItem>
                            </Select>
                          ) : (
                            <Select
                              value={userData.role}
                              name="role"
                              onChange={(e) => handleChange(e)}
                              label="Role"
                            >
                              <MenuItem value="Team Member">Team Member</MenuItem>
                            </Select>
                          )}
                        </>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item md={2} sx={{ display: "flex", alignItems: "center", my: 3 }}>
              <Typography component="h1" variant="h6">
                Email Address:
              </Typography>
            </Grid>
            <Grid item md={10} sx={{ my: 3 }}>
              <OutlinedInput
                fullWidth
                name="email"
                value={userData.email}
                onChange={(e) => handleChange(e)}
              />
            </Grid>

            <Grid item md={2} sx={{ display: "flex", alignItems: "center", my: 3 }}>
              <Typography component="h1" variant="h6">
                Shareable Link:
              </Typography>
            </Grid>
            <Grid item md={10} sx={{ my: 3, display: "flex" }}>
              <OutlinedInput fullWidth sx={{ mr: 2, m: 1 }} />
              <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Copy Link</InputLabel>
                <Select label="Copy Link">
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

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
                  defaultValue={userData.trackingMode}
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
                    <FormControl variant="outlined" sx={{ m: 1, minWidth: 400 }}>
                      <InputLabel>Track On</InputLabel>
                      <Select label="Track On">
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
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
                  <Grid item md={9}>
                    <FormControl variant="outlined" sx={{ m: 1, minWidth: 400 }}>
                      <InputLabel>Track Between</InputLabel>
                      <Select label="Track Between">
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </>
      )}

      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 5 }}>
        <Button
          variant="contained"
          sx={{ px: 4, py: 1.2, fontSize: 16, mx: 0.5 }}
          onClick={() => setRemoveDialog(true)}
        >
          Remove User
        </Button>
        <Button
          variant="contained"
          sx={{ px: 4, py: 1.2, fontSize: 16, mx: 0.5 }}
          onClick={() => router.push("/settings/users")}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ px: 4, py: 1.2, fontSize: 16, mx: 0.5 }}
          onClick={() => setSaveDialog(true)}
        >
          Save
        </Button>
      </Stack>
      <SaveChangeDialog
        updateUser={updateUser}
        open={saveDialog}
        handleClose={handleChangeClose}
        id={id}
      />
      <RemoveDialog
        removeUser={removeUser}
        open={removeDialog}
        handleClose={handleRemoveClose}
        id={id}
      />
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

EditUser.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default EditUser;
