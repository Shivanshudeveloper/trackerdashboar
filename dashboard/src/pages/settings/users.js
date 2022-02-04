import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Button, CircularProgress, IconButton, Stack } from "@mui/material";
import { Search } from "@mui/icons-material";
import axios from "axios";

import SettingsLayout from "src/components/layouts/SettingsLayout";
import AddUserAndTeamLayout from "src/components/settings/AddUserAndTeamLayout";
import { API_SERVICE } from "src/config/uri";

const Users = () => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const data = JSON.parse(window.sessionStorage.getItem("userData"));
    setUserData(data);

    if (data !== null && data !== undefined) {
      try {
        const users = await axios.get(`${API_SERVICE}/api/teamUsersByGroup/${data.organization}`);
        console.log(users);
        if (users.data.length === 0) {
          setLoading(false);
          setOpen(true);
        } else {
          setLoading(false);
          setUserList(users.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }, []);

  const router = useRouter();

  return (
    <Box>
      <Stack direction="row" justifyContent="flex-end">
        <Button
          variant="contained"
          sx={{ px: 5, py: 1.2, fontSize: 16, mx: 0.5 }}
          onClick={() => router.push("/settings/users/addnewteam")}
        >
          Add Team
        </Button>
        <Button
          variant="contained"
          sx={{ px: 5, py: 1.2, fontSize: 16, mx: 0.5 }}
          onClick={() => router.push("/settings/users/addnewuser")}
        >
          Add User
        </Button>
        <IconButton color="primary" sx={{ mx: 0.5 }}>
          <Search fontSize="large" />
        </IconButton>
      </Stack>
      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: 500,
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}
      {userList.length !== 0 && !loading && (
        <Box sx={{ my: 4 }}>
          {userList.map((x, index) => (
            <AddUserAndTeamLayout key={index++} data={x} />
          ))}
        </Box>
      )}
    </Box>
  );
};

Users.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default Users;
