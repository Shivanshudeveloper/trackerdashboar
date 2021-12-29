import React from "react";
import { Box, OutlinedInput, Typography, Stack, Grid, Button } from "@mui/material";
import SettingsLayout from "../../../components/layouts/SettingsLayout";

const AddNewTeam = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
      }}
    >
      <Box sx={{ width: 700, p: 3 }}>
        <Typography component="h1" variant="h5">
          Add New Team
        </Typography>
        <Grid container sx={{ mb: 3, mt: 8 }}>
          <Grid item md={4} sx={{ display: "flex", alignItems: "center" }}>
            <Typography component="h1" variant="h6">
              Enter Team Name:
            </Typography>
          </Grid>
          <Grid item md={8}>
            <OutlinedInput fullWidth />
          </Grid>
        </Grid>
        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 7 }}>
          <Button variant="contained" sx={{ px: 5, py: 1.1, mr: 2 }}>
            Cancel
          </Button>
          <Button variant="contained" sx={{ px: 5, py: 1.1 }}>
            Add Team
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

AddNewTeam.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default AddNewTeam;
