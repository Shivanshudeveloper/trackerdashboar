import React from "react";
import { Avatar, Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";

const AddUserAndTeamLayout = (props) => {
  const { data } = props;

  const keyList = Object.keys(data);
  const teamName = keyList[0];

  const valueList = Object.values(data)[0];

  return (
    <Box sx={{ mt: 6 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography component="h1" variant="h5">
          {`${teamName}`}
        </Typography>
      </Stack>
      <Grid container sx={{ my: 2 }}>
        {valueList.map((x) => (
          <Grid item sm={4} md={3} lg={2} sx={{ display: "flex", justifyContent: "center" }}>
            <Card sx={{ width: 250, m: 1, cursor: "pointer" }}>
              <CardContent>
                <Stack direction="row" alignItems="center">
                  <Avatar src="" sx={{ bgcolor: "orange" }} />
                  <Typography sx={{ ml: 3 }}>{x.name}</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AddUserAndTeamLayout;
