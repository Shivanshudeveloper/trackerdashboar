import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  ListItem,
  ListItemText,
  FormControlLabel,
  Switch,
  Stack,
  Button,
  Backdrop,
  CircularProgress,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SettingsLayout from "src/components/layouts/SettingsLayout";
import SnackMessage from "src/components/SnackMessage";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { API_SERVICE } from "src/config/uri";

const Productivity = () => {
  const [userData, setUserData] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [selectedTeamName, setSelectedTeamName] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [teamCategories, setTeamCategories] = useState([]);
  const [allApps, setAllApps] = useState([]);
  const [teamApps, setTeamApps] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [backDropOpen, setBackDropOpen] = useState(false);
  const [variant, setVariant] = useState("success");
  const [message, setMessage] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState("Productive");

  const type = ["Productive", "Unproductive"];

  useEffect(() => {
    const user = JSON.parse(window.sessionStorage.getItem("userData"));
    setUserData(user);
  }, []);

  useEffect(async () => {
    if (userData !== null) {
      const { data } = await axios.get(`${API_SERVICE}/api/getTeams/${userData.organization}`);
      setTeamList(data);
      setSelectedTeamName(data[0].team_name);
    }
  }, [userData]);

  // getting all categories of an organization
  useEffect(async () => {
    if (userData !== null) {
      await axios
        .get(`${API_SERVICE}/api/category/${userData.organization}`)
        .then((res) => {
          setAllCategories(res.data);
        })
        .catch((error) => {
          console.log(error);
        });

      await axios
        .get(`${API_SERVICE}/api/app/${userData.organization}`)
        .then((res) => {
          setAllApps(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userData]);

  // setting category list according to team
  useEffect(() => {
    if (selectedTeamName !== "" && allCategories.length !== 0) {
      const categories = allCategories.filter((x) => x.teamName === selectedTeamName);
      setTeamCategories(categories);
    }
  }, [allCategories, selectedTeamName]);

  // setting apps list according to team
  useEffect(() => {
    if (selectedTeamName !== "" && allApps.length !== 0) {
      const apps = allApps.filter((x) => x.team === selectedTeamName);
      const arr = [];
      const singleApp = [];
      apps.forEach((x) => {
        if (!arr.includes(x.owner)) {
          arr.push(x.owner);
          singleApp.push(x);
        }
      });

      setTeamApps(singleApp);
    }
  }, [allApps, selectedTeamName]);

  // dialog close
  const dialogClose = () => {
    setDialogOpen(false);
    resetDialog();
  };

  const backdropClose = () => {
    setBackDropOpen(false);
  };

  const snackClose = () => {
    setSnackOpen(false);
  };

  const selectTeam = (teamName) => {
    setSelectedTeamName(teamName);
  };

  // dialog cancel
  const resetDialog = () => {
    setCategoryName("");
    setCategoryType("Productive");
  };

  // creating new category
  const createCategory = async () => {
    if (categoryName === "") {
      alert("ALl Fields are required");
      return;
    }
    dialogClose();
    setBackDropOpen(true);
    const data = {
      id: uuidv4(),
      categoryName,
      organization: userData.organization,
      type: categoryType,
      teamName: selectedTeamName,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = { data };

    await axios
      .post(`${API_SERVICE}/api/category/create`, body, config)
      .then((res) => {
        setAllCategories([...allCategories, res.data]);
        dialogClose();
        setBackDropOpen(false);
        setMessage("Category created");
        setVariant("success");
        setSnackOpen(true);
        resetDialog();
      })
      .catch((error) => {
        setMessage(error.message);
        setVariant("error");
        setSnackOpen(true);
      });
  };

  // updating category
  const update = async () => {
    setBackDropOpen(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      categories: teamCategories,
      apps: teamApps,
      team: selectedTeamName,
      organization: userData.organization,
    };

    console.log(body);

    await axios
      .put(`${API_SERVICE}/api/category/update`, body, config)
      .then((res) => {
        setMessage(res.data);
        setBackDropOpen(false);
        setVariant("success");
        setSnackOpen(true);
      })
      .catch((error) => {
        setBackDropOpen(false);
        setMessage(error.message);
        setVariant("error");
        setSnackOpen(true);
      });
  };

  // changing category type
  const handleTypeChange = (e, i) => {
    if (e.target.checked) {
      const data = teamCategories;
      data[i].type = "Unproductive";
      setTeamCategories([...data]);
    } else {
      const data = teamCategories;
      data[i].type = "Productive";
      setTeamCategories([...data]);
    }
  };

  const setAppCategory = (e, index) => {
    const data = teamApps;
    data[index].category = e;

    let appType = "";
    teamCategories.forEach((y) => {
      if (y.categoryName === e) {
        appType = y.type;
      }
    });

    data[index].type = appType;

    setTeamApps([...data]);
  };

  return (
    <Box sx={{ pb: 3, pt: 1, height: "100%" }}>
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 5 }}>
        <Button
          onClick={() => setDialogOpen(true)}
          variant="contained"
          sx={{ px: 4, py: 1.2, fontSize: 16, mx: 0.5 }}
        >
          Create Category
        </Button>
        <Button onClick={update} variant="contained" sx={{ px: 4, py: 1.2, fontSize: 16, mx: 0.5 }}>
          Save
        </Button>
      </Stack>
      <Grid container>
        <Grid item md={4} sx={{ backgroundColor: "#f5f5f5", p: 2, px: 3, flex: 1 }}>
          <Typography textAlign="center" component="h1" variant="h6" sx={{ m: 2, mb: 4 }}>
            Teams
          </Typography>
          <Box>
            {teamList.map((x) => (
              <>
                {selectedTeamName === x.team_name ? (
                  <ListItem
                    key={x.team_name}
                    sx={{
                      backgroundColor: "#DCDCDC",
                      borderRadius: 2,
                      cursor: "pointer",
                      py: 2.5,
                    }}
                    onClick={() => selectTeam(x.team_name)}
                  >
                    <ListItemText sx={{ fontSize: 18 }} primary={x.team_name} />
                  </ListItem>
                ) : (
                  <ListItem
                    key={x.id}
                    sx={{
                      backgroundColor: "#E8E9EB",
                      borderRadius: 2,
                      my: 2,
                      cursor: "pointer",
                      py: 2.5,
                    }}
                    onClick={() => selectTeam(x.team_name)}
                  >
                    <ListItemText sx={{ fontSize: 18 }} primary={x.team_name} />
                  </ListItem>
                )}
              </>
            ))}
          </Box>
        </Grid>

        <Grid item md={4} sx={{ p: 2, px: 3, flex: 1 }}>
          <Typography textAlign="center" component="h1" variant="h6" sx={{ m: 2, mb: 4 }}>
            Application Categories
          </Typography>
          <Box>
            {teamCategories.map((x, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <FormControlLabel
                    control={
                      <Switch
                        name="type"
                        checked={x.type === "Unproductive"}
                        size="large"
                        color="primary"
                        onChange={(e) => handleTypeChange(e, index)}
                      />
                    }
                    label={
                      <Stack direction="row">
                        <Typography sx={{ fontSize: 12 }} component="p" variant="p">
                          Productive
                        </Typography>
                        <Typography sx={{ fontSize: 12, ml: 2 }} component="p" variant="p">
                          Unproductive
                        </Typography>
                      </Stack>
                    }
                    labelPlacement="bottom"
                  />
                }
                sx={{ backgroundColor: "#E8E9EB", borderRadius: 2, my: 2, py: 2.5 }}
              >
                <ListItemText primary={x.categoryName} />
              </ListItem>
            ))}
          </Box>
        </Grid>

        <Grid item md={4} sx={{ backgroundColor: "#f5f5f5", p: 2, px: 3, flex: 1 }}>
          <Typography textAlign="center" component="h1" variant="h6" sx={{ m: 2, mb: 4 }}>
            Applications
          </Typography>
          <Box>
            {teamApps.map((x, index) => (
              <ListItem
                key={index}
                sx={{ backgroundColor: "#E8E9EB", borderRadius: 2, my: 2, py: 1.5 }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ width: "100%" }}
                >
                  <Typography noWrap variant="p" component="p">
                    {x.owner.split(".")[0]}
                  </Typography>
                  <FormControl fullWidth sx={{ width: "50%" }}>
                    <Select
                      value={x.category === null ? "" : x.category}
                      name="category"
                      onChange={(e) => setAppCategory(e.target.value, index)}
                    >
                      {teamCategories.map((item) => (
                        <MenuItem key={item.id} value={item.categoryName}>
                          {item.categoryName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>
              </ListItem>
            ))}
          </Box>
        </Grid>
      </Grid>

      <Dialog open={dialogOpen} onClose={dialogClose} fullWidth>
        <DialogTitle>Create New Category</DialogTitle>
        <DialogContent>
          <DialogContentText>All Fields are required</DialogContentText>
          <TextField
            sx={{ my: 3 }}
            autoFocus
            margin="dense"
            id="name"
            label="Category Name"
            type="text"
            fullWidth
            variant="outlined"
            required
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <FormControl fullWidth variant="outlined" sx={{ my: 2 }}>
            <InputLabel>Category Type</InputLabel>
            <Select
              label="Category Type"
              value={categoryType}
              name="categoryType"
              onChange={(e) => setCategoryType(e.target.value)}
            >
              {type.map((x) => (
                <MenuItem key={x} value={x}>
                  {x}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogClose}>Cancel</Button>
          <Button onClick={createCategory}>Create</Button>
        </DialogActions>
      </Dialog>
      <SnackMessage
        variant={variant}
        message={message}
        snackOpen={snackOpen}
        handleSnackClose={snackClose}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backDropOpen}
        onClick={backdropClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

Productivity.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default Productivity;
