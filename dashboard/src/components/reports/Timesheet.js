import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import TimeSheetReportTable from "src/components/reports/TimeSheetReportTable";

const Timesheet = () => {
  return (
    <Box sx={{ my: 5 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography component="h1" variant="h5" sx={{ fontWeight: 500 }}>
          Active Hours - [Report Date Range]
        </Typography>
        <Button variant="contained" sx={{ px: 5, py: 1.2, fontSize: 16 }}>
          Export Report
        </Button>
      </Stack>
      <Typography component="h1" variant="h6" sx={{ fontWeight: 500 }}>
        [Team Name]
      </Typography>
      <TimeSheetReportTable />
    </Box>
  );
};

export default Timesheet;
