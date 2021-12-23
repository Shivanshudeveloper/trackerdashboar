import React from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import LeaderboardLayout from "../../components/layouts/LeaderboardLayout";
import PersonInfoBar from "src/components/leaderboard/PersonInfoBar";

const MostActive = () => {
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

      <Box sx={{ mt: 10 }}>
        <PersonInfoBar bgColor="#ff4040" pos="1" posFont="80px" />
        <PersonInfoBar bgColor="#1e90ff" pos="2" posFont="70px" />
        <PersonInfoBar bgColor="#03c04a" pos="3" posFont="60px" />
        <PersonInfoBar bgColor="orange" pos="4" posFont="55px" />
        <PersonInfoBar bgColor="#f699cd" pos="5" posFont="50px" />
      </Box>
    </Box>
  );
};

MostActive.getLayout = (page) => <LeaderboardLayout>{page}</LeaderboardLayout>;

export default MostActive;
