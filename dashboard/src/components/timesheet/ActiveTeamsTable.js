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

const Rows = (props) => {
  const { data } = props;
  const { activeData } = data;
  let totalCount = 0;

  activeData.forEach((x) => {
    totalCount += parseInt(x.count);
  });

  const tempLength = 4 - activeData.length;

  let tempArr = [1, 2, 3, 4];
  tempArr = tempArr.slice(0, tempLength);

  return (
    <TableRow key={data.fullName} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell
        component="th"
        scope="row"
        sx={{ display: "flex", alignItems: "center", fontSize: 18 }}
      >
        <Avatar
          src="https://gravallvar.se/wp-content/uploads/2017/11/person-dummy.jpg"
          sx={{ mr: 2 }}
        />

        {data.fullName}
      </TableCell>
      {data.activeData.map((x, index) => (
        <TableCell align="center" key={x.bucket}>
          {x.sum}
        </TableCell>
      ))}
      {tempArr.map((x) => (
        <TableCell align="center" key={x}>
          --
        </TableCell>
      ))}
      <TableCell align="center">{totalCount}</TableCell>
    </TableRow>
  );
};

const ActiveTeamsTable = (props) => {
  const { data } = props;
  const teamName = data[0].team;

  return (
    <Box sx={{ mt: 5 }}>
      <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 500, fontSize: 24 }}>
        {teamName}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Week 1</TableCell>
              <TableCell align="center">Week 2</TableCell>
              <TableCell align="center">Week 3</TableCell>
              <TableCell align="center">Week 4</TableCell>
              <TableCell align="center">Total Logged</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <Rows data={row} key={row.fullName} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ActiveTeamsTable;
