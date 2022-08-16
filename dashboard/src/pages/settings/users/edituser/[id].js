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
  Backdrop,
  CircularProgress,
  IconButton,
} from "@mui/material";
import SettingsLayout from "src/components/layouts/SettingsLayout";
import SaveChangeDialog from "src/components/settings/SaveChangeDialog";
import RemoveDialog from "src/components/settings/RemoveDialog";
import SnackMessage from "src/components/SnackMessage";
import { storage, ref, getDownloadURL, uploadBytesResumable } from "src/config/firebase";
import { Create } from "@mui/icons-material";
import { TeamAndUserContext } from "src/contextx/teamAndUserContext";
import { AuthContext } from "src/contextx/authContext";

const EditUser = () => {
  const [saveDialog, setSaveDialog] = useState(false);
  const [removeDialog, setRemoveDialog] = useState(false);
  const [teamList, setTeamList] = useState([]);
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState("error");
  const [message, setMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(null);

  const router = useRouter();

  const { id } = router.query;
  const { user } = useContext(AuthContext);
  const { teams, userData, getUserDetails, setUserData, updateUserDetails, deleteUser } =
    useContext(TeamAndUserContext);

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
    if (userData !== null) {
      setLoading(false);
    }
  }, [userData]);

  useEffect(() => {
    if (id === null || id === undefined) {
      return;
    }

    getUserDetails(id);
  }, [id]);

  useEffect(() => {
    if (url !== null) {
      const temp = userData;
      temp.profilePicture = url;
      setUserData(temp);
    }
  }, [url]);

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

    const body = {
      id,
      data: userData,
    };

    await updateUserDetails(body);
    setMessage("User Updated Successfully");
    setVariant("success");
    setSnackOpen(true);
    setOpen(false);
  };

  const removeUser = async () => {
    setRemoveDialog(false);
    setOpen(true);

    await deleteUser(id);
    router.replace("/settings/users");
  };

  const changeHandler = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      const storageRef = ref(storage, `trackerData/profile/${id}`);

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
              <Stack direction="row" alignItems="center">
                {url === null ? (
                  <Avatar src={userData.profilePicture} sx={{ width: 120, height: 120, mx: 2 }} />
                ) : (
                  <Avatar src={url} sx={{ width: 120, height: 120, mx: 2 }} />
                )}

                <IconButton sx={{ height: 40, width: 40 }} component="label" color="primary">
                  <Create />
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
        </>
      )}

      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 5 }}>
        <Button
          variant="contained"
          sx={{ px: 4, py: 1.2, fontSize: 16, mx: 0.5, backgroundColor: "red" }}
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
