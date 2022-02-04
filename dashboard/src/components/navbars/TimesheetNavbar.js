import { Stack, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

const LeaderboardNavbar = () => {
  return (
    <Toolbar
      disableGutters
      sx={{
        minHeight: 64,
        left: 0,
        px: 2,
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#F0F0F0",
      }}
    >
      <Stack direction="row" justifyContent="center">
        <Typography sx={{ color: "black", mx: 1.5 }} component="h1" variant="h6">
          <Link href="/timesheet/activehours">Active Hours</Link>
        </Typography>
        <Typography sx={{ color: "black", mx: 1.5 }} component="h1" variant="h6">
          <Link href="/timesheet/productivehours">Productive Hours</Link>
        </Typography>
      </Stack>
    </Toolbar>
  );
};

export default LeaderboardNavbar;
