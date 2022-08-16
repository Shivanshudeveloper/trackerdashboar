import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Grid, Stack, Avatar, Typography, Button, CircularProgress } from "@mui/material";
import MainLayout from "src/components/layouts/MainLayout";
import CardComponent from "src/components/user/CardComponent";
import ActivityCarousel from "src/components/user/ActivityCarousel";
import axios from "axios";
import { API_SERVICE } from "src/config/uri";
import moment from "moment";
import HSBar from "react-horizontal-stacked-bar-chart";

const User = () => {
  const router = useRouter();
  const { id } = router.query;

  const [productiveHour, setProductiveHour] = useState("0s");
  const [unProductiveHour, setUnProductiveHour] = useState("0s");
  const [idleHour, setIdleHour] = useState("0s");
  const [activeHour, setActiveHour] = useState("0s");
  const [userDetail, setUserDetail] = useState({});
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [screenshots, setScreenshots] = useState([]);

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
    if (id !== undefined) {
      await axios
        .get(`${API_SERVICE}/api/activeUser/activeStatus/${id}`)
        .then((response) => {
          const { data } = response;

          const dataTime = new Date(data.time);
          const checkTime = new Date(Date.now() - 1000 * (60 * 5));

          if (checkTime > dataTime) {
            setIsActive(false);
          } else {
            setIsActive(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  useEffect(async () => {
    if (id !== undefined) {
      setLoading(true);
      await axios
        .get(`${API_SERVICE}/api/teamUser/productivity/${id}`)
        .then((res) => {
          let active = 0;

          res.data.map((x) => {
            let strTime = secondsToHms(x.value);
            active += x.value;

            if (x.description === "Unproductive") {
              setUnProductiveHour(strTime);
            } else if (x.description === "Productive") {
              setProductiveHour(strTime);
            } else {
              setIdleHour(strTime);
            }
          });

          if (active !== 0) {
            active = secondsToHms(active);
            setActiveHour(active);
          }

          setTimelineData(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });

      await axios
        .get(`${API_SERVICE}/api/teamUser/${id}`)
        .then((res) => {
          setUserDetail(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });

      await axios
        .get(`${API_SERVICE}/api/teamUser/screenshots/${id}`)
        .then((res) => {
          setScreenshots(res.data);
        })
        .catch((error) => {
          console.log(error);
        });

      setLoading(false);
    }
  }, [id]);

  return (
    <Box sx={{ p: 5 }}>
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
        <>
          <Grid container>
            <Grid item sm={12} md={5} sx={{ display: "flex" }}>
              <Box
                sx={{
                  alignSelf: "center",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    p: 0.5,
                    border: `5px solid ${isActive ? "green" : "red"}`,
                    borderRadius: "50%",
                  }}
                >
                  <Avatar
                    sx={{ width: 120, height: 120, backgroundColor: "orange" }}
                    src={userDetail.profilePicture}
                  />
                </Box>
              </Box>
              <Stack sx={{ ml: 4 }} direction="column" justifyContent="center">
                <Typography sx={{ fontWeight: 500 }} component="h3" variant="h4">
                  {`${userDetail.fullName} - ${userDetail.team}`}
                </Typography>
                {/* <Typography component="h3" variant="h5">
                  Start time - 9AM
                </Typography> */}
              </Stack>
            </Grid>
            <Grid item sm={12} md={7}>
              <Stack direction="row" justifyContent="flex-end" alignItems="center">
                <Typography component="p" variant="h6">
                  {moment(userDetail.createdAt).format("D MMMM YYYY")}
                </Typography>
                <Button variant="contained" sx={{ py: 1.2, px: 3.6, ml: 3 }}>
                  Export
                </Button>
              </Stack>
              <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <CardComponent
                  title="Active"
                  body={activeHour ? activeHour : "0s"}
                  headerColor="gray"
                  bgColor="#d2d2d2"
                />
                <CardComponent
                  title="Productive"
                  body={productiveHour ? productiveHour : "0s"}
                  headerColor="green"
                  bgColor="#90ee90"
                />
                <CardComponent
                  title="Idle"
                  body={idleHour ? idleHour : "0s"}
                  headerColor="orange"
                  bgColor="yellow"
                />
                <CardComponent
                  title="Unproductive"
                  body={unProductiveHour ? unProductiveHour : "0s"}
                  headerColor="#dc143c"
                  bgColor="#ff4040"
                />
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ my: 4, mt: 6 }}>
            <Typography component="h1" variant="h4" sx={{ fontWeight: 500 }}>
              Productivity TimeLine
            </Typography>
            <Box sx={{ my: 3 }}>
              <HSBar height={50} data={timelineData} />
            </Box>
          </Box>
          <Box sx={{ mt: 6 }}>
            <Typography component="h1" variant="h4" sx={{ fontWeight: 500 }}>
              Activity TimeLine
            </Typography>
            <ActivityCarousel screenshots={screenshots} />
          </Box>
        </>
      )}
    </Box>
  );
};

User.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default User;
