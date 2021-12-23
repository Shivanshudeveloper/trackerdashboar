import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";

const CardComponent = (props) => {
  const { title, body, headerColor, bgColor } = props;
  return (
    <Card sx={{ mx: 2, width: 150, height: 120 }}>
      <CardHeader
        sx={{ p: 1, textAlign: "center", backgroundColor: `${headerColor}`, color: "white" }}
        title={title}
      />
      <CardContent sx={{ backgroundColor: `${bgColor}` }}>
        <Typography component="p" variant="h6" textAlign="center" sx={{ fontSize: 20 }}>
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
