import React, { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, CircularProgress } from "@mui/material";
import LeaderboardLayout from "../../components/layouts/LeaderboardLayout";
import PersonInfoBar from "src/components/leaderboard/PersonInfoBar";

import axios from "axios";
import { API_SERVICE } from "src/config/uri";

const MostActive = () => {
  const [userData, setUserData] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("All Teams");
  const [loading, setLoading] = useState(true);
  const [totalHours, setTotalHours] = useState(0);
  const [leaderboardData, setleaderboardData] = useState([]);

  const bgColor = ["#ff4040", "#1e90ff", "#03c04a", "orange", "#f699cd"];
  const font = ["80px", "70px", "60px", "55px", "50px"];

  useEffect(() => {
    const data = JSON.parse(window.sessionStorage.getItem("userData"));
    setUserData(data);
  }, []);

  useEffect(async () => {
    if (userData !== null) {
      const { data } = await axios.get(`${API_SERVICE}/api/getTeams/${userData.organization}`);
      setTeamList(data);
    }
  }, [userData]);

  useEffect(async () => {
    if (userData !== null) {
      setLoading(true);
      await axios
        .get(`${API_SERVICE}/api/leaderboard/activeHours/${userData.organization}/${selectedTeam}`)
        .then((res) => {
          console.log(res.data);
          const total = res.data.totalHours[0].total;
          const data = res.data.dataArr;

          setTotalHours(total);
          setleaderboardData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [userData, selectedTeam]);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 5,
        px: 5,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <FormControl variant="filled" sx={{ minWidth: 250, mr: 3, alignSelf: "flex-end" }}>
          <InputLabel id="demo-simple-select-filled-label">Select Team</InputLabel>
          <Select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            label="Select Team"
          >
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
      </Box>

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
        <Box sx={{ mt: 10 }}>
          {leaderboardData.map((item, index) => (
            <PersonInfoBar
              bgColor={bgColor[index]}
              pos={`${index + 1}`}
              posFont={font[index]}
              name={item.fullName}
              sum={item.sum}
              total={totalHours}
              type="Active"
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

MostActive.getLayout = (page) => <LeaderboardLayout>{page}</LeaderboardLayout>;

export default MostActive;
