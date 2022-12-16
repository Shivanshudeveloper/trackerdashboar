import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Box,
  Typography,
  Stack,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ShareIcon from "@mui/icons-material/Share";
import DashboardLayout from "src/components/layouts/DashboardLayout";
import SnackMessage from "src/components/SnackMessage";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { API_SERVICE } from "../../config/uri";
import { useContext } from "react";
import { AuthContext } from "src/contextx/authContext";

const AddUsers = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [defaultMode, setDefaultMode] = useState("stealth");
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [checked, setChecked] = useState([]);
  const [variant, setVariant] = useState("success");
  const [message, setMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [backDropOpen, setBackDropOpen] = useState(false);

  const backdropClose = () => {
    setBackDropOpen(false);
  };
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(async () => {
    if (user !== null) {
      const { data } = await axios.get(`${API_SERVICE}/api/getTeams/${user.organization}`);
      if (user.role === "Admin") {
        setTeamList(data);
        return;
      }

      setTeamList([{ team_name: user.team }]);
    }
  }, [user]);

  const snackClose = () => {
    setSnackOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setEmail("");
  };

  const changeDefaultMode = (e) => {
    if (e.target.checked) {
      setDefaultMode("visible");
      for (let i of userList) {
        i.trackingMode = "visible";
      }
    } else {
      setDefaultMode("stealth");
      for (let i of userList) {
        i.trackingMode = "stealth";
      }
    }
  };

  const createUser = () => {
    const id = uuidv4();
    const userData = {
      id,
      name,
      email,
      organization: user.organization,
      team: "",
      role: "",
      trackingMode: defaultMode,
      isVerified: false,
    };
    setUserList([...userList, userData]);
    setOpen(false);
    setName("");
    setEmail("");
  };

  const selectTeam = (e, index) => {
    const data = userList[index];
    data.team = e.target.value;
    userList[index] = data;
    setUserList([...userList]);
  };

  const selectRole = (e, index) => {
    const data = userList[index];
    data.role = e.target.value;
    userList[index] = data;
    setUserList([...userList]);
  };
  const selectTrackingMode = (e, index) => {
    checked[index] = e.target.checked;
    setChecked([...checked]);

    const data = userList[index];
    let mode = "stealth";

    if (e.target.checked) {
      mode = "visible";
    }

    data.trackingMode = mode;
    userList[index] = data;
    setUserList([...userList]);
  };

  const saveUsers = async () => {
    if (userList.length === 0) {
      setMessage("Create atlest one user");
      setVariant("error");
      setSnackOpen(true);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = { teamUsers: userList };

      setBackDropOpen(true);

      const { data } = await axios.post(`${API_SERVICE}/api/teamUser/create`, body, config);

      console.log(data);
      setBackDropOpen(false);
      setMessage(data.message);
      setVariant("success");
      setSnackOpen(true);
      setUserList([]);
    } catch (error) {
      console.log(error);
      setBackDropOpen(false);
      setMessage(error);
      setVariant("error");
      setSnackOpen(true);
    }
  };

  if (!user) return <></>;

  return (
    <>
      <Head>
        <title>Add Users | Material Kit</title>
      </Head>
      <Box sx={{ p: 5, display: "flex", flexDirection: "column" }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography component="h1" variant="h5">
            Add Users
          </Typography>
          <Stack direction="row" alignItems="center">
            <Typography component="h1" variant="h6">
              Default User Tracking Mode:
            </Typography>
            <Stack direction="column" alignItems="center" sx={{ ml: 2 }}>
              <FormControlLabel
                control={<Switch color="primary" onChange={(e) => changeDefaultMode(e)} />}
                label={
                  <Stack direction="row">
                    <Typography sx={{ fontSize: 12 }} component="p" variant="p">
                      Stealth
                    </Typography>
                    <Typography sx={{ fontSize: 12, ml: 2 }} component="p" variant="p">
                      Visible
                    </Typography>
                  </Stack>
                }
                labelPlacement="bottom"
              />
            </Stack>
          </Stack>
        </Stack>

        <TableContainer sx={{ my: 4 }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">User Id</TableCell>
                <TableCell align="center">Team</TableCell>
                <TableCell align="center">Role</TableCell>
                <TableCell align="center">Email Address</TableCell>
                <TableCell align="center">Tracking Mode</TableCell>
                <TableCell align="center">Sharable Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((row, index) => (
                <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel>Team</InputLabel>
                      <Select label="Team" value={row.team} onChange={(e) => selectTeam(e, index)}>
                        {teamList.map((x) => (
                          <MenuItem value={x.team_name}>{x.team_name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="center">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel>Role</InputLabel>
                      {user !== null && (
                        <React.Fragment>
                          {user.role === "Admin" ? (
                            <Select
                              value={row.role}
                              onChange={(e) => selectRole(e, index)}
                              label="Role"
                            >
                              <MenuItem value="Team Admin">Team Admin</MenuItem>
                              <MenuItem value="Team Member">Team Member</MenuItem>
                            </Select>
                          ) : (
                            <Select
                              value={row.role}
                              onChange={(e) => selectRole(e, index)}
                              label="Role"
                            >
                              <MenuItem value="Team Member">Team Member</MenuItem>
                            </Select>
                          )}
                        </React.Fragment>
                      )}
                    </FormControl>
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">
                    <FormControlLabel
                      control={
                        row.trackingMode === "visible" ? (
                          <Switch
                            checked={true}
                            onChange={(e) => selectTrackingMode(e, index)}
                            color="primary"
                          />
                        ) : (
                          <Switch onChange={(e) => selectTrackingMode(e, index)} color="primary" />
                        )
                      }
                      label={
                        <Stack direction="row">
                          <Typography sx={{ fontSize: 12 }} component="p" variant="p">
                            Stealth
                          </Typography>
                          <Typography sx={{ fontSize: 12, ml: 2 }} component="p" variant="p">
                            Visible
                          </Typography>
                        </Stack>
                      }
                      labelPlacement="bottom"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <ShareIcon />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button fullWidth variant="contained" sx={{ py: 1.4 }} onClick={() => setOpen(true)}>
          Add New User
        </Button>

        <Box sx={{ mt: 2, alignSelf: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ py: 1.4, mr: 2, backgroundColor: "gray" }}
            onClick={() => router.push("/dashboard")}
          >
            Cancel
          </Button>
          <Button variant="contained" sx={{ py: 1.4 }} onClick={() => saveUsers()}>
            Save User
          </Button>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a user</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>All Fields are required</DialogContentText>
          <TextField
            required
            margin="normal"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            margin="normal"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createUser}>Create</Button>
        </DialogActions>
      </Dialog>
      {/* <SnackMessage
        variant={variant}
        message={message}
        snackOpen={snackOpen}
        handleSnackClose={snackClose}
      /> */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backDropOpen}
        onClick={backdropClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

AddUsers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddUsers;
