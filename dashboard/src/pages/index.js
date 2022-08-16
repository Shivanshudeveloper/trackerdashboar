import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import TeamLayout from "../components/dashboard/TeamLayout";
import DashboardLayout from "src/components/layouts/DashboardLayout";
import { TeamAndUserContext } from "src/contextx/teamAndUserContext";

const Dashboard = () => {
  const [teamList, setTeamList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All Teams");

  const { teams, users } = useContext(TeamAndUserContext);

  const router = useRouter();

  useEffect(() => {
    setTeamList(teams);
  }, [teams]);

  useEffect(() => {
    if (users === null) {
      setLoading(false);
    } else {
      setLoading(false);
      setUserList(users);
    }
  }, [users]);

  const applyFilter = async (e) => {
    setFilter(e.target.value);
    setLoading(true);

    console.log(users);

    if (e.target.value === "All Teams") {
      setUserList(users);
      setLoading(false);
      return;
    }

    const arr = users;
    const res = arr.filter((x) => x[0].team === e.target.value);
    setUserList(res);
    setLoading(false);
  };

  if (users === null) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <Card sx={{ width: 550 }}>
          <CardContent sx={{ py: 1 }}>
            <Typography textAlign="center" component="h1" variant="h6">
              Add users to start monitoring
            </Typography>
            <Stack direction="row" justifyContent="space-around" sx={{ mt: 3 }}>
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
      </Box>
    );
  }

  return (
    <React.Fragment>
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
                  <MenuItem key={x.id} value={x.team_name}>
                    {x.team_name}
                  </MenuItem>
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
                {Object.keys(userList).map((x) => (
                  <TeamLayout key={x} data={userList[x]} teamName={x} />
                ))}
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </React.Fragment>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
