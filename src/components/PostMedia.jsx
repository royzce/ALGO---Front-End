import { ImageList, ImageListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as userSvc from "../services/post";
import Post from "./Post";

export default function PostMedia({ post }) {
  const { media } = post;
  const [srcPost, setSrcPost] = useState(null);

  useEffect(() => {
    if (post && post.isRepost) {
      userSvc.getPost(post.repostId).then((res) => setSrcPost(res.data));
    }
  }, [post]);

  return (
    post && (
      <>
        {post.isRepost ? (
          <Post post={srcPost} shared={true} />
        ) : (
          media && (
            <ImageList>
              {media.map((url, index) => (
                <Link to={`/posts/${post.postId}/${index}`} key={index}>
                  <ImageListItem>
                    <img alt={`post-${index}`} src={url} />
                  </ImageListItem>
                </Link>
              ))}
            </ImageList>
          )
        )}
      </>
    )
  );
}
