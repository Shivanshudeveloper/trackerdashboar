import React, { useState, useEffect, useContext } from "react";
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
  CircularProgress,
  Backdrop,
  IconButton,
} from "@mui/material";
import SettingsLayout from "src/components/layouts/SettingsLayout";
import SnackMessage from "src/components/SnackMessage";
import { v4 as uuidv4 } from "uuid";
import { storage, ref, getDownloadURL, uploadBytesResumable } from "src/config/firebase";
import { CameraAlt } from "@mui/icons-material";
import { AuthContext } from "src/contextx/authContext";
import { TeamAndUserContext } from "src/contextx/teamAndUserContext";

const AddNewUser = () => {
  // states
  const [teamList, setTeamList] = useState([]);
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState("error");
  const [message, setMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [userData, setUserData] = useState({
    email: null,
    fullName: null,
    id: uuidv4(),
    isVerified: false,
    organization: null,
    password: null,
    profilePicture: null,
    role: null,
    team: null,
  });
  const [url, setUrl] = useState(null);

  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { teams, addNewUser } = useContext(TeamAndUserContext);

  // getting authenticated user data and setting organization
  useEffect(() => {
    if (user !== null) {
      const data = {
        ...userData,
        organization: user.organization,
      };

      setUserData(data);
    }
  }, [user]);

  // getting and setting Team list for admin and team admin
  useEffect(async () => {
    if (user !== null) {
      if (user.role === "Admin") {
        setTeamList(teams);
        return;
      }

      setTeamList([{ team_name: user.team }]);
    }
  }, [user]);

  useEffect(() => {
    if (url !== null) {
      const temp = userData;
      temp.profilePicture = url;
      setUserData(temp);
    }
  }, [url]);

  // handling change of form fields
  const handleChange = (event) => {
    const data = {
      ...userData,
      [event.target.name]: event.target.value,
    };

    setUserData(data);
  };

  // saving user to database
  const saveUser = async () => {
    if (
      userData.fullName === null ||
      userData.email === null ||
      userData.team === null ||
      userData.role === null
    ) {
      setMessage("All Fields are required");
      setVariant("error");
      setSnackOpen(true);
      return;
    }

    setOpen(true);

    const body = { teamUsers: [userData] };
    await addNewUser(body);
    setOpen(false);
    setMessage("User Added Successfully");
    setVariant("success");
    setSnackOpen(true);
  };

  const changeHandler = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      const storageRef = ref(storage, `trackerData/profile/${userData.id}`);

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

  // going back on cancel
  const cancel = () => {
    router.replace("/settings/users");
  };

  // closing backdrop
  const backdropClose = () => {
    setOpen(false);
  };

  const snackClose = () => {
    setSnackOpen(false);
  };

  return (
    <Box sx={{ py: 3 }}>
      <Typography component="h1" variant="h4">
        Add New User
      </Typography>
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
            onChange={(e) => handleChange(e)}
          />
        </Grid>

        <Grid item md={2} sx={{ display: "flex", alignItems: "center", my: 3 }}>
          <Typography component="h1" variant="h6">
            Profile Picture:
          </Typography>
        </Grid>
        <Grid item md={4} sx={{ my: 3 }}>
          <Stack direction="row" alignItems="center">
            {url === null ? (
              <Avatar src={userData.profilePicture} sx={{ width: 120, height: 120, mx: 2 }} />
            ) : (
              <Avatar src={url} sx={{ width: 120, height: 120, mx: 2 }} />
            )}

            <IconButton sx={{ height: 40, width: 40 }} component="label" color="primary">
              <CameraAlt />
              <input hidden type="file" onChange={changeHandler} />
            </IconButton>
          </Stack>
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
                  {user !== null && (
                    <>
                      {user.role === "Admin" ? (
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
      </Grid>

      {/* <Box>
        <Grid container>
          <Grid item md={2} sx={{ display: "flex", alignItems: "center" }}>
            <Typography component="h1" variant="h6">
              Track On
            </Typography>
          </Grid>
          <Grid item md={10}>
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
      </Box> */}

      {/* <Box>
        <Grid container>
          <Grid item md={2} sx={{ display: "flex", alignItems: "center" }}>
            <Typography component="h1" variant="h6">
              Track Between
            </Typography>
          </Grid>
          <Grid item md={10}>
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
      </Box> */}

      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 5 }}>
        <Button onClick={cancel} variant="contained" sx={{ px: 4, py: 1.2, fontSize: 16, mx: 0.5 }}>
          Cancel
        </Button>
        <Button
          onClick={saveUser}
          variant="contained"
          sx={{ px: 4, py: 1.2, fontSize: 16, mx: 0.5 }}
        >
          Save
        </Button>
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
        onClick={backdropClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

AddNewUser.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default AddNewUser;
