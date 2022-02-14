import React, { useEffect, useState } from "react";
import { Avatar, Grid, Stack, Typography } from "@mui/material";
import { Star } from "@mui/icons-material";

const PersonInfoBar = (props) => {
  const { bgColor, pos, posFont, name, sum, total, type } = props;
  const [starArr, setStarArr] = useState([]);

  const percent = (sum / total) * 100;

  useEffect(() => {
    const arr = [];
    for (let i = pos; i <= 5; i++) {
      arr.push(i);
    }

    setStarArr(arr);
  }, [pos]);

  return (
    <Grid
      container
      sx={{ backgroundColor: `${bgColor}`, px: 2, py: 2.4, borderRadius: 2, color: "white", mt: 7 }}
    >
      <Grid item sm={2} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Typography component="h1" variant="h1" sx={{ fontSize: `${posFont}`, ml: 2 }}>
          {pos}
        </Typography>
      </Grid>
      <Grid sm={6} item sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <Typography component="h1" variant="h1">
          {name}
        </Typography>
        <Stack direction="row">
          {starArr.map((x) => (
            <Star key={x} fontSize="large" sx={{ mr: 1.3 }} />
          ))}
        </Stack>
      </Grid>
      <Grid
        sm={2}
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h1">
          {`${percent.toFixed(1)}%`}
        </Typography>
        <Typography component="h1" variant="h5">
          {type}
        </Typography>
      </Grid>
      <Grid
        sm={2}
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Avatar
          src="https://gravallvar.se/wp-content/uploads/2017/11/person-dummy.jpg"
          sx={{ width: 165, height: 165, position: "absolute", bottom: 0, right: -25 }}
        />
      </Grid>
    </Grid>
  );
};

export default PersonInfoBar;
