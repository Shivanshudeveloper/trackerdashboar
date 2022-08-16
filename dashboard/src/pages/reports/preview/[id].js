import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Button } from "@mui/material";
import MainLayout from "src/components/layouts/MainLayout";
import axios from "axios";

import ActivitiesReport from "src/components/reports/ActivitiesReport";
import ProductivityReport from "src/components/reports/ProductivityReport";
import AppUsageReport from "src/components/reports/AppUsageReport";
import ScreenshotsReport from "src/components/reports/ScreenshotsReport";
import TimesheetReport from "src/components/reports/TimesheetReport";
import { API_SERVICE } from "src/config/uri";

const Preview = () => {
  const [userData, setUserData] = useState(null);
  const [report, setReport] = useState({});
  const [categories, setCategories] = useState([]);

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    const data = JSON.parse(window.sessionStorage.getItem("userData"));
    setUserData(data);
  }, []);

  useEffect(async () => {
    if (id !== null && id !== undefined && userData !== null) {
      await axios
        .get(`${API_SERVICE}/api/report/${id}`)
        .then((res) => {
          setReport(res.data);
          console.log(res.data);
          setCategories(res.data.reportCategory);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id, userData]);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", py: 4 }}>
        <Button color="primary" variant="contained" sx={{ py: 1.2, fontSize: 16, px: 5 }}>
          Export Report
        </Button>
      </Box>
      {categories.includes("Activities") && (
        <Box sx={{ mb: "100px" }}>
          <ActivitiesReport report={report} />
        </Box>
      )}
      {categories.includes("Productivity") && (
        <Box sx={{ mb: "100px" }}>
          <ProductivityReport report={report} />
        </Box>
      )}
      {categories.includes("AppUsage") && (
        <Box sx={{ mb: "100px" }}>
          <AppUsageReport report={report} />
        </Box>
      )}
      {categories.includes("Timesheet") && (
        <Box sx={{ mb: "100px" }}>
          <TimesheetReport report={report} />
        </Box>
      )}
      {categories.includes("Screenshots") && (
        <Box sx={{ mb: "100px" }}>
          <ScreenshotsReport report={report} />
        </Box>
      )}
    </Box>
  );
};

Preview.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Preview;
