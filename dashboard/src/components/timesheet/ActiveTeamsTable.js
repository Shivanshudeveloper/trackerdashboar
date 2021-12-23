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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Arun Kartik", 159, 6.0, 24, 4.0),
  createData("Aditya Kapoor", 237, 9.0, 37, 4.3),
  createData("Akash Sharma", 262, 16.0, 24, 6.0),
  createData("Kumari Nidhi", 305, 3.7, 67, 4.3),
  createData("Kishan Kumar", 356, 16.0, 49, 3.9),
];

const ActiveTeamsTable = (props) => {
  const { teamName } = props;
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
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ display: "flex", alignItems: "center", fontSize: 18 }}
                >
                  <Avatar
                    src="https://gravallvar.se/wp-content/uploads/2017/11/person-dummy.jpg"
                    sx={{ mr: 2 }}
                  />
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.calories}</TableCell>
                <TableCell align="center">{row.fat}</TableCell>
                <TableCell align="center">{row.carbs}</TableCell>
                <TableCell align="center">{row.protein}</TableCell>
                <TableCell align="center">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ActiveTeamsTable;
