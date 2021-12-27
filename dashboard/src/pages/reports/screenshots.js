import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import MainLayout from "src/components/layouts/MainLayout";
import ScreenshotLayout from "src/components/reports/ScreenshotLayout";

const fakeTeamData = [
  {
    "[Employee Name]": [
      {
        name: "[App Name]",
        timestamp: "[TimeStamp]",
      },
      {
        name: "[App Name]",
        timestamp: "[TimeStamp]",
      },
      {
        name: "[App Name]",
        timestamp: "[TimeStamp]",
      },
      {
        name: "[App Name]",
        timestamp: "[TimeStamp]",
      },
      {
        name: "[App Name]",
        timestamp: "[TimeStamp]",
      },
      {
        name: "[App Name]",
        timestamp: "[TimeStamp]",
      },
      {
        name: "[App Name]",
        timestamp: "[TimeStamp]",
      },
      {
        name: "[App Name]",
        timestamp: "[TimeStamp]",
      },
      {
        name: "[App Name]",
        timestamp: "[TimeStamp]",
      },
    ],
  },
  {
    "[Employee Name]": [
      {
        name: "[App Name]",
        timestamp: "[TimeStamp]",
      },
      {
        name: "[App Name]",
        timestamp: "[TimeStamp]",
      },
    ],
  },
];

const Screenshots = () => {
  return (
    <Box sx={{ my: 5 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography component="h1" variant="h5" sx={{ fontWeight: 500 }}>
          Screenshots - [Report Date Range]
        </Typography>
        <Button variant="contained" sx={{ px: 5, py: 1.2, fontSize: 16 }}>
          Export Report
        </Button>
      </Stack>
      <Typography component="h1" variant="h6" sx={{ fontWeight: 500 }}>
        [Team Name]
      </Typography>
      <Box sx={{ mt: 3 }}>
        {fakeTeamData.map((x) => (
          <ScreenshotLayout data={x} />
        ))}
      </Box>
    </Box>
  );
};

Screenshots.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Screenshots;
