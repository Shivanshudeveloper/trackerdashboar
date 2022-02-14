import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, CircularProgress } from "@mui/material";
import MainLayout from "src/components/layouts/MainLayout";
import axios from "axios";

import Activities from "src/components/reports/activities";
import Productivity from "src/components/reports/productivity";
import AppUsage from "src/components/reports/appusage";
import Screenshots from "src/components/reports/screenshots";
import Timesheet from "src/components/reports/timesheet";
import { API_SERVICE } from "src/config/uri";

const Preview = () => {
  const [userData, setUserData] = useState(null);
  const [report, setReport] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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
          setCategories(res.data.reportCategory);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  }, [id, userData]);

  return (
    <>
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: 500,
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}
      {!loading && (
        <Box>
          {categories.includes("Activities") && (
            <Box sx={{ mb: "100px" }}>
              <Activities report={report} />
            </Box>
          )}
          {categories.includes("Productivity") && (
            <Box sx={{ mb: "100px" }}>
              <Productivity report={report} />
            </Box>
          )}
          {categories.includes("AppUsage") && (
            <Box sx={{ mb: "100px" }}>
              <AppUsage report={report} />
            </Box>
          )}
          {categories.includes("Timesheet") && (
            <Box sx={{ mb: "100px" }}>
              <Timesheet report={report} />
            </Box>
          )}
          {categories.includes("Screenshots") && (
            <Box sx={{ mb: "100px" }}>
              <Screenshots report={report} />
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

Preview.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default Preview;
