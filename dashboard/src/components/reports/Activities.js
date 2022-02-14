import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import CardComponent from "src/components/user/CardComponent";
import ActivityCarousel from "src/components/user/ActivityCarousel";

const Activities = () => {
  return (
    <Box sx={{ my: 5 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography component="h1" variant="h5" sx={{ fontWeight: 500 }}>
          Activities - [Report Date Range]
        </Typography>
        <Button variant="contained" sx={{ px: 5, py: 1.2, fontSize: 16 }}>
          Export Report
        </Button>
      </Stack>
      <Typography component="h1" variant="h6" sx={{ fontWeight: 500 }}>
        [Team Name]
      </Typography>
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
        <CardComponent title="Active" body="6h 56m" headerColor="gray" bgColor="#d2d2d2" />
        <CardComponent title="Productive" body="5h 30m" headerColor="green" bgColor="#90ee90" />
        <CardComponent title="Idle" body="1h 56m" headerColor="orange" bgColor="yellow" />
        <CardComponent
          title="Unproductive"
          body="00h 06m"
          headerColor="#dc143c"
          bgColor="#ff4040"
        />
      </Stack>
      <Box>
        <Typography component="h1" variant="h5" sx={{ fontWeight: 500 }}>
          [Date]
        </Typography>
        <ActivityCarousel />
      </Box>
      <Box>
        <Typography component="h1" variant="h5" sx={{ fontWeight: 500 }}>
          [Date]
        </Typography>
        <ActivityCarousel />
      </Box>
    </Box>
  );
};

export default Activities;
