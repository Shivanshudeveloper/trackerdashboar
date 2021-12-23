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
      }}
    >
      <Stack direction="row" justifyContent="center">
        <Typography sx={{ color: "black", mx: 1.5 }} component="h1" variant="h6">
          <Link href="/leaderboard/mostActive">Most Active</Link>
        </Typography>
        <Typography sx={{ color: "black", mx: 1.5 }} component="h1" variant="h6">
          <Link href="/leaderboard/mostProductive">Most Productive</Link>
        </Typography>
      </Stack>
    </Toolbar>
  );
};

export default LeaderboardNavbar;
