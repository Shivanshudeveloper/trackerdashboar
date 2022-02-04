import React from "react";
import { useRouter } from "next/router";
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
import { Delete, Edit } from "@mui/icons-material";

function createData(title, details, period, next, createdBy, shared) {
  return { title, details, period, next, createdBy, shared };
}

const rows = [
  createData(
    "Monthly Productivity Report",
    "IT Team",
    "Monthly",
    "30.12.2021",
    "Arun Kartik",
    "All"
  ),
  createData(
    "Daily Activity Report",
    "Design Team",
    "Daily",
    "26.12.2021",
    "Arun Kartik",
    "Arun Kartik"
  ),
];

const ScheduledReportTable = () => {
  const router = useRouter();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Report Title</TableCell>
            <TableCell align="center">Details</TableCell>
            <TableCell align="center">Period</TableCell>
            <TableCell align="center">Next Scheduled Date</TableCell>
            <TableCell align="center">Created By</TableCell>
            <TableCell align="center">Shared With</TableCell>
            <TableCell align="center">Edit / Delete</TableCell>
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
              <TableCell align="center">{row.next}</TableCell>
              <TableCell align="center">{row.createdBy}</TableCell>
              <TableCell align="center">{row.shared}</TableCell>
              <TableCell align="center">
                <IconButton onClick={() => router.push("/reports/createreport")} color="info">
                  <Edit />
                </IconButton>
                <IconButton color="error">
                  <Delete />
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
