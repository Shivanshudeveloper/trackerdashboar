import React, { useState } from "react";
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
import SaveChangeDialog from "src/components/settings/SaveChangeDialog";
import RemoveDialog from "src/components/settings/RemoveDialog";

const EditUser = () => {
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);

  const handleChangeClose = () => {
    setOpenSaveDialog(false);
  };

  const handleRemoveClose = () => {
    setOpenRemoveDialog(false);
  };

  return (
    <Box sx={{ py: 3 }}>
      <Typography component="h1" variant="h4">
        View / Edit User
      </Typography>
      <Grid container sx={{ my: 4 }}>
        <Grid item md={2} sx={{ display: "flex", alignItems: "center" }}>
          <Typography component="h1" variant="h6">
            Name:
          </Typography>
        </Grid>
        <Grid item md={10} sx={{ my: 3 }}>
          <OutlinedInput fullWidth margin="normal" />
        </Grid>

        <Grid item md={2} sx={{ display: "flex", alignItems: "center", my: 3 }}>
          <Typography component="h1" variant="h6">
            Profile Picture:
          </Typography>
        </Grid>
        <Grid item md={4} sx={{ my: 3 }}>
          <Avatar src="" sx={{ width: 120, height: 120 }} />
        </Grid>
        <Grid item md={6} sx={{ my: 3 }}>
          <Box>
            <Grid container>
              <Grid item md={3} sx={{ display: "flex", alignItems: "center" }}>
                <Typography component="h1" variant="h6">
                  Team
                </Typography>
              </Grid>
              <Grid item md={9}>
                <FormControl variant="outlined" sx={{ m: 1, minWidth: 400 }}>
                  <InputLabel>Team</InputLabel>
                  <Select label="Team">
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
                  Role
                </Typography>
              </Grid>
              <Grid item md={9}>
                <FormControl variant="outlined" sx={{ m: 1, minWidth: 400 }}>
                  <InputLabel>Role</InputLabel>
                  <Select label="Role">
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

        <Grid item md={2} sx={{ display: "flex", alignItems: "center", my: 3 }}>
          <Typography component="h1" variant="h6">
            Email Address:
          </Typography>
        </Grid>
        <Grid item md={10} sx={{ my: 3 }}>
          <OutlinedInput fullWidth margin="normal" />
        </Grid>

        <Grid item md={2} sx={{ display: "flex", alignItems: "center", my: 3 }}>
          <Typography component="h1" variant="h6">
            Shareable Link:
          </Typography>
        </Grid>
        <Grid item md={10} sx={{ my: 3, display: "flex" }}>
          <OutlinedInput fullWidth sx={{ mr: 2, m: 1 }} />
          <FormControl variant="outlined" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>Copy Link</InputLabel>
            <Select label="Copy Link">
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
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 5 }}>
        <Button
          variant="contained"
          sx={{ px: 4, py: 1.2, fontSize: 16, mx: 0.5 }}
          onClick={() => setOpenRemoveDialog(true)}
        >
          Remove User
        </Button>
        <Button variant="contained" sx={{ px: 4, py: 1.2, fontSize: 16, mx: 0.5 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ px: 4, py: 1.2, fontSize: 16, mx: 0.5 }}
          onClick={() => setOpenSaveDialog(true)}
        >
          Save
        </Button>
      </Stack>
      <SaveChangeDialog
        open={openSaveDialog}
        handleClose={handleChangeClose}
        setOpen={setOpenSaveDialog}
      />
      <RemoveDialog
        open={openRemoveDialog}
        handleClose={handleRemoveClose}
        setOpen={setOpenRemoveDialog}
      />
    </Box>
  );
};

EditUser.getLayout = (page) => <SettingsLayout>{page}</SettingsLayout>;

export default EditUser;
