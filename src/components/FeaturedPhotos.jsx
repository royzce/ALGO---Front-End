import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import React from "react";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
];

const FeaturedPhotos = () => {
  return (
    <Card sx={{ borderRadius: "10px" }}>
      <CardHeader
        // sx={{ padding: "20px" }}
        title={
          <Typography
            variant="h5"
            fontWeight="fontWeightBold"
            // sx={{ padding: "20px" }}
          >
            Featured Photos
          </Typography>
        }
        action={<Button underline="hover">See all photos</Button>}
      />
      <CardMedia sx={{ padding: "0 15px" }}>
        <ImageList cols={2} rowHeight={164} sx={{ borderRadius: "10px" }}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img src={item.img} alt={item.title} />
            </ImageListItem>
          ))}
        </ImageList>
      </CardMedia>
    </Card>
  );
};

export default FeaturedPhotos;
