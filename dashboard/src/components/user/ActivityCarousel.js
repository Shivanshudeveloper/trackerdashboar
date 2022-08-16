import React, { useEffect, useState } from "react";
import { Box, Card, CardHeader, CardContent, CardMedia, Typography } from "@mui/material";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const handleDragStart = (e) => e.preventDefault();

const responsive = {
  300: { items: 2 },
  568: { items: 2 },
  900: { items: 3 },
  1024: { items: 4 },
};

const CarouselCard = (props) => {
  const { src, duration, title } = props;

  return (
    <Card sx={{ mx: 1.25, boxShadow: 10 }} onDragStart={handleDragStart} role="presentation">
      <CardHeader sx={{ p: 2 }} title={title} />
      <CardMedia component="img" height="250" image={src} alt="Screen Shot" />
      <Typography textAlign="right" sx={{ m: 2 }} variant="h6" component="p">
        {duration} sec
      </Typography>
    </Card>
  );
};

const ActivityCarousel = (props) => {
  const { screenshots } = props;

  console.log(screenshots);

  const [ssList, setSSList] = useState([]);

  useEffect(() => {
    if (screenshots !== undefined && screenshots.length !== 0) {
      const arr = [];

      screenshots.forEach((item) => {
        const obj = {
          title: "",
          duration: 0,
          src: "",
        };

        obj.title = item.owner;
        obj.duration = item.duration;
        obj.src = item.imgName[0];

        arr.push(obj);
      });

      setSSList(arr);
    }
  }, [screenshots]);

  const items = ssList.map((item) => (
    <CarouselCard src={item.src} duration={item.duration} title={item.title} />
  ));

  return (
    <Box sx={{ mt: 2 }}>
      <AliceCarousel
        infinite
        animationDuration={3000}
        autoPlay
        mouseTracking
        items={items}
        responsive={responsive}
        controlsStrategy="alternate"
      />
    </Box>
  );
};

export default ActivityCarousel;
