import React from "react";
import { useRouter } from "next/router";
import { Avatar, Box, Card, Grid, Stack, Typography } from "@mui/material";

const ActiveUserLayout = (props) => {
  const { data, title } = props;
  const router = useRouter();

  console.log(data);
  console.log(title);

  return (
    <>
      {data.length !== 0 && (
        <Box sx={{ mt: 6 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography component="h1" variant="h5">
              {title}
            </Typography>
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
                    boxShadow: 10,
                    justifyContent: "space-between",
                    flexDirection: "column",
                    height: 160,
                    width: "100%",
                  }}
                  onClick={() => {
                    x.role === "Team Member"
                      ? router.push(`/user/${x.id}`)
                      : console.log("clicked");
                  }}
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
                    <Avatar src={x.profilePicture} sx={{ bgcolor: "pink" }} />
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

export default ActiveUserLayout;
