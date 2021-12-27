import React from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

import MainLayout from "src/components/layouts/MainLayout";
import AppUsageChart from "../../components/reports/AppUsageChart";

const data = ["7:00", "5:00", "4:00", "3:00", "1:00", "0.30"];

const AppUsage = () => {
  return (
    <Box sx={{ my: 5 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography component="h1" variant="h5" sx={{ fontWeight: 500 }}>
          App Usage Report - [Report Date Range]
        </Typography>
        <Button variant="contained" sx={{ px: 5, py: 1.2, fontSize: 16 }}>
          Export Report
        </Button>
      </Stack>
      <Typography component="h1" variant="h6" sx={{ fontWeight: 500 }}>
        [Team Name]
      </Typography>
      <Box sx={{ mt: 6 }}>
        <AppUsageChart />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Grid container>
          <Grid item md={2}>
            <Typography component="h1" variant="h6" sx={{ fontWeight: 500 }}>
              Average Number of hours per day per employee:
            </Typography>
          </Grid>
          <Grid
            item
            md={10}
            sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}
          >
            {data.map((x) => (
              <div style={{ backgroundColor: "#d2d2d2", padding: "10px 20px", width: "100px" }}>
                <Typography component="p" variant="h6" sx={{ fontWeight: 500 }} textAlign="center">
                  {x}
                </Typography>
              </div>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

AppUsage.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default AppUsage;
