import React from "react";
import {
  Box,
  Grid,
  Typography,
  ListItem,
  ListItemText,
  FormControlLabel,
  Switch,
  Stack,
} from "@mui/material";
import SettingsLayout from "src/components/layouts/SettingsLayout";

const teams = [
  {
    title: "IT Team",
    categoryCount: 20,
  },
  {
    title: "Design Team",
    categoryCount: 20,
  },
];

const category = [
  {
    title: "Marketing",
    count: 5,
  },
  {
    title: "Networking",
    count: 5,
  },
  {
    title: "Social Media",
    count: 5,
  },
  {
    title: "Graphic Design",
    count: 5,
  },
  {
    title: "Gaming",
    count: 5,
  },
  {
    title: "News",
    count: 5,
  },
];

const application = [
  {
    title: "Facebook",
  },
  {
    title: "Whatsapp",
  },
  {
    title: "YouTube",
  },
  {
    title: "Instagram",
  },
  {
    title: "TikTok",
  },
];

const Productivity = () => {
  return (
    <Box sx={{ py: 3, height: "100%" }}>
      <Grid container>
        <Grid item md={4} sx={{ backgroundColor: "#f5f5f5", p: 2, px: 3, flex: 1 }}>
          <Typography textAlign="center" component="h1" variant="h6" sx={{ m: 2, mb: 4 }}>
            Teams
          </Typography>
          <Box>
            {teams.map((x) => (
              <ListItem sx={{ backgroundColor: "#E8E9EB", borderRadius: 2, my: 2 }}>
                <ListItemText sx={{ fontSize: 18 }} primary={x.title} secondary={x.categoryCount} />
              </ListItem>
            ))}
          </Box>
        </Grid>

        <Grid item md={4} sx={{ p: 2, px: 3, flex: 1 }}>
          <Typography textAlign="center" component="h1" variant="h6" sx={{ m: 2, mb: 4 }}>
            Application Categories
          </Typography>
          <Box>
            {category.map((x) => (
              <ListItem
                secondaryAction={
                  <FormControlLabel
                    control={<Switch size="large" color="primary" />}
                    label={
                      <Stack direction="row">
                        <Typography sx={{ fontSize: 12 }} component="p" variant="p">
                          Productive
                        </Typography>
                        <Typography sx={{ fontSize: 12, ml: 2 }} component="p" variant="p">
                          Unproductive
                        </Typography>
                      </Stack>
                    }
                    labelPlacement="bottom"
                  />
                }
                sx={{ backgroundColor: "#E8E9EB", borderRadius: 2, my: 2, py: 2.5 }}
              >
                <ListItemText primary={x.title} secondary={x.categoryCount} />
              </ListItem>
            ))}
          </Box>
        </Grid>

        <Grid item md={4} sx={{ backgroundColor: "#f5f5f5", p: 2, px: 3, flex: 1 }}>
          <Typography textAlign="center" component="h1" variant="h6" sx={{ m: 2, mb: 4 }}>
            Applications
          </Typography>
          <Box>
            {application.map((x) => (
              <ListItem
                secondaryAction={
                  <FormControlLabel
                    control={<Switch size="large" color="primary" />}
                    label={
                      <Stack direction="row">
                        <Typography sx={{ fontSize: 12 }} component="p" variant="p">
                          Productive
                        </Typography>
                        <Typography sx={{ fontSize: 12, ml: 2 }} component="p" variant="p">
                          Unproductive
                        </Typography>
                      </Stack>
                    }
                    labelPlacement="bottom"
                  />
                }
                sx={{ backgroundColor: "#E8E9EB", borderRadius: 2, my: 2, py: 2.5 }}
              >
                <ListItemText sx={{ fontSize: 18 }} primary={x.title} secondary={x.categoryCount} />
              </ListItem>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

Productivity.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default Productivity;
