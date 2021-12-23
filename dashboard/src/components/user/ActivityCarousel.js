import React from "react";
import { Box, Card, CardHeader, CardContent, CardMedia, Typography } from "@mui/material";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const handleDragStart = (e) => e.preventDefault();

const responsive = {
  300: { items: 2 },
  568: { items: 2 },
  900: { items: 3 },
  1024: { items: 5 },
};

const CarouselCard = (props) => {
  const { src } = props;

  return (
    <Card sx={{ mx: 1.25 }} onDragStart={handleDragStart} role="presentation">
      <CardHeader sx={{ p: 2 }} title="App Name" />
      <CardMedia component="img" height="300" image={src} alt="Paella dish" />
      <Typography textAlign="right" sx={{ m: 2 }} variant="h6" component="p">
        Duration
      </Typography>
    </Card>
  );
};

const items = [
  <CarouselCard src="https://picsum.photos/seed/picsum/300" />,
  <CarouselCard src="https://picsum.photos/300?grayscale" />,
  <CarouselCard src="https://picsum.photos/id/237/300" />,
  <CarouselCard src="https://picsum.photos/300?grayscale" />,
  <CarouselCard src="https://picsum.photos/300?grayscale" />,
  <CarouselCard src="https://picsum.photos/id/1/367/267" />,
  <CarouselCard src="https://picsum.photos/id/1003/367/267" />,
];

const ActivityCarousel = () => {
  return (
    <Box sx={{ p: 4, mt: 4 }}>
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
