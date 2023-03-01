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
import React, { useEffect, useState } from "react";
import * as userService from "../services/user";

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
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    userService.getFriends().then((res) => {
      setFriends(res.data);
    });
  });

  const styles = {
    borderRadius: {
      borderRadius: "10px",
    },
  };

  return (
    friends && (
      <Card sx={styles.borderRadius}>
        <CardHeader
          title={
            <Typography variant="h5" fontWeight="fontWeightBold">
              Featured Friends
            </Typography>
          }
          subheader={friends.length + " Friends"}
          action={<Button underline="hover">See all friends</Button>}
        />
        <CardMedia sx={{ padding: "0 15px" }}>
          <ImageList cols={3} sx={styles.borderRadius}>
            {friends.map((item) => (
              <ImageListItem key={item.userId}>
                <img
                  src={
                    item.avatar !== null ? item.avatar : "/assets/Person.png"
                  }
                  alt={item.username}
                />
                <ImageListItemBar
                  title={item.firstName + " " + item.lastName}
                  position="bottom"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </CardMedia>
      </Card>
    )
  );
};

export default FeaturedFriends;
