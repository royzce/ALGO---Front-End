import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

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
  const [profileId, allPosts] = useOutletContext();
  const styles = {
    borderRadius: {
      borderRadius: "10px",
    },
  };

  useEffect(() => {
    // console.log(allPosts);
    //TODO: filter out all user post
  });

  return (
    <Card sx={styles.borderRadius}>
      <CardHeader
        title={
          <Typography variant="h5" fontWeight="fontWeightBold">
            Recent Photos
          </Typography>
        }
        action={<Button underline="hover">See all photos</Button>}
      />
      <CardMedia sx={{ padding: "0 15px" }}>
        <ImageList cols={3} sx={styles.borderRadius}>
          {allPosts.map((media, index) => (
            <ImageListItem key={index}>
              <img src={media.mediaLink} alt={`post-${index}`} />
            </ImageListItem>
          ))}
        </ImageList>
      </CardMedia>
    </Card>
  );
};

export default FeaturedPhotos;
