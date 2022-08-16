import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Box, Button, CircularProgress, Stack } from "@mui/material";

import SettingsLayout from "src/components/layouts/SettingsLayout";
import AddUserAndTeamLayout from "src/components/settings/AddUserAndTeamLayout";

import { TeamAndUserContext } from "src/contextx/teamAndUserContext";

const Users = () => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  const { users } = useContext(TeamAndUserContext);

  useEffect(() => {
    if (users !== null) {
      setLoading(false);
      setUserList(users);
    }
  }, [users]);

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

      {!loading && (
        <Box sx={{ my: 4 }}>
          {Object.keys(userList).map((x, index) => (
            <AddUserAndTeamLayout key={index++} data={userList[x]} />
          ))}
        </Box>
      )}
    </Box>
  );
};

Users.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default Users;
