import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import moment from "moment";

const TimeSheetReportTable = (props) => {
  const { data, dates } = props;

  const getCount = (row) => {
    let count = 0;
    row.forEach((x) => {
      count += parseInt(x.count);
    });

    return count;
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Typography
        component="h1"
        variant="h4"
        sx={{ mb: 3, fontWeight: 500, fontSize: 24 }}
      ></Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              {dates.map((date) => (
                <TableCell align="center">{moment(date).format("D MMM YYYY")}</TableCell>
              ))}
              <TableCell align="center">Total Logged</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <>
                {item.map((row, index) => (
                  <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ display: "flex", alignItems: "center", fontSize: 18 }}
                    >
                      <Avatar src={row.profilePicture} sx={{ mr: 2 }} />
                      {row.fullName}
                    </TableCell>
                    {dates.map((date) => (
                      <TableCell align="center">{date === row.bucket ? row.sum : "--"}</TableCell>
                    ))}
                    <TableCell align="center">{getCount(item)}</TableCell>
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TimeSheetReportTable;
