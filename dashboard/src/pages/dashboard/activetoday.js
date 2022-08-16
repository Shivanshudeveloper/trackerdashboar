import React, { useState, useEffect, useContext } from "react";
import Head from "next/head";
import { Box, Container } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import ActiveUserLayout from "src/components/dashboard/ActiveUserLayout";
import DashboardLayout from "src/components/layouts/DashboardLayout";
import axios from "axios";
import { API_SERVICE } from "src/config/uri";
import { AuthContext } from "src/contextx/authContext";

const ActiveToday = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);

  useEffect(async () => {
    if (user !== null) {
      try {
        const users = await axios.get(`${API_SERVICE}/api/activeUser/active/${user.organization}`);

        const result = users.data.reduce((r, a) => {
          r[a.team] = r[a.team] || [];
          r[a.team].push(a);
          return r;
        }, Object.create(null));

        setUserList(result);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Dashboard / Active Today</title>
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
                {Object.keys(userList).map((x, index) => (
                  <ActiveUserLayout key={++index} data={userList[x]} title={x} />
                ))}
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

ActiveToday.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default ActiveToday;
