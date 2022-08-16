import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import moment from "moment";
import axios from "axios";
import { API_SERVICE } from "src/config/uri";

import ScreenshotLayout from "src/components/reports/ScreenshotLayout";

const ScreenshotsReport = (props) => {
  const { report } = props;
  const [screenshots, setScreenshots] = useState({});
  const [reportUsers, setReportUsers] = useState({});

  useEffect(async () => {
    const data = {
      id: report.id,
      users: report.users,
      team: report.team,
      startDate: report.reportPeriod.startDate,
      endDate: report.reportPeriod.endDate,
      organization: report.organization,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = { data };

    await axios
      .post(`${API_SERVICE}/api/report/activityScreenshots`, body, config)
      .then((res) => {
        setScreenshots(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [report]);

  return (
    <Box sx={{ my: 5 }}>
      <Stack direction="row" justifyContent="flex-start">
        <Typography component="h1" variant="h5" sx={{ fontWeight: 500 }}>
          {`${report.reportTitle} : ${moment(report.reportPeriod.startDate).format(
            "MMMM Do YYYY"
          )} - ${moment(report.reportPeriod.endDate).format("MMMM Do YYYY")}`}
        </Typography>
        {/* <Button variant="contained" sx={{ px: 5, py: 1.2, fontSize: 16 }}>
          Export Report
        </Button> */}
      </Stack>
      <Typography component="h1" variant="h6" sx={{ fontWeight: 500 }}>
        {`${report.team}`}
      </Typography>
      <Box sx={{ mt: 3 }}>
        {Object.keys(screenshots).map((key) => (
          <ScreenshotLayout
            data={screenshots[key]}
            username={report.users.find((x) => x.id === key).fullName}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ScreenshotsReport;
