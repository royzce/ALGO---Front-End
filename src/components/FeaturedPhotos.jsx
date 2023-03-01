import {
  Button,
  Card,
  CardHeader,
  CardMedia,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import * as postsService from "../services/post";

const FeaturedPhotos = ({ posts }) => {
  const [photos, setPhotos] = useState([]);
  console.log("post inside featrue", posts);
  const styles = {
    borderRadius: {
      borderRadius: "10px",
    },
  };
  useEffect(() => {
    postsService.getAllPhotos().then((res) => setPhotos(res.data));
  }, [posts]);
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
        <ImageList cols={3} rows={2} sx={styles.borderRadius}>
          {photos &&
            photos.map((media, index) => (
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
