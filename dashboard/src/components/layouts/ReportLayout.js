import React from "react";
import { Box } from "@mui/material";
import MainNavbar from "../navbars/MainNavbar";
import SecondaryNavbar from "../navbars/SecondaryNavbar";
import ReportNavbar from "../navbars/ReportNavbar";

const ReportLayout = ({ children }) => {
  return (
    <Box>
      <MainNavbar />
      <SecondaryNavbar />
      <ReportNavbar />
      <main style={{ paddingTop: 20, display: "flex", justifyContent: "center" }}>
        <div style={{ width: "80%" }}>{children}</div>
      </main>
    </Box>
  );
};

export default ReportLayout;
