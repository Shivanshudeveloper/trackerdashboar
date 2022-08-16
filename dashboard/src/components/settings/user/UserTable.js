import React from "react";
import {
  Box,
  TableContainer,
  TableBody,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/router";
import { Create } from "@mui/icons-material";
import RemoveDialog from "../RemoveDialog";

const UserTable = (props) => {
  const { data } = props;
  const router = useRouter();
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, boxShadow: 10 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell align="center">User ID</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.fullName}
                </TableCell>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.role}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => router.push(`/settings/users/edituser/${row.id}`)}>
                    <Create htmlColor="green" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserTable;
