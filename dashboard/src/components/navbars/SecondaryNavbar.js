import React from "react";
import { Stack, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

const SecondaryNavbar = () => {
  return (
    <Toolbar
      disableGutters
      sx={{
        minHeight: 64,
        left: 0,
        px: 2,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#d2d2d2",
      }}
    >
      <Stack direction="row" justifyContent="center">
        <Typography sx={{ color: "black", mx: 1.5 }} component="h1" variant="h6">
          <Link href="/">Dashboard</Link>
        </Typography>
        <Typography sx={{ color: "black", mx: 1.5 }} component="h1" variant="h6">
          <Link href="/leaderboard/mostactive">Leaderboard</Link>
        </Typography>
        <Typography sx={{ color: "black", mx: 1.5 }} component="h1" variant="h6">
          <Link href="/timesheet/activehours">Timesheet</Link>
        </Typography>
        <Typography sx={{ color: "black", mx: 1.5 }} component="h1" variant="h6">
          <Link href="/reports/scheduledreports">Reports</Link>
        </Typography>
        <Typography sx={{ color: "black", mx: 1.5 }} component="h1" variant="h6">
          <Link href="/settings/organization">Settings</Link>
        </Typography>
      </Stack>
    </Toolbar>
  );
};

export default SecondaryNavbar;
