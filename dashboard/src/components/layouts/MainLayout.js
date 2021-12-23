import React from "react";
import { Box, AppBar } from "@mui/material";
import MainNavbar from "../navbars/MainNavbar";

const MainLayout = ({ children }) => {
  return (
    <Box>
      <AppBar>
        <MainNavbar />
      </AppBar>
      <main style={{ paddingTop: 64 }}>{children}</main>
    </Box>
  );
};

export default MainLayout;
