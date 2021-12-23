import React from "react";
import { Box } from "@mui/material";
import MainNavbar from "../navbars/MainNavbar";
import SecondaryNavbar from "../navbars/SecondaryNavbar";
import TimesheetNavbar from "../navbars/TimesheetNavbar";

const DashboardLayout = ({ children }) => {
  return (
    <Box>
      <MainNavbar />
      <SecondaryNavbar />
      <TimesheetNavbar />
      <main style={{ paddingTop: 20, display: "flex", justifyContent: "center" }}>
        <div style={{ width: "80%" }}>{children}</div>
      </main>
    </Box>
  );
};

export default DashboardLayout;
