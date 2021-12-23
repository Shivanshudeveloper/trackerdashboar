import React from "react";
import { Box } from "@mui/material";
import DashboardNavbar from "../navbars/DashboardNavbar";
import MainNavbar from "../navbars/MainNavbar";
import SecondaryNavbar from "../navbars/SecondaryNavbar";

const DashboardLayout = ({ children }) => {
  return (
    <Box>
      <MainNavbar />
      <SecondaryNavbar />
      <DashboardNavbar />
      <main style={{ paddingTop: 20, display: "flex", justifyContent: "center" }}>
        <div style={{ width: "80%" }}>{children}</div>
      </main>
    </Box>
  );
};

export default DashboardLayout;
