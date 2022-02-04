import React from "react";
import { useRouter } from "next/router";
import { Avatar, Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";

const AddUserAndTeamLayout = (props) => {
  const { data } = props;
  const router = useRouter();

  return (
    <Box sx={{ mt: 6 }}>
      {data.length !== 0 && (
        <>
          <Stack direction="row" justifyContent="space-between">
            <Typography component="h1" variant="h5">
              {`${data[0].team} (${data.length})`}
            </Typography>
          </Stack>
          <Grid container sx={{ my: 2 }}>
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
                  sx={{ width: "100%", m: 1, cursor: "pointer" }}
                  onClick={() => router.push(`/settings/users/edituser/${x.id}`)}
                >
                  <CardContent>
                    <Stack direction="row" alignItems="center">
                      <Avatar src="" sx={{ bgcolor: "orange" }} />
                      <Typography sx={{ ml: 3 }}>{x.fullName}</Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default AddUserAndTeamLayout;
