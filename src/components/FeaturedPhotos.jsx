import {
  Button,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import * as postsService from "../services/post";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const FeaturedPhotos = ({ posts, profileName }) => {
  const [photos, setPhotos] = useState([]);
  const { currentUser } = useContext(UserContext);
  const showButton =
    photos &&
    photos.length > 0 &&
    currentUser &&
    currentUser.username === profileName;

  const styles = {
    borderRadius: {
      borderRadius: "10px",
    },
  };
  useEffect(() => {
    if (profileName) {
      postsService.getAllPhotos(profileName).then((res) => {
        setPhotos(
          res.data.media.sort(
            (mediaA, mediaB) => -1 * (mediaA.mediaId - mediaB.mediaId)
          )
        );
      });
    }
  }, [posts, profileName]);

  return (
    <Card sx={styles.borderRadius}>
      <CardHeader
        title={
          <Typography variant="h5" fontWeight="fontWeightBold">
            Recent Photos
          </Typography>
        }
        action={
          showButton && (
            <Button
              underline="hover"
              LinkComponent={Link}
              to={`/${profileName}/photos`}
            >
              See all photos
            </Button>
          )
        }
      />
      <CardMedia sx={{ padding: "0 15px" }}>
        <ImageList cols={3} rows={2} sx={styles.borderRadius}>
          {photos && photos.length > 0 ? (
            photos.slice(0, 6).map((media, index) => (
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

export default FeaturedPhotos;
