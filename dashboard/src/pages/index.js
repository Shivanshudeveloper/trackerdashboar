import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  IconButton,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import TeamLayout from "../components/dashboard/TeamLayout";
import { Close } from "@mui/icons-material";
import DashboardLayout from "src/components/layouts/DashboardLayout";

const fakeTeamData = [
  {
    "IT Team": [
      {
        name: "Arun",
        role: "Figma",
      },
      {
        name: "Arun",
        role: "Figma",
      },
      {
        name: "Arun",
        role: "Figma",
      },
      {
        name: "Arun",
        role: "Figma",
      },
      {
        name: "Arun",
        role: "Figma",
      },
      {
        name: "Arun",
        role: "Figma",
      },
      {
        name: "Arun",
        role: "Figma",
      },
      {
        name: "Arun",
        role: "Figma",
      },
      {
        name: "Arun",
        role: "Figma",
      },
    ],
  },
  {
    "Design Team": [
      {
        name: "Arun",
        role: "Figma",
      },
      {
        name: "Arun",
        role: "Figma",
      },
    ],
  },
];

const Dashboard = () => {
  const [open, setOpen] = useState(true);

  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>Dashboard | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 5,
          px: 5,
        }}
      >
        <Container maxWidth={false}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <FormControl variant="filled" sx={{ minWidth: 250, mr: 3, alignSelf: "flex-end" }}>
              <InputLabel id="demo-simple-select-filled-label">All Teams</InputLabel>
              <Select labelId="demo-simple-select-filled-label" id="demo-simple-select-filled">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            <Box>
              {fakeTeamData.map((x) => (
                <TeamLayout data={x} />
              ))}
            </Box>
          </Box>

          <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
            <Card sx={{ width: 550 }}>
              <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton onClick={handleClose}>
                  <Close />
                </IconButton>
              </CardActions>
              <CardContent sx={{ py: 1 }}>
                <Typography textAlign="center" component="h1" variant="h6">
                  Add users to start monitoring
                </Typography>
                <Stack direction="row" justifyContent="space-around" sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    sx={{ mt: 2, mb: 2, py: 1, px: 3, fontSize: 16 }}
                    onClick={handleClose}
                  >
                    Add Later
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ mt: 2, mb: 2, py: 1, px: 3, fontSize: 16 }}
                    onClick={() => router.push("/dashboard/addusers")}
                  >
                    Add User
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Backdrop>
        </Container>
      </Box>
    </>
  );
};

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
