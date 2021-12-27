import React from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  OutlinedInput,
  FormControlLabel,
  Button,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import MainLayout from "src/components/layouts/MainLayout";

const CreateReport = () => {
  return (
    <Box>
      <Typography component="h1" variant="h4" sx={{ fontWeight: 500 }}>
        Create/Edit Report
      </Typography>
      <Grid container sx={{ mt: 3 }}>
        <Grid item md={2} sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 500 }}>
            Select Teams:
          </Typography>
        </Grid>
        <Grid item md={10} sx={{ mt: 2 }}>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>All Teams</InputLabel>
            <Select label="Teams">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={2} sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 500 }}>
            Select Users:
          </Typography>
        </Grid>
        <Grid item md={10} sx={{ mt: 2 }}>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>All Users</InputLabel>
            <Select label="Users">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={2} sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 500 }}>
            Report Title:
          </Typography>
        </Grid>
        <Grid item md={10} sx={{ mt: 3 }}>
          <OutlinedInput fullWidth placeholder="Title" />
        </Grid>

        <Grid item md={2} sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 500 }}>
            Report Category:
          </Typography>
        </Grid>
        <Grid item md={10} sx={{ mt: 3 }}>
          <FormControl component="fieldset">
            <RadioGroup sx={{ display: "flex", flexDirection: "row" }}>
              <FormControlLabel value="female" control={<Radio />} label="Productivity" />
              <FormControlLabel value="male" control={<Radio />} label="Timesheet" />
              <FormControlLabel value="other" control={<Radio />} label="App Usage" />
              <FormControlLabel value="disabled" control={<Radio />} label="Activities" />
              <FormControlLabel value="disabled" control={<Radio />} label="Screenshots" />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item md={2} sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 500 }}>
            Report Period:
          </Typography>
        </Grid>
        <Grid item md={10} sx={{ mt: 3 }}>
          <Typography component="h1" variant="h6" sx={{ fontWeight: 500 }}>
            Date Picker with range
          </Typography>
        </Grid>

        <Grid item md={2} sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 500 }}>
            Share Report:
          </Typography>
        </Grid>
        <Grid item md={6} sx={{ mt: 3 }}>
          <Grid container>
            <Grid item md={4}>
              <Button sx={{ px: 6, py: 1.4 }}>One Time</Button>
            </Grid>
            <Grid item md={4}>
              <Button sx={{ px: 6, py: 1.4 }}>Daily</Button>
            </Grid>
            <Grid item md={4}>
              <Button sx={{ px: 6, py: 1.4 }}>Weekly</Button>
            </Grid>
            <Grid item md={4}>
              <Button sx={{ px: 6, py: 1.4 }}>Monthly</Button>
            </Grid>
            <Grid item md={4}>
              <Button sx={{ px: 6, py: 1.4 }}>Annually</Button>
            </Grid>
            <Grid item md={4}>
              <Button sx={{ px: 6, py: 1.4 }}>Fortnightly</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          md={4}
          sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", mt: 3 }}
        >
          <Typography component="h1" variant="h5" sx={{ fontWeight: 500, mr: 3 }}>
            at
          </Typography>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>12:00 PM</InputLabel>
            <Select label="Age">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={2} sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 500 }}>
            Share With:
          </Typography>
        </Grid>
        <Grid item md={10} sx={{ mt: 3 }}>
          <FormControl fullWidth variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel></InputLabel>
            <Select label="Age">
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
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
        <Button variant="contained" sx={{ px: 6, py: 1.3, mr: 3, fontSize: 18 }}>
          Preview
        </Button>
        <Button variant="contained" sx={{ px: 6, py: 1.5, fontSize: 18 }}>
          Save
        </Button>
      </Stack>
    </Box>
  );
};

CreateReport.getLayout = (page) => <MainLayout>{page}</MainLayout>;

export default CreateReport;
