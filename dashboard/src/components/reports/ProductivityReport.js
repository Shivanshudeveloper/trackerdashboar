import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Grid, Stack, Typography } from "@mui/material";
import moment from "moment";
import axios from "axios";
import HSBar from "react-horizontal-stacked-bar-chart";

import { API_SERVICE } from "src/config/uri";

function createData(label, color) {
  return { label, color };
}

const rows = [
  createData("Productivity", "green"),
  createData("Idle", "orange"),
  createData("Neutral", "blue"),
  createData("Unproductive", "red"),
];

const Productivity = (props) => {
  const { report } = props;

  const [reportData, setReportData] = useState([]);

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
      .post(`${API_SERVICE}/api/report/productivity`, body, config)
      .then((res) => {
        setReportData(res.data);
      })
      .catch((error) => console.log(error));
  }, [report]);

  useEffect(() => {
    if (reportData.length > 0) {
      reportData.forEach((item) => {
        item.data.forEach((x) => {
          const sec = x.value;
          const hour = sec / 3600;
          x.value = hour;
        });
      });
    }
  }, [reportData]);

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
        {reportData.map((item) => (
          <>
            {console.log(item)}
            <Grid item md={2} sx={{ display: "flex", alignItems: "center", my: 1.5 }}>
              <Avatar sx={{ backgroundColor: "purple" }} src={item.profilePicture} />
              <Typography component="h1" variant="h6" sx={{ fontWeight: 500, ml: 3 }}>
                {item.fullName}
              </Typography>
            </Grid>
            <Grid item md={10} sx={{ my: 1.5 }}>
              <HSBar height={50} data={item.data} />
            </Grid>
          </>
        ))}
      </Grid>
    </Box>
  );
};

export default Productivity;
