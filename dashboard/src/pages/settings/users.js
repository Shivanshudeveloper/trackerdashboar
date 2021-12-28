import React from "react";
import { Box, Button, IconButton, Stack } from "@mui/material";
import { Search } from "@mui/icons-material";

import SettingsLayout from "src/components/layouts/SettingsLayout";
import AddUserAndTeamLayout from "src/components/settings/AddUserAndTeamLayout";

const fakeTeamData = [
  {
    "IT Team": [
      {
        name: "Arun",
      },
      {
        name: "Arun",
      },
      {
        name: "Arun",
      },
      {
        name: "Arun",
      },
      {
        name: "Arun",
      },
      {
        name: "Arun",
      },
      {
        name: "Arun",
      },
      {
        name: "Arun",
      },
      {
        name: "Arun",
      },
    ],
  },
  {
    "Design Team": [
      {
        name: "Arun",
      },
      {
        name: "Arun",
      },
    ],
  },
];

const Users = () => {
  return (
    <Box>
      <Stack direction="row" justifyContent="flex-end">
        <Button variant="contained" sx={{ px: 5, py: 1.2, fontSize: 16, mx: 0.5 }}>
          Add Team
        </Button>
        <Button variant="contained" sx={{ px: 5, py: 1.2, fontSize: 16, mx: 0.5 }}>
          Add User
        </Button>
        <IconButton color="primary" sx={{ mx: 0.5 }}>
          <Search fontSize="large" />
        </IconButton>
      </Stack>
      <Box sx={{ my: 4 }}>
        {fakeTeamData.map((x) => (
          <AddUserAndTeamLayout data={x} />
        ))}
      </Box>
    </Box>
  );
};

Users.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default Users;
