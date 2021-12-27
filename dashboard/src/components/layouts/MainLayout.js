import React from "react";
import { Box, AppBar } from "@mui/material";
import MainNavbar from "../navbars/MainNavbar";

const MainLayout = ({ children }) => {
  return (
    <Box>
      <AppBar>
        <MainNavbar />
      </AppBar>
      <main style={{ paddingTop: 80, display: "flex", justifyContent: "center" }}>
        <div style={{ width: "80%" }}>{children}</div>
      </main>
    </Box>
  );
};

export default MainLayout;
