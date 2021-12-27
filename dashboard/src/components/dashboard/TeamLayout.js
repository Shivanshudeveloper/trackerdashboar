import React from "react";
import { useRouter } from "next/router";
import { Avatar, Box, Button, Card, CardContent, Grid, Stack, Typography } from "@mui/material";

const TeamLayout = (props) => {
  const { data } = props;

  const router = useRouter();

  const keyList = Object.keys(data);
  const teamName = keyList[0];

  const valueList = Object.values(data)[0];

  return (
    <Box sx={{ mt: 6 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography component="h1" variant="h5">
          {`${teamName} (12)`}
        </Typography>
        <Box>
          <Button
            variant="contained"
            sx={{ py: 1 }}
            onClick={() => router.push("/dashboard/addusers")}
          >
            Add User
          </Button>
        </Box>
      </Stack>

      <Grid container sx={{ my: 2 }}>
        {valueList.map((x) => (
          <Grid item sm={4} md={3} lg={2} sx={{ display: "flex", justifyContent: "center" }}>
            <Card
              sx={{ width: 250, height: 200, m: 2, cursor: "pointer" }}
              onClick={() => router.push("user")}
            >
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Stack direction="row" alignItems="center">
                  <Avatar sx={{ bgcolor: "orange" }}>OP</Avatar>
                  <Typography sx={{ ml: 3 }}>{x.role}</Typography>
                </Stack>
                <Stack sx={{ mt: 2 }} direction="row" alignItems="center">
                  <Avatar sx={{ bgcolor: "pink" }}>OP</Avatar>
                  <Typography sx={{ ml: 3 }}>{x.name}</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TeamLayout;