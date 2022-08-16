import React from "react";
import { Avatar, Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import UserTable from "./user/UserTable";

const AddUserAndTeamLayout = (props) => {
  const { data } = props;

  return (
    <Box sx={{ mt: 6 }}>
      {data.length !== 0 && (
        <React.Fragment>
          <Stack direction="row" justifyContent="space-between">
            <Typography component="h1" variant="h5">
              {`${data[0].team} (${data.length})`}
            </Typography>
          </Stack>

          <Box sx={{ my: 2 }}>
            <UserTable data={data} />
          </Box>

          {/* <Grid container sx={{ my: 2 }}>
            {data.map((x, index) => (
              <Grid
                item
                key={index++}
                sm={6}
                md={3}
                lg={2.4}
                sx={{ display: "flex", justifyContent: "center", p: 1 }}
              >
                <Card
                  sx={{ width: "100%", m: 1, cursor: "pointer", boxShadow: 10 }}
                  onClick={() => router.push(`/settings/users/edituser/${x.id}`)}
                >
                  <CardContent>
                    <Stack direction="row" alignItems="center">
                      <Avatar src={x.profilePicture} sx={{ bgcolor: "orange" }} />
                      <Typography sx={{ ml: 3 }}>{x.fullName}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid> */}
        </React.Fragment>
      )}
    </Box>
  );
};

export default AddUserAndTeamLayout;
