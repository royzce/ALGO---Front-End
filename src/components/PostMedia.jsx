import { ImageList, ImageListItem, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as userSvc from "../services/post";
import Post from "./Post";

export default function PostMedia({ post, srcPost }) {
  const { media } = post;

  return (
    post &&
    (post.isRepost ? (
      <Post post={srcPost} shared={true} />
    ) : media ? (
      <ImageList>
        {media.map((media, index) => (
          <Link to={`/posts/${post.postId}/${index}`} key={index}>
            <ImageListItem>
              <img alt={`post-${index}`} src={media.mediaLink} />
            </ImageListItem>
          </Link>
        ))}
      </ImageList>
    ) : (
      <Skeleton animation="wave" height={50} width="100%" />
    ))
  );
}
