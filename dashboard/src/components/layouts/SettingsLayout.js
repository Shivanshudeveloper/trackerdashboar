import React from "react";
import { Box } from "@mui/material";
import MainNavbar from "../navbars/MainNavbar";
import SecondaryNavbar from "../navbars/SecondaryNavbar";
import SettingsNavbar from "../navbars/SettingsNavbar";

const SettingsLayout = ({ children }) => {
  return (
    <Box sx={{ flex: 1 }}>
      <MainNavbar />
      <SecondaryNavbar />
      <SettingsNavbar />
      <main style={{ paddingTop: 20, display: "flex", justifyContent: "center" }}>
        <div style={{ width: "80%" }}>{children}</div>
      </main>
    </Box>
  );
};

export default SettingsLayout;
