import React from "react";
import { Box, Card, CardHeader, Grid, CardMedia, Typography } from "@mui/material";
import moment from "moment";

const ScreenshotLayout = (props) => {
  const { data, username } = props;

  console.log(data);

  return (
    <Box sx={{ mt: 6 }}>
      <Typography component="h1" variant="h5">
        {username}
      </Typography>

      <Grid container sx={{ my: 2 }}>
        {data.map((item) => (
          <Grid item sm={4} md={4} lg={3} sx={{ display: "flex", justifyContent: "center" }}>
            <Card sx={{ mx: 1.25, boxShadow: 10, cursor: "pointer" }}>
              <CardHeader sx={{ p: 1.5 }} title={item.owner} />
              <CardMedia component="img" height="250" image={item.imgName[0]} />
              <Typography textAlign="right" sx={{ m: 1.5 }} variant="h6" component="p">
                {moment(item.time).format("MMMM Do YYYY")}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ScreenshotLayout;
