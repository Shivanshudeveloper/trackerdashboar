import React from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { Share } from "@mui/icons-material";

function createData(title, details, period, sharedOn, sharedWith) {
  return { title, details, period, sharedOn, sharedWith };
}

const rows = [
  createData("Monthly Productivity Report", "IT Team", "Monthly", "3.12.2021", "All"),
  createData("Daily Activity Report", "Design Team", "Daily", "2.12.2021", "Arun Kartik"),
  createData("Daily Activity Report", "Design Team", "Daily", "17.12.2021", "Arun Kartik"),
];

const ScheduledReportTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Report Title</TableCell>
            <TableCell align="center">Details</TableCell>
            <TableCell align="center">Period</TableCell>
            <TableCell align="center">Shared On</TableCell>
            <TableCell align="center">Shared With</TableCell>
            <TableCell align="center">Export</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="center">{row.details}</TableCell>
              <TableCell align="center">{row.period}</TableCell>
              <TableCell align="center">{row.sharedOn}</TableCell>
              <TableCell align="center">{row.sharedWith}</TableCell>
              <TableCell align="center">
                <IconButton color="info">
                  <Share />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ScheduledReportTable;
