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

const organisationName = () => {
  const router = useRouter();
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      sx={{ px: 10, py: 8, height: "100vh" }}
    >
      <Box>
        <Typography component="h1" variant="h4">
          Hi Hari om Ojha!
        </Typography>
        <Typography component="h2" variant="h5" sx={{ mt: 5, fontSize: 28 }}>
          Let's get started...
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
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
              mb: 8,
            }}
          >
            <FormLabel sx={{ mr: 5 }}>Enter Organisation Name</FormLabel>
            <OutlinedInput
              margin="normal"
              sx={{ borderRadius: 2.2, width: 500 }}
              name="organisationName"
              type="text"
              id="organisationName"
            />
          </FormControl>

          <Stack direction="row" justifyContent="space-between">
            <Button
              variant="contained"
              sx={{ mt: 2, mb: 2, py: 1.4, px: 4.2, fontSize: 16 }}
              onClick={() => router.push("/setUpTeams")}
            >
              SKip
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 2, mb: 2, py: 1.4, px: 4.2, fontSize: 16 }}
              onClick={() => router.push("/setUpTeams")}
            >
              Next
            </Button>
          </Stack>
        </Box>
      </Box>
      <Typography textAlign="center" component="h2" variant="h5" sx={{ my: 2 }}>
        Step 1/2
      </Typography>
    </Stack>
  );
};

export default organisationName;
