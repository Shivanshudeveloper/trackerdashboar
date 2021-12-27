import React from "react";
import { Avatar, Box, Button, Grid, Stack, Typography } from "@mui/material";

import MainLayout from "src/components/layouts/MainLayout";

function createData(label, color) {
  return { label, color };
}

const rows = [
  createData("Productivity", "green"),
  createData("Idle", "orange"),
  createData("Neutral", "blue"),
  createData("Unproductive", "red"),
];

const Productivity = () => {
  return (
    <Box sx={{ my: 5 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography component="h1" variant="h5" sx={{ fontWeight: 500 }}>
          Monthly Productivity Report - [Report Date Range]
        </Typography>
        <Button variant="contained" sx={{ px: 5, py: 1.2, fontSize: 16 }}>
          Export Report
        </Button>
      </Stack>
      <Typography component="h1" variant="h6" sx={{ fontWeight: 500 }}>
        [Team Name]
      </Typography>
      <Stack direction="row" sx={{ mt: 5 }}>
        {rows.map((x) => (
          <Stack direction="row" alignItems="center" sx={{ mr: 8 }}>
            <div
              style={{ width: 30, height: 30, backgroundColor: `${x.color}`, marginRight: "15px" }}
            ></div>
            <Typography component="h1" variant="h6" sx={{ fontWeight: 500 }}>
              {x.label}
            </Typography>
          </Stack>
        ))}
      </Stack>
      <Grid container sx={{ mt: 10 }}>
        <Grid item md={3} sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src="" />
          <Typography component="h1" variant="h6" sx={{ fontWeight: 500, ml: 3 }}>
            Raghupati S.
          </Typography>
        </Grid>
        <Grid item md={9}></Grid>

        <Grid item md={3} sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          <Avatar src="" />
          <Typography component="h1" variant="h6" sx={{ fontWeight: 500, ml: 3 }}>
            [Name]
          </Typography>
        </Grid>
        <Grid item md={9}></Grid>
      </Grid>
    </Box>
  );
};

Productivity.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Productivity;
