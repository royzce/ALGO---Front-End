import { CardMedia, ImageList } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Post from "./Post";
import { Button, Skeleton } from "@mui/material";

export default function PostMedia({ post, srcPost }) {
  const { media } = post;
  const maxImages = 5;
  const [showMore, setShowMore] = useState(false);
  const [images, setImages] = useState(media.slice(0, maxImages));

  const handleShowMore = () => {
    const remainingImages = media.slice(images.length, media.length);
    setImages([...images, ...remainingImages]);
    setShowMore(true);
  };

  const handleHide = () => {
    setImages(media.slice(0, maxImages));
    setShowMore(false);
  };

  return (
    post && (
      <>
        {post.isRepost ? (
          <Post post={srcPost} shared={true} />
        ) : media ? (
          <ImageList
            sx={{ width: "100%", height: 450 }}
            cols={3}
            rowHeight={164}
          >
            {images.map((media, index) => (
              <Link to={`/posts/${post.postId}/${index}`} key={index}>
                <CardMedia
                  component="img"
                  alt={`post-${index}`}
                  image={media.mediaLink}
                  sx={{
                    objectFit: "cover",
                    height: "223px",
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
        ) : (
          <Skeleton animation="wave" height={50} width="100%" />
        )}
      </>
    )
  );
}
