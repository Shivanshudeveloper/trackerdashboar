import * as React from "react";
import Head from "next/head";
import {
  Box,
  Typography,
  Stack,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ShareIcon from "@mui/icons-material/Share";
import DashboardLayout from "src/components/layouts/DashboardLayout";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const AddUsers = () => {
  return (
    <>
      <Head>
        <title>Add Users | Material Kit</title>
      </Head>
      <Box sx={{ p: 5, display: "flex", flexDirection: "column" }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography component="h1" variant="h5">
            Add Users
          </Typography>
          <Stack direction="row" alignItems="center">
            <Typography component="h1" variant="h6">
              Default User Tracking Mode:
            </Typography>
            <Stack direction="column" alignItems="center" sx={{ ml: 2 }}>
              <FormControlLabel
                control={<Switch color="primary" />}
                label={
                  <Stack direction="row">
                    <Typography sx={{ fontSize: 12 }} component="p" variant="p">
                      Stealth
                    </Typography>
                    <Typography sx={{ fontSize: 12, ml: 2 }} component="p" variant="p">
                      Visible
                    </Typography>
                  </Stack>
                }
                labelPlacement="bottom"
              />
            </Stack>
          </Stack>
        </Stack>

        <TableContainer sx={{ my: 4 }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">User Id</TableCell>
                <TableCell align="center">Team</TableCell>
                <TableCell align="center">Role</TableCell>
                <TableCell align="center">Email Address</TableCell>
                <TableCell align="center">Tracking Mode</TableCell>
                <TableCell align="center">Sharable Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.calories}</TableCell>
                  <TableCell align="center">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-filled-label">Team</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="center">
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-filled-label">Role</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="center">{row.protein}</TableCell>
                  <TableCell align="center">
                    <FormControlLabel
                      control={<Switch color="primary" />}
                      label={
                        <Stack direction="row">
                          <Typography sx={{ fontSize: 12 }} component="p" variant="p">
                            Stealth
                          </Typography>
                          <Typography sx={{ fontSize: 12, ml: 2 }} component="p" variant="p">
                            Visible
                          </Typography>
                        </Stack>
                      }
                      labelPlacement="bottom"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <ShareIcon />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button fullWidth variant="contained" sx={{ py: 1.4 }}>
          Add New User
        </Button>

        <Box sx={{ mt: 2, alignSelf: "flex-end" }}>
          <Button variant="contained" sx={{ py: 1.4, mr: 2, backgroundColor: "gray" }}>
            Cancel
          </Button>
          <Button variant="contained" sx={{ py: 1.4 }}>
            Save User
          </Button>
        </Box>
      </Box>
    </>
  );
};

AddUsers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default AddUsers;
