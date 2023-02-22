import { ImageList, ImageListItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function PostMedia({ post }) {
  const { imgUrl } = post;
  return (
    <ImageList>
      {imgUrl.map((url, index) => (
        <Link to={`/posts/1/${index}`} key={index}>
          <ImageListItem>
            <img alt={`post-pic-${index}`} src={url} />
          </ImageListItem>
        </Link>
      ))}
    </ImageList>
  );
}
