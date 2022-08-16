import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
} from "@mui/material";
import TimesheetLayout from "../../components/layouts/TimesheetLayout";
import ActiveTeamsTable from "src/components/timesheet/ActiveTeamsTable";
import axios from "axios";
import { API_SERVICE } from "../../config/uri";
import { AuthContext } from "src/contextx/authContext";

const ActiveHours = () => {
  const [userData, setUserData] = useState(null);
  const [activeData, setActiveData] = useState({});
  const [loading, setLoading] = useState(true);
  const [teamList, setTeamList] = useState([]);
  const [filter, setFilter] = useState("All Teams");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user !== null) {
      setUserData(user);
    }
  }, [user]);

  const fetchTeamsData = async (team) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_SERVICE}/api/activeHours/${userData.organization}/${team}`
      );
      console.log(data);

      const result = data.reduce(function (r, a) {
        r[a.team] = r[a.team] || [];
        r[a.team].push(a);
        return r;
      }, Object.create(null));

      setLoading(false);
      setActiveData(result);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  useEffect(async () => {
    if (userData !== null) {
      const { data } = await axios.get(`${API_SERVICE}/api/getTeams/${userData.organization}`);
      setTeamList(data);
    }
  }, [userData]);

  useEffect(async () => {
    if (userData !== null) {
      fetchTeamsData("All Teams");
    }
  }, [userData]);

  const applyTeamsFilter = (e) => {
    setFilter(e.target.value);
    setLoading(true);
    if (e.target.value === "All Teams") {
      try {
        fetchTeamsData(e.target.value);
      } catch (error) {
        console.log(error.response.data.message);
      }
      return;
    }

    try {
      fetchTeamsData(e.target.value);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 5,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <FormControl variant="filled" sx={{ minWidth: 250, mr: 3, alignSelf: "flex-end" }}>
          <InputLabel id="demo-simple-select-filled-label">All Teams</InputLabel>
          <Select value={filter} onChange={(e) => applyTeamsFilter(e)} label="Filter">
            <MenuItem value="All Teams">All Teams</MenuItem>
            {teamList.map((x) => (
              <MenuItem value={x.team_name}>{x.team_name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="filled" sx={{ minWidth: 250, mr: 3, alignSelf: "flex-end" }}>
          <InputLabel id="demo-simple-select-filled-label">Month</InputLabel>
          <Select labelId="demo-simple-select-filled-label" id="demo-simple-select-filled">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" sx={{ px: 4.2, py: 1.3, fontSize: 18 }}>
          Export
        </Button>
      </Box>
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: 500,
            width: "100%",
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}
      <Box sx={{ mt: 5 }}>
        {Object.keys(activeData).length !== 0 && !loading && (
          <>
            {Object.keys(activeData).map((key) => (
              <ActiveTeamsTable key={key} data={activeData[key]} />
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};

ActiveHours.getLayout = (page) => <TimesheetLayout>{page}</TimesheetLayout>;

export default ActiveHours;
