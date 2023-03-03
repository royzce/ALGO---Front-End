import { CardMedia, ImageList, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "./Post";
import { Button, Skeleton } from "@mui/material";
import ColorTheme from "./ColorTheme";

export default function PostMedia({ post, srcPost }) {
  const { media } = post || {};
  const maxImages = 5;
  const [showMore, setShowMore] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (srcPost) {
      setLoading(false);
    }

    if (post) {
      if (post.media.length > 6) setImages(media.slice(0, maxImages));
      if (post.media.length <= 6) setImages(media.slice(0, maxImages + 1));
    }
  }, [post, srcPost]);

  const handleShowMore = () => {
    const remainingImages = media.slice(images.length, media.length);
    setImages([...images, ...remainingImages]);
    setShowMore(true);
  };

  const handleHide = () => {
    setImages(media.slice(0, maxImages));
    setShowMore(false);
  };

  const onLoad = () => {
    console.log("inside onLoad");
    setLoading(false);
  };

  return (
    post && (
      <>
        {post.isRepost ? (
          <Post post={srcPost} shared={true} />
        ) : (
          <ImageList
            sx={{
              width: "100%",
              maxHeight: media.length > 1 ? 460 : "auto",
              bgcolor: ColorTheme.palette.body.main,
              padding: "5px",
            }}
            cols={media.length === 1 ? 1 : media.length === 2 ? 2 : 3}
            rowHeight={164}
          >
            {images.map((media, index) => (
              <Link to={`/posts/${post.postId}/${index}`} key={index}>
                <CardMedia
                  component="img"
                  onLoad={onLoad}
                  alt={`post-${index}`}
                  image={media.mediaLink}
                  sx={{
                    objectFit: images.length > 1 ? "cover" : "cover",
                    height: images.length > 1 ? "223px" : "auto",
                  }}
                />
              </Link>
            ))}
            {media.length > 6 && !showMore && (
              <Button sx={{ fontSize: "2rem" }} onClick={handleShowMore}>
                +{media.length - maxImages}
              </Button>
            )}
            {showMore && (
              <Button sx={{ fontSize: "2rem" }} onClick={handleHide}>
                Hide
              </Button>
            )}
          </ImageList>
        )}
        {loading && (
          <Skeleton
            variant="rounded"
            animation="wave"
            height={100}
            width="100%"
          />
        )}
      </>
    )
  );
}
