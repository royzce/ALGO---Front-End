import React, { useContext, useEffect, useState } from "react";
import * as postsService from "../services/post";
import {
  Card,
  CardHeader,
  CardMedia,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ProfileNavContext } from "../context/ProfileNavContext";

const PhotosPage = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    postsService.getAllPhotos().then((res) => setPhotos(res.data));
  }, []);
  const styles = {
    borderRadius: {
      borderRadius: "10px",
    },
  };
  return (
    <Card sx={styles.borderRadius}>
      <CardHeader
        title={
          <Typography variant="h5" fontWeight="fontWeightBold">
            Photos
          </Typography>
        }
      />
      <CardMedia sx={{ padding: "0 20px" }}>
        <ImageList cols={3} sx={styles.borderRadius}>
          {photos && photos.length > 0 ? (
            photos.map((media, index) => (
              <ImageListItem
                key={index}
                component={Link}
                to={`/posts/${media.postId}`}
              >
                <img src={media.mediaLink} alt={`post-${index}`} />
              </ImageListItem>
            ))
          ) : (
            <Typography variant="subtitle2">No Photos To Show</Typography>
          )}
        </ImageList>
      </CardMedia>
    </Card>
  );
};

export default PhotosPage;
