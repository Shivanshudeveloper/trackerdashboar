import React, { useContext, useEffect, useState } from "react";
import { Stack, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import axios from "axios";
import { API_SERVICE } from "src/config/uri";
import { AuthContext } from "src/contextx/authContext";

const DashboardNavbar = () => {
  const [allUsers, setAllUser] = useState(0);
  const [active, setActive] = useState(0);
  const [inactive, setInactive] = useState(0);

  const { user } = useContext(AuthContext);

  useEffect(async () => {
    if (user !== null) {
      await axios
        .get(`${API_SERVICE}/api/teamUser/count/${user.organization}`)
        .then((res) => {
          const response = res.data;
          setAllUser(response.allUsers);
          setActive(response.active);
          setInactive(response.inactive);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

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
          <Link href="/">{`All Users (${allUsers})`}</Link>
        </Typography>
        <Typography sx={{ color: "black", mx: 1.5 }} component="h1" variant="h6">
          <Link href="/dashboard/activetoday">{`Active Today (${active})`}</Link>
        </Typography>
        <Typography sx={{ color: "black", mx: 1.5 }} component="h1" variant="h6">
          <Link href="/dashboard/inactivetoday">{`Inactive Today (${inactive})`}</Link>
        </Typography>
        <Typography sx={{ color: "black", mx: 1.5 }} component="h1" variant="h6">
          <Link href="/">No Show</Link>
        </Typography>
        <Typography sx={{ color: "black", mx: 1.5 }} component="h1" variant="h6">
          <Link href="/">App not installed</Link>
        </Typography>
      </Stack>
    </Toolbar>
  );
};

export default DashboardNavbar;
