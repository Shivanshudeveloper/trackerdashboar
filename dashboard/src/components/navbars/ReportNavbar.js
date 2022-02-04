import { Stack, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

const ReportNavbar = () => {
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
        <Typography sx={{ mx: 1.5 }} component="h1" variant="h6">
          <Link href="/reports/scheduledreports">Scheduled Reports</Link>
        </Typography>
        <Typography sx={{ color: "black", mx: 1.5 }} component="h1" variant="h6">
          <Link href="/reports/pastreports">Past Reports</Link>
        </Typography>
      </Stack>
    </Toolbar>
  );
};

export default ReportNavbar;
