import React, { useEffect, useState } from "react";
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

const ProductiveTeamsTable = (props) => {
  const { data, dates } = props;
  const [rowData, setRowData] = useState([]);

  const getCount = (row) => {
    let count = 0;
    row.forEach((x) => {
      count += parseInt(x.count);
    });

    return count;
  };

  useEffect(() => {
    const arr = [];

    data.map((item) => {
      const obj = {};

      for (let date of dates) {
        obj[date] = "--";
      }

      item.productiveData.map((row) => {
        dates.map((date) => {
          if (new Date(row.bucket).getDate() == new Date(date).getDate()) {
            obj[date] = row.sum;
          }
        });
      });
      arr.push(Object.values(obj));
    });

    setRowData(arr);
  }, [data, dates]);

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
            {data.map((item, index) => (
              <TableRow
                key={item.fullName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ display: "flex", alignItems: "center", fontSize: 18 }}
                >
                  <Avatar src={item.profilePicture} sx={{ mr: 2 }} />
                  {item.fullName}
                </TableCell>
                {rowData.length !== 0 && (
                  <>
                    {rowData[index].map((x) => (
                      <TableCell align="center">{x}</TableCell>
                    ))}
                  </>
                )}
                <TableCell align="center">{getCount(item.productiveData)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProductiveTeamsTable;
