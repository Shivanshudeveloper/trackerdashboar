import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Stack, Typography, Paper, CircularProgress } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import moment from "moment";

import axios from "axios";
import { API_SERVICE } from "src/config/uri";

const AppUsageReport = (props) => {
  const { report } = props;
  const [reportData, setReportData] = useState([]);
  const [values, setValues] = useState([]);
  const [labels, setLabels] = useState([]);
  const [days, setDays] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    if (report !== undefined && report !== null) {
      setLoading(true);
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
        .post(`${API_SERVICE}/api/report/appUsage`, body, config)
        .then((res) => {
          setDays(res.data.days);
          const day = res.data.days;

          const label = [];
          const value = [];

          res.data.data.forEach((item) => {
            label.push(item.owner);
          });
          setLabels(label);

          res.data.data.forEach((item) => {
            value.push((item.value / 3600 / day).toFixed(4));
          });
          setValues(value);
        })
        .then(() => setLoading(false))
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  }, [report]);

  useEffect(() => {
    if (labels.length !== 0 && values.length !== 0) {
      const data = {
        labels,
        datasets: [
          {
            label: "App Usage",
            data: values,
            backgroundColor: "rgba(0, 138, 216, 0.7)",
          },
        ],
      };

      setReportData(data);
    }
  }, [labels, values]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

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
        <Box sx={{ mt: 4 }}>
          <Grid container>
            <Grid item md={1}></Grid>
            <Grid item md={11}>
              <Box sx={{ mt: 6 }}>
                <Paper sx={{ p: 2 }}>
                  {reportData.length !== 0 && <Bar options={options} data={reportData} />}
                </Paper>
              </Box>
            </Grid>
            <Grid item md={1.3}>
              <Typography component="h1" variant="h6" sx={{ fontWeight: 500 }}>
                Average Number of hours per day per employee:
              </Typography>
            </Grid>
            <Grid
              item
              md={10.7}
              sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around", mt: 3 }}
            >
              {values.map((x) => (
                <div
                  style={{
                    backgroundColor: "#d2d2d2",
                    padding: "10px 20px",
                    width: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                  }}
                >
                  <Typography
                    component="p"
                    variant="h6"
                    sx={{ fontWeight: 500 }}
                    textAlign="center"
                  >
                    {x}
                  </Typography>
                </div>
              ))}
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default AppUsageReport;
