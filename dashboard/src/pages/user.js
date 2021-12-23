import React from "react";
import { Box, Grid, Stack, Avatar, Typography, Button } from "@mui/material";
import MainLayout from "src/components/layouts/MainLayout";
import CardComponent from "src/components/user/CardComponent";
import ActivityCarousel from "src/components/user/ActivityCarousel";

const User = () => {
  return (
    <Box sx={{ p: 5 }}>
      <Grid container>
        <Grid item sm={12} md={5} sx={{ display: "flex" }}>
          <Box
            sx={{
              alignSelf: "center",
              position: "relative",
            }}
          >
            <Avatar
              sx={{ width: 120, height: 120, backgroundColor: "orange" }}
              src={{ url: "https://picsum.photos/200" }}
            />
            <div
              style={{
                width: 14,
                height: 14,
                backgroundColor: "green",
                position: "absolute",
                bottom: 12,
                left: 12,
                borderRadius: "50%",
              }}
            ></div>
          </Box>
          <Stack sx={{ ml: 4 }} direction="column" justifyContent="center">
            <Typography sx={{ fontWeight: 500 }} component="h3" variant="h4">
              Arun Kartik - IT Team
            </Typography>
            <Typography component="h3" variant="h5">
              Start time - 9AM
            </Typography>
          </Stack>
        </Grid>
        <Grid item sm={12} md={7}>
          <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <Typography component="p" variant="h6">
              December 22, 2021
            </Typography>
            <Button variant="contained" sx={{ py: 1.2, px: 3.6, ml: 3 }}>
              Export
            </Button>
          </Stack>
          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
            <CardComponent title="Active" body="6h 56m" headerColor="gray" bgColor="#d2d2d2" />
            <CardComponent title="Productive" body="5h 30m" headerColor="green" bgColor="#90ee90" />
            <CardComponent title="Idle" body="1h 56m" headerColor="orange" bgColor="yellow" />
            <CardComponent
              title="Unproductive"
              body="00h 06m"
              headerColor="#dc143c"
              bgColor="#ff4040"
            />
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ my: 4, mt: 6 }}>
        <Typography component="h1" variant="h4" sx={{ fontWeight: 500 }}>
          Productivity TimeLine
        </Typography>
      </Box>
      <Box sx={{ mt: 6 }}>
        <Typography component="h1" variant="h4" sx={{ fontWeight: 500 }}>
          Activity TimeLine
        </Typography>
        <ActivityCarousel />
      </Box>
    </Box>
  );
};

User.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default User;
