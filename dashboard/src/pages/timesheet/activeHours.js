import React from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TimesheetLayout from "../../components/layouts/TimesheetLayout";
import ActiveTeamsTable from "src/components/timesheet/ActiveTeamsTable";

const ActiveHours = () => {
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
      <Box sx={{ mt: 5 }}>
        <ActiveTeamsTable teamName="IT Team" />
        <ActiveTeamsTable teamName="Design Team" />
      </Box>
    </Box>
  );
};

ActiveHours.getLayout = (page) => <TimesheetLayout>{page}</TimesheetLayout>;

export default ActiveHours;
