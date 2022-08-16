import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import moment from "moment";
import axios from "axios";
import { API_SERVICE } from "src/config/uri";

import CardComponent from "src/components/user/CardComponent";
import ActivityCarousel from "src/components/user/ActivityCarousel";

const ActivitiesReport = (props) => {
  const { report } = props;

  const [reportData, setReportData] = useState([]);
  const [screenshots, setScreenshots] = useState({});

  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + "h " : "";
    var mDisplay = m > 0 ? m + "m " : "";
    var sDisplay = s > 0 ? s + "s " : "";
    return hDisplay + mDisplay + sDisplay;
  }

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
      .post(`${API_SERVICE}/api/report/activity`, body, config)
      .then((res) => {
        const arr = [];

        Object.keys(res.data).map((key) => {
          let active = 0;
          const obj = {};

          res.data[key].map((x) => {
            obj["fullName"] = x.fullName;
            obj["id"] = x.id;
            let strTime = secondsToHms(x.sum);
            active += x.sum;

            if (x.description === "Unproductive") {
              obj["unproductive"] = strTime;
            } else if (x.description === "Productive") {
              obj["productive"] = strTime;
            } else {
              obj["idle"] = strTime;
            }
          });

          if (active !== 0) {
            active = secondsToHms(active);
            obj["active"] = active;
          }

          arr.push(obj);
        });

        setReportData(arr);
      })
      .catch((error) => console.log(error));

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
    <>
      {reportData.length !== 0 &&
        reportData.map((data, index) => (
          <Box key={++index} sx={{ my: 5 }}>
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
              {`${data.fullName} ${report.team}`}
            </Typography>
            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
              <CardComponent
                title="Active"
                body={data.active ? data.active : "0 sec"}
                headerColor="gray"
                bgColor="#d2d2d2"
              />
              <CardComponent
                title="Productive"
                body={data.productive ? data.productive : "0 sec"}
                headerColor="green"
                bgColor="#90ee90"
              />
              <CardComponent
                title="Idle"
                body={data.idle ? data.idle : "0 sec"}
                headerColor="orange"
                bgColor="yellow"
              />
              <CardComponent
                title="Unproductive"
                body={data.unproductive ? data.unproductive : "0 sec"}
                headerColor="#dc143c"
                bgColor="#ff4040"
              />
            </Stack>
            <Box>
              {Object.entries(screenshots).length !== 0 && (
                <ActivityCarousel screenshots={screenshots[data.id]} />
              )}
            </Box>
          </Box>
        ))}
    </>
  );
};

export default ActivitiesReport;
