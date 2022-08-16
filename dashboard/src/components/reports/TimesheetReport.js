import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import moment from "moment";
import { API_SERVICE } from "src/config/uri";
import axios from "axios";

import TimeSheetReportTable from "src/components/reports/TimeSheetReportTable";

const TimesheetReport = (props) => {
  const { report } = props;
  const [tableData, setTableData] = useState([]);
  const [dateRange, setDateRange] = useState([]);

  useEffect(async () => {
    if (report !== undefined && report !== null) {
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
        .post(`${API_SERVICE}/api/report/timesheet`, body, config)
        .then((res) => {
          const { timesheetData } = res.data;
          let { dates } = res.data;

          const numberOfDay = Math.ceil(
            Math.abs(new Date(data.endDate) - new Date(data.startDate)) / (1000 * 60 * 60 * 24)
          );

          if (numberOfDay >= 4) {
            dates = dates.slice(0, 4);
          } else {
            dates = dates.slice(0, numberOfDay);
          }

          const dataArr = [];
          data.users.forEach((user) => {
            const d = [];
            timesheetData.forEach((item) => {
              if (user.id === item.userid) {
                item["fullName"] = user.fullName;
                item["profilePicture"] = user.profilePicture;
                d.push(item);
              }
            });
            dataArr.push(d);
          });

          setDateRange(dates);
          setTableData(dataArr);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
      <TimeSheetReportTable data={tableData} dates={dateRange} />
    </Box>
  );
};

export default TimesheetReport;
