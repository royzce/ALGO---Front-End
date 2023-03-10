import React, { useEffect, useState } from "react";
import * as postsService from "../services/post";
import {
  Card,
  CardHeader,
  CardMedia,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";

const PhotosPage = () => {
  const [photos, setPhotos] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    if (username) {
      postsService
        .getAllPhotos(username)
        .then((res) => setPhotos(res.data.media));
    }
  }, [username]);
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
