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
import { Delete, Edit, Visibility } from "@mui/icons-material";
import moment from "moment";

const ScheduledReportTable = (props) => {
  const { reports, deleteReport } = props;
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
          {reports.map((row) => (
            <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.reportTitle}
              </TableCell>
              <TableCell align="center">{row.team}</TableCell>
              <TableCell align="center">{row.sharePeriod}</TableCell>
              <TableCell align="center">
                {moment(row.reportPeriod.endDate).format("DD-MM-YYYY")}
              </TableCell>
              <TableCell align="center">{row.createdBy}</TableCell>
              <TableCell align="center">{row.shareWith}</TableCell>
              <TableCell align="center">
                <IconButton
                  color="secondary"
                  onClick={() => router.push(`/reports/preview/${row.id}`)}
                >
                  <Visibility />
                </IconButton>
                <IconButton
                  onClick={() => router.push(`/reports/editreport/${row.id}`)}
                  color="info"
                >
                  <Edit />
                </IconButton>
                <IconButton color="error" onClick={() => deleteReport(row.id)}>
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
