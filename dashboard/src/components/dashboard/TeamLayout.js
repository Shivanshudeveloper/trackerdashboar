import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Avatar, Box, Button, Card, Grid, Stack, Typography } from "@mui/material";

const TeamLayout = (props) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(window.sessionStorage.getItem("userData"));
    setUserData(user);
  }, []);

  const { data } = props;
  const router = useRouter();

  return (
    <>
      {data.length !== 0 && (
        <Box sx={{ mt: 6 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography component="h1" variant="h5">
              {`${data[0].team} (${data.length})`}
            </Typography>

            {userData !== null && (
              <Box>
                {userData.role === "Team Admin" && userData.team === data[0].team && (
                  <Button
                    variant="contained"
                    sx={{ py: 1 }}
                    onClick={() => router.push("/dashboard/addusers")}
                  >
                    Add User
                  </Button>
                )}
                {userData.role === "Admin" && (
                  <Button
                    variant="contained"
                    sx={{ py: 1 }}
                    onClick={() => router.push("/dashboard/addusers")}
                  >
                    Add User
                  </Button>
                )}
              </Box>
            )}
          </Stack>

          <Grid container sx={{ my: 2 }}>
            {data.map((x) => (
              <Grid
                item
                sm={6}
                md={3}
                lg={2.4}
                sx={{ display: "flex", justifyContent: "center", p: 1 }}
              >
                <Card
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    height: 160,
                    width: "100%",
                  }}
                  onClick={() => router.push("user")}
                >
                  <Stack direction="row" alignItems="center">
                    {x.role === "Team Admin" ? (
                      <>
                        <Avatar sx={{ bgcolor: "orange" }}>TA</Avatar>
                        <Typography sx={{ ml: 3 }}>{x.role}</Typography>
                      </>
                    ) : (
                      <>
                        <Avatar sx={{ bgcolor: "orange" }}>TM</Avatar>
                        <Typography sx={{ ml: 3 }}>{x.role}</Typography>
                      </>
                    )}
                  </Stack>
                  <Stack sx={{ mt: 2 }} direction="row" alignItems="center">
                    <Avatar sx={{ bgcolor: "pink" }} />
                    <Typography sx={{ ml: 3 }}>{x.fullName}</Typography>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default TeamLayout;
