import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TimesheetLayout from "../../components/layouts/TimesheetLayout";
import ProductiveTeamsTable from "src/components/timesheet/ProductiveTeamsTable";
import axios from "axios";
import { API_SERVICE } from "src/config/uri";

const ProductiveHours = () => {
  const [userData, setUserData] = useState(null);
  const [productiveData, setProductiveData] = useState({});
  const [loading, setLoading] = useState(true);
  const [teamList, setTeamList] = useState([]);
  const [filter, setFilter] = useState("All Teams");
  const [dates, setDates] = useState([]);

  console.log(productiveData);

  const fetchTeamsData = async (team) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_SERVICE}/api/productiveHours/${userData.organization}/${team}`
      );

      const result = data.reduce((r, a) => {
        r[a.team] = r[a.team] || [];
        r[a.team].push(a);
        return r;
      }, Object.create(null));

      let currDate = new Date();
      const dateMove = new Date(currDate);
      const dateArr = [];

      let i = 1;

      while (i <= 7) {
        let temp = dateMove.toISOString().slice(0, 10);
        dateArr.push(new Date(temp));
        dateMove.setDate(dateMove.getDate() - 1);
        i++;
      }

      setDates(dateArr);
      setLoading(false);
      setProductiveData(result);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

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
          <Select labelId="demo-simple-select-filled-label" id="demo-simple-select-filled">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled" sx={{ minWidth: 250, mr: 3, alignSelf: "flex-end" }}>
          <InputLabel id="demo-simple-select-filled-label">Week</InputLabel>
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
      <Box sx={{ mt: 5 }}>
        {Object.keys(productiveData).length !== 0 && !loading && (
          <>
            {Object.keys(productiveData).map((key) => (
              <ProductiveTeamsTable key={key} data={productiveData[key]} dates={dates} />
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};

ProductiveHours.getLayout = (page) => <TimesheetLayout>{page}</TimesheetLayout>;

export default ProductiveHours;
