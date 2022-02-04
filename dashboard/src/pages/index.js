import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  IconButton,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import TeamLayout from "../components/dashboard/TeamLayout";
import { Close } from "@mui/icons-material";
import DashboardLayout from "src/components/layouts/DashboardLayout";
import axios from "axios";
import { API_SERVICE } from "src/config/uri";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All Teams");

  const router = useRouter();

  useEffect(async () => {
    if (userData !== null) {
      const { data } = await axios.get(`${API_SERVICE}/api/getTeams/${userData.organization}`);
      setTeamList(data);
    }
  }, [userData]);

  useEffect(async () => {
    const data = JSON.parse(window.sessionStorage.getItem("userData"));
    setUserData(data);

    if (data !== null && data !== undefined) {
      try {
        const users = await axios.get(`${API_SERVICE}/api/teamUsersByGroup/${data.organization}`);

        if (users.data.length === 0) {
          setLoading(false);
          setOpen(true);
        } else {
          setLoading(false);
          setUserList(users.data);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const applyFilter = async (e) => {
    setFilter(e.target.value);
    setLoading(true);
    console.log(e.target.value);
    if (e.target.value === "All Teams") {
      try {
        const { data } = await axios.get(
          `${API_SERVICE}/api/teamUsersByGroup/${userData.organization}`
        );
        setUserList(data);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
      }
      return;
    }

    try {
      const { data } = await axios.get(
        `${API_SERVICE}/api/teamUsers/${userData.organization}/${e.target.value}`
      );
      setUserList([data]);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 5,
          px: 5,
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <FormControl variant="outlined" sx={{ minWidth: 250, mr: 3, alignSelf: "flex-end" }}>
              <InputLabel>Filter</InputLabel>
              <Select value={filter} onChange={(e) => applyFilter(e)} label="Filter">
                <MenuItem value="All Teams">All Teams</MenuItem>
                {teamList.map((x) => (
                  <MenuItem value={x.team_name}>{x.team_name}</MenuItem>
                ))}
              </Select>
            </FormControl>
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

            {userList.length !== 0 && !loading && (
              <Box>
                {userList.map((x, index) => (
                  <TeamLayout key={index++} data={x} />
                ))}
              </Box>
            )}
          </Box>

          <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
            <Card sx={{ width: 550 }}>
              <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton onClick={handleClose}>
                  <Close />
                </IconButton>
              </CardActions>
              <CardContent sx={{ py: 1 }}>
                <Typography textAlign="center" component="h1" variant="h6">
                  Add users to start monitoring
                </Typography>
                <Stack direction="row" justifyContent="space-around" sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    sx={{ mt: 2, mb: 2, py: 1, px: 3, fontSize: 16 }}
                    onClick={handleClose}
                  >
                    Add Later
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ mt: 2, mb: 2, py: 1, px: 3, fontSize: 16 }}
                    onClick={() => router.push("/dashboard/addusers")}
                  >
                    Add User
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Backdrop>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
