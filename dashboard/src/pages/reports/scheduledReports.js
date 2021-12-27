import React from "react";
import { useRouter } from "next/router";
import { Box, Button, Stack } from "@mui/material";
import ReportLayout from "src/components/layouts/ReportLayout";
import ScheduledReportTable from "src/components/reports/ScheduledReportTable";

const ScheduledReports = () => {
  const router = useRouter();

  return (
    <Box>
      <Stack direction="row" justifyContent="flex-end">
        <Button
          variant="contained"
          sx={{ px: 5, py: 1.5 }}
          onClick={() => router.push("/reports/createreport")}
        >
          Create New Report
        </Button>
      </Stack>
      <Box sx={{ mt: 4 }}>
        <ScheduledReportTable />
      </Box>
    </Box>
  );
};

ScheduledReports.getLayout = (page) => <ReportLayout>{page}</ReportLayout>;

export default ScheduledReports;
