import React from "react";
import {
  Box,
  Stack,
  Button,
  Grid,
  Typography,
  OutlinedInput,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import SettingsLayout from "src/components/layouts/SettingsLayout";

const Organization = () => {
  return (
    <Box sx={{ py: 3 }}>
      <Stack direction="row" justifyContent="flex-end">
        <Button variant="contained" sx={{ px: 4, py: 1.2, fontSize: 16, mx: 0.5 }}>
          Edit
        </Button>
        <Button variant="contained" sx={{ px: 4, py: 1.2, fontSize: 16, mx: 0.5 }}>
          Save Changes
        </Button>
        <Button variant="contained" sx={{ px: 4, py: 1.2, fontSize: 16, mx: 0.5 }}>
          Add Users
        </Button>
      </Stack>
      <Grid container sx={{ my: 4 }}>
        <Grid item md={2} sx={{ display: "flex", alignItems: "center" }}>
          <Typography component="h1" variant="h6">
            Organization Name:
          </Typography>
        </Grid>
        <Grid item md={10} sx={{ my: 3 }}>
          <OutlinedInput fullWidth margin="normal" />
        </Grid>

        <Grid item md={2} sx={{ display: "flex", alignItems: "center", my: 3 }}>
          <Typography component="h1" variant="h6">
            Logo:
          </Typography>
        </Grid>
        <Grid item md={10} sx={{ my: 3 }}>
          <Avatar src="" sx={{ width: 120, height: 120 }} />
        </Grid>

        <Grid item md={2} sx={{ display: "flex", alignItems: "center", my: 3 }}>
          <Typography component="h1" variant="h6">
            Custom Domain:
          </Typography>
        </Grid>
        <Grid item md={10} sx={{ my: 3 }}>
          <OutlinedInput fullWidth margin="normal" />
        </Grid>

        <Grid item md={2} sx={{ display: "flex", alignItems: "center", my: 3 }}>
          <Typography component="h1" variant="h6">
            Timezone:
          </Typography>
        </Grid>
        <Grid item md={10} sx={{ my: 3 }}>
          <FormControl fullWidth variant="outlined" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Timezone</InputLabel>
            <Select label="Timezone">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Typography component="h1" variant="h5">
        Default Monitoring Settings
      </Typography>

      <Grid container sx={{ py: 2 }}>
        <Grid item md={1.5} sx={{ py: 3 }}>
          <Typography component="h1" variant="h6">
            Tracking Mode
          </Typography>
        </Grid>
        <Grid item md={4.5} sx={{ my: 2 }}>
          <FormControl component="fieldset">
            <RadioGroup defaultValue="stealth">
              <FormControlLabel
                sx={{ mb: 2 }}
                value="stealth"
                control={<Radio />}
                label="Stealth Mode"
              />
              <FormControlLabel value="visible" control={<Radio />} label="Visible Mode" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item md={6} sx={{ py: 1 }}>
          <Box>
            <Grid container>
              <Grid item md={3} sx={{ display: "flex", alignItems: "center" }}>
                <Typography component="h1" variant="h6">
                  Track On
                </Typography>
              </Grid>
              <Grid item md={9}>
                <FormControl variant="outlined" sx={{ m: 1, minWidth: 400 }}>
                  <InputLabel>Track On</InputLabel>
                  <Select label="Track On">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Grid container>
              <Grid item md={3} sx={{ display: "flex", alignItems: "center" }}>
                <Typography component="h1" variant="h6">
                  Track Between
                </Typography>
              </Grid>
              <Grid item md={9}>
                <FormControl variant="outlined" sx={{ m: 1, minWidth: 400 }}>
                  <InputLabel>Track Between</InputLabel>
                  <Select label="Track Between">
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

Organization.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default Organization;
