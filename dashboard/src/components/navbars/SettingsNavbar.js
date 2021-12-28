import { Stack, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

const SettingsNavbar = () => {
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
          <Link href="/settings/organization">Organization</Link>
        </Typography>
        <Typography sx={{ color: "black", mx: 1.5 }} component="h1" variant="h6">
          <Link href="/settings/users">Users</Link>
        </Typography>
        <Typography sx={{ color: "black", mx: 1.5 }} component="h1" variant="h6">
          <Link href="/settings/productivity">Productivity</Link>
        </Typography>
        <Typography sx={{ color: "black", mx: 1.5 }} component="h1" variant="h6">
          <Link href="/settings/screenshots">Screenshots</Link>
        </Typography>
        <Typography sx={{ color: "black", mx: 1.5 }} component="h1" variant="h6">
          <Link href="/">Integrations</Link>
        </Typography>
        <Typography sx={{ color: "black", mx: 1.5 }} component="h1" variant="h6">
          <Link href="/">Billing</Link>
        </Typography>
      </Stack>
    </Toolbar>
  );
};

export default SettingsNavbar;
