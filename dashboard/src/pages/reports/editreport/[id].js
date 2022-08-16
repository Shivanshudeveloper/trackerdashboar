import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  OutlinedInput,
  FormControlLabel,
  Button,
  Stack,
  FormGroup,
  Checkbox,
  ListItemText,
} from "@mui/material";
import MainLayout from "src/components/layouts/MainLayout";
import { DateRangePicker, DatePicker } from "rsuite";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { API_SERVICE } from "src/config/uri";
import SnackMessage from "src/components/SnackMessage";

const shareReportArr = ["One Time", "Daily", "Weekly", "Monthly", "Annually", "Fortnightly"];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CreateReport = () => {
  const [userData, setUserData] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [teamUsersList, setTeamUsersList] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [userNames, setUserNames] = useState([]);
  const [userId, setUserId] = useState([]);
  const [users, setUsers] = useState([]);
  const [reportTitle, setReportTitle] = useState("");
  const [reportPeriod, setReportPeriod] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [shareTime, setShareTime] = useState(new Date());
  const [shareReport, setShareReport] = useState("");
  const [shareWith, setShareWith] = useState("");
  const [category, setCategory] = useState({
    Productivity: false,
    Timesheet: false,
    AppUsage: false,
    Activities: false,
    Screenshots: false,
  });
  const [loading, setLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [variant, setVariant] = useState("success");
  const [message, setMessage] = useState("");

  const router = useRouter();
  const { id } = router.query;

  // fetching login user data
  useEffect(() => {
    const data = JSON.parse(window.sessionStorage.getItem("userData"));
    setUserData(data);
  }, []);

  // fetching ans setting teams
  useEffect(async () => {
    if (userData !== null) {
      try {
        const { data } = await axios.get(`${API_SERVICE}/api/getTeams/${userData.organization}`);
        if (userData.role === "Admin") {
          setTeamList(data);
          return;
        }

        setTeamList([{ team_name: userData.team }]);
      } catch (error) {
        console.log(error);
      }
    }
  }, [userData]);

  // fetching all users list
  useEffect(async () => {
    if (userData !== null) {
      try {
        const { data } = await axios.get(`${API_SERVICE}/api/teamUsers/${userData.organization}`);
        setUserList(data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [userData]);

  // setting user list for selected teams
  useEffect(() => {
    const list = userList.filter((x) => teamName === x.team);
    setTeamUsersList(list);
  }, [teamName]);

  // function to close snack
  const snackClose = () => {
    setSnackOpen(false);
  };

  // function to close backdrop
  const backdropClose = () => {
    setLoading(false);
  };

  // selecting teams
  const selectTeam = (event) => {
    setTeamName(event.target.value);
  };

  // selecting users
  const selectUsers = (event) => {
    const {
      target: { value },
    } = event;

    const usersArr = [];
    const names = [];
    value.forEach((x) => {
      teamUsersList.forEach((user) => {
        if (x === user.id) {
          usersArr.push({ id: x, fullName: user.fullName });
          names.push(user.fullName);
        }
      });
    });

    console.log(value);
    console.log(usersArr);
    console.log(names);

    setUsers(usersArr);
    setUserNames(names);
    setUserId(typeof value === "string" ? value.split(",") : value);
  };

  // setting report date range
  const setReportRange = (data) => {
    if (data !== null) {
      const range = reportPeriod;
      range.startDate = data[0];
      range.endDate = data[1];
      setReportPeriod({ ...range });
    } else {
      const range = reportPeriod;
      range.startDate = new Date();
      range.endDate = new Date();
      setReportPeriod({ ...range });
    }
  };

  // selecting time
  const selectTime = (e) => {
    if (e !== null) {
      setShareTime(e);
    } else {
      setShareTime(new Date());
    }
  };

  // setting category
  const handleChange = (event) => {
    setCategory({
      ...category,
      [event.target.name]: event.target.checked,
    });
  };

  const { Productivity, Timesheet, AppUsage, Activities, Screenshots } = category;

  // resseting all state after saving report
  const setAllStateToStart = () => {
    setTeamName("");
    setUserNames([]);
    setUsers([]);
    setUserId([]);
    setReportTitle("");
    setCategory({
      Productivity: false,
      Timesheet: false,
      AppUsage: false,
      Activities: false,
      Screenshots: false,
    });
    setReportPeriod({
      startDate: new Date(),
      endDate: new Date(),
    });
    setShareReport("");
    setShareTime(new Date());
    setShareWith("");
  };

  // saving report to database
  const saveReports = async () => {
    try {
      const reportCategoryArr = [];
      Object.entries(category).filter(([key, value]) => {
        if (value === true) {
          reportCategoryArr.push(key);
        }
      });

      const insertData = {
        reportTitle: reportTitle,
        reportCategory: reportCategoryArr,
        reportPeriod: reportPeriod,
        sharePeriod: shareReport,
        shareTime: shareTime,
        shareWith: shareWith,
        team: teamName,
        users: users,
        createdBy: userData.id,
        organization: userData.organization,
        type: "scheduled",
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        data: insertData,
      };

      setLoading(true);
      const { data } = await axios.post(`${API_SERVICE}/api/report/create`, body, config);
      setMessage(data.message);
      setVariant("success");
      setLoading(false);
      setSnackOpen(true);
      setAllStateToStart();
    } catch (error) {
      setLoading(false);
      setMessage(error.message);
      setVariant("error");
      setSnackOpen(true);
    }
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography component="h1" variant="h4" sx={{ fontWeight: 500 }}>
        Edit Report
      </Typography>
      <Grid container sx={{ mt: 3 }}>
        <Grid item md={2} sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Typography component="h1" variant="h6" sx={{ fontWeight: 500 }}>
            Select Team:
          </Typography>
        </Grid>
        <Grid item md={10} sx={{ mt: 2 }}>
          <FormControl sx={{ m: 1, width: 400 }}>
            <InputLabel id="select_teams">Select Teams</InputLabel>
            <Select value={teamName} onChange={(e) => selectTeam(e)} label="Select Teams">
              {teamList.map((x) => (
                <MenuItem value={x.team_name}>{x.team_name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={2} sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Typography component="h1" variant="h6" sx={{ fontWeight: 500 }}>
            Select User/s:
          </Typography>
        </Grid>
        <Grid item md={10} sx={{ mt: 2 }}>
          <FormControl sx={{ m: 1, width: 400 }}>
            <InputLabel id="select_teams">Select Users</InputLabel>
            <Select
              labelId="select_users"
              id="users"
              multiple
              value={userId}
              onChange={selectUsers}
              input={<OutlinedInput label="Select Users" />}
              renderValue={(selected) => selected.join(", ")}
              MenuProps={MenuProps}
            >
              {teamUsersList.map((x) => (
                <MenuItem key={x.id} value={x.id}>
                  <Checkbox checked={userNames.indexOf(x.fullName) > -1} />
                  <ListItemText primary={x.fullName} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={2} sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Typography component="h1" variant="h6" sx={{ fontWeight: 500 }}>
            Report Title:
          </Typography>
        </Grid>
        <Grid item md={10} sx={{ mt: 3 }}>
          <OutlinedInput
            fullWidth
            placeholder="Title"
            value={reportTitle}
            onChange={(e) => setReportTitle(e.target.value)}
          />
        </Grid>

        <Grid item md={2} sx={{ display: "flex", alignItems: "center", my: 3 }}>
          <Typography component="h1" variant="h6" sx={{ fontWeight: 500 }}>
            Report Category:
          </Typography>
        </Grid>
        <Grid item md={10} sx={{ my: 3 }}>
          <FormControl component="fieldset">
            <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
              <FormControlLabel
                control={
                  <Checkbox checked={Productivity} onChange={handleChange} name="Productivity" />
                }
                label="Productivity"
              />
              <FormControlLabel
                control={<Checkbox checked={Timesheet} onChange={handleChange} name="Timesheet" />}
                label="Timesheet"
              />
              <FormControlLabel
                control={<Checkbox checked={AppUsage} onChange={handleChange} name="AppUsage" />}
                label="App Usage"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={Activities} onChange={handleChange} name="Activities" />
                }
                label="Activities"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={Screenshots} onChange={handleChange} name="Screenshots" />
                }
                label="Screenshots"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item md={2} sx={{ display: "flex", alignItems: "center", my: 3 }}>
          <Typography component="h1" variant="h6" sx={{ fontWeight: 500 }}>
            Report Period:
          </Typography>
        </Grid>
        <Grid item md={10} sx={{ my: 3 }}>
          <DateRangePicker onChange={setReportRange} />
        </Grid>

        <Grid item md={2} sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          <Typography component="h1" variant="h6" sx={{ fontWeight: 500 }}>
            Share Report:
          </Typography>
        </Grid>
        <Grid item md={6} sx={{ mt: 3 }}>
          <Grid container>
            {shareReportArr.map((x, i) => (
              <Grid item md={4} key={i++}>
                {shareReport === x ? (
                  <Button
                    variant="contained"
                    onClick={() => setShareReport(x)}
                    sx={{ px: 6, py: 1.4 }}
                  >
                    {x}
                  </Button>
                ) : (
                  <Button onClick={() => setShareReport(x)} sx={{ px: 6, py: 1.4 }}>
                    {x}
                  </Button>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          item
          md={4}
          sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", mt: 3 }}
        >
          <Typography component="h1" variant="h6" sx={{ fontWeight: 500, mr: 3 }}>
            at
          </Typography>
          <div className="field">
            <DatePicker format="HH:mm" ranges={[]} style={{ width: 260 }} onChange={selectTime} />
          </div>
        </Grid>

        <Grid item md={2} sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Typography component="h1" variant="h6" sx={{ fontWeight: 500 }}>
            Share With:
          </Typography>
        </Grid>
        <Grid item md={10} sx={{ mt: 3 }}>
          <OutlinedInput
            fullWidth
            placeholder="Enter Email"
            value={shareWith}
            onChange={(e) => setShareWith(e.target.value)}
          />
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
        <Button
          variant="contained"
          sx={{ px: 6, py: 1.3, mr: 3, fontSize: 18 }}
          onClick={() => router.push(`/reports/preview/${id}`)}
        >
          Preview
        </Button>
        <Button variant="contained" sx={{ px: 6, py: 1.5, fontSize: 18 }} onClick={saveReports}>
          Save
        </Button>
      </Stack>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        onClick={backdropClose}
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

CreateReport.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default CreateReport;
