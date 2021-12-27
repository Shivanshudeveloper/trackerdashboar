import React from "react";
import { useRouter } from "next/router";
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";

const ScreenshotLayout = (props) => {
  const { data } = props;

  const router = useRouter();

  const keyList = Object.keys(data);
  const teamName = keyList[0];

  const valueList = Object.values(data)[0];

  return (
    <Box sx={{ mt: 6 }}>
      <Typography component="h1" variant="h5">
        {`${teamName} (12)`}
      </Typography>

      <Grid container sx={{ my: 2 }}>
        {valueList.map((x) => (
          <Grid item sm={4} md={3} lg={2} sx={{ display: "flex", justifyContent: "center" }}>
            <Card sx={{ width: 250, height: 200, m: 2, cursor: "pointer" }}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Typography sx={{ ml: 1 }}>{x.name}</Typography>
                <Typography alignSelf="flex-end" sx={{ ml: 3 }}>
                  {x.timestamp}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ScreenshotLayout;
