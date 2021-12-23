import React from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  OutlinedInput,
  Stack,
  Button,
} from "@mui/material";

const setUpTeams = () => {
  const router = useRouter();
  return (
    <Stack
      direction="column"
      sx={{ px: 10, py: 8, height: "100vh" }}
      justifyContent="space-between"
    >
      <Typography component="h1" variant="h4">
        Set up your Teams
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 6,
        }}
      >
        <Box>
          <FormControl
            fullWidth
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
              mb: 4,
            }}
          >
            <FormLabel sx={{ mr: 5 }}>Enter Team Name</FormLabel>
            <OutlinedInput
              margin="normal"
              sx={{ borderRadius: 2.2, width: 500 }}
              name="finance-team"
              type="text"
              id="finance-team"
              placeholder="Finance Team"
            />
          </FormControl>
          <FormControl
            fullWidth
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
              mb: 4,
            }}
          >
            <FormLabel sx={{ mr: 5 }}>Enter Team Name</FormLabel>
            <OutlinedInput
              margin="normal"
              sx={{ borderRadius: 2.2, width: 500 }}
              name="itTeam"
              type="text"
              id="itTeam"
              placeholder="IT Team"
            />
          </FormControl>
          <FormControl
            fullWidth
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
              mb: 4,
            }}
          >
            <FormLabel sx={{ mr: 5 }}>Enter Team Name</FormLabel>
            <OutlinedInput
              margin="normal"
              sx={{ borderRadius: 2.2, width: 500 }}
              name="hrTeam"
              type="text"
              id="hrTeam"
              placeholder="HR Team"
            />
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 8, py: 1.4, px: 4.2, fontSize: 16 }}
            onClick={() => router.push("/")}
          >
            Add New Team
          </Button>
          <Stack sx={{ mt: 2 }} direction="row" justifyContent="space-between">
            <Button variant="contained" sx={{ mt: 2, mb: 2, py: 1.4, px: 4.2, fontSize: 16 }}>
              Skip
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 2, mb: 2, py: 1.4, px: 4.2, fontSize: 16 }}
              onClick={() => router.push("/")}
            >
              Next
            </Button>
          </Stack>
        </Box>
      </Box>
      <Typography textAlign="center" component="h2" variant="h5" sx={{ my: 2 }}>
        Step 2/2
      </Typography>
    </Stack>
  );
};

export default setUpTeams;
