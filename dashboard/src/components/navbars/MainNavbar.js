import React from "react";
import { Grid, Stack, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

const MainNavbar = () => {
  return (
    <Toolbar
      disableGutters
      sx={{
        minHeight: 64,
        left: 0,
        px: 2,
        backgroundColor: "gray",
      }}
    >
      <Grid container>
        <Grid item md={4}>
          <Typography sx={{ color: "black" }} component="h1" variant="h6">
            Design Qube
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Typography textAlign="center" sx={{ color: "black" }} component="h1" variant="h6">
            Productivity Report
          </Typography>
        </Grid>
        <Grid item md={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Stack
            alignSelf="flex-end"
            direction="row"
            sx={{ width: "200px" }}
            justifyContent="space-between"
          >
            <Typography sx={{ color: "black" }} component="h1" variant="h6">
              <Link href="/notifications">Notifications</Link>
            </Typography>
            <Typography sx={{ color: "black" }} component="h1" variant="h6">
              <Link href="/profile">Profile</Link>
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

export default MainNavbar;
