import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import SettingsLayout from "src/components/layouts/SettingsLayout";

const Screenshots = () => {
  return (
    <Box>
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
        <Button variant="contained" sx={{ px: 5, py: 1.2, fontSize: 16 }}>
          Save Changes
        </Button>
      </Stack>

      <Typography component="h1" variant="h5">
        Default Screenshot Settings
      </Typography>

      <Grid container sx={{ mt: 8, mb: 4 }}>
        <Grid item md={3} sx={{ mt: 3 }}>
          <Typography component="h1" variant="h6">
            Capture Screenshots of:
          </Typography>
        </Grid>
        <Grid item md={9} sx={{ mt: 3 }}>
          <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
            <FormControlLabel
              sx={{ mr: 5 }}
              control={<Checkbox defaultChecked />}
              label="IT Team"
            />
            <FormControlLabel sx={{ mr: 5 }} control={<Checkbox />} label="Design Team" />
            <FormControlLabel sx={{ mr: 5 }} control={<Checkbox />} label="Finance Team" />
          </FormGroup>
        </Grid>

        <Grid item md={3} sx={{ mt: 3, display: "flex", alignItems: "center" }}>
          <Typography component="h1" variant="h6">
            Screenshot time Interval:
          </Typography>
        </Grid>
        <Grid item md={9} sx={{ mt: 3 }}>
          <FormControl variant="outlined" sx={{ m: 1, minWidth: 300 }}>
            <InputLabel>Interval</InputLabel>
            <Select label="Interval">
              <MenuItem value="Every Ten Minutes">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Every Ten Minutes</MenuItem>
              <MenuItem value={20}>Every Twenty Minutes</MenuItem>
              <MenuItem value={30}>Every Thirty Minutes</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={3} sx={{ mt: 3, display: "flex", alignItems: "center" }}>
          <Typography component="h1" variant="h6">
            Automatically delete screenshots after:
          </Typography>
        </Grid>
        <Grid item md={9} sx={{ mt: 3 }}>
          <FormControl variant="outlined" sx={{ m: 1, minWidth: 300 }}>
            <InputLabel>Interval</InputLabel>
            <Select label="Interval">
              <MenuItem value="1 Week">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1 Week</MenuItem>
              <MenuItem value={2}>2 Week</MenuItem>
              <MenuItem value={3}>3 Week</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <FormControlLabel sx={{ mt: 1 }} control={<Checkbox />} label="Blur Screenshots" />
    </Box>
  );
};

Screenshots.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default Screenshots;
