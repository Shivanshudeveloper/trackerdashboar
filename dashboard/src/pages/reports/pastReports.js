import React from "react";
import { Box, Stack } from "@mui/material";
import ReportLayout from "src/components/layouts/ReportLayout";
import PastReportTable from "../../components/reports/PastReportTable";

const PastReports = () => {
  return (
    <Box>
      <Stack direction="row" justifyContent="flex-end">
        <Box sx={{ backgroundColor: "#d4d4d4", px: 4, py: 1.3 }}>{`< [ Date ] >`}</Box>
      </Stack>
      <Box sx={{ mt: 4 }}>
        <PastReportTable />
      </Box>
    </Box>
  );
};

PastReports.getLayout = (page) => <ReportLayout>{page}</ReportLayout>;

export default PastReports;
