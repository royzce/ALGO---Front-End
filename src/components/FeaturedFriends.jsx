import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import React from "react";

const itemData = [
  {
    img: "https://i.pinimg.com/originals/a7/d2/e6/a7d2e62776ce45b76a88ae2eeaf44803.jpg",
    title: "Joan Doe",
  },
  {
    img: "https://i.pinimg.com/474x/cb/33/d8/cb33d80fe655e221ae05f41c8edd0cdb.jpg",
    title: "John Doe",
  },
  {
    img: "https://i.pinimg.com/736x/65/8e/4e/658e4eef6027fe5cfbd580b21d10fc1e--male-portraits-photography-portraits.jpg",
    title: "John Doe",
  },
  {
    img: "https://i.pinimg.com/originals/9d/13/b0/9d13b0ef9e1a3bce90c3946842a8592f.jpg",
    title: "John Doe",
  },
];

const FeaturedFriends = () => {
  return (
    <Card sx={{ borderRadius: "10px" }}>
      <CardHeader
        title={
          <Typography
            variant="h5"
            fontWeight="fontWeightBold"
            // sx={{ padding: "20px" }}
          >
            Featured Friends
          </Typography>
        }
        subheader="5 friends"
        action={<Button underline="hover">See all friends</Button>}
      />
      <CardMedia sx={{ padding: "0 15px" }}>
        <ImageList cols={2} sx={{ borderRadius: "10px" }}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img src={item.img} alt={item.title} />
              <ImageListItemBar title={item.title} position="bottom" />
            </ImageListItem>
          ))}
        </ImageList>
      </CardMedia>
    </Card>
  );
};

export default FeaturedFriends;
