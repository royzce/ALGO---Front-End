import React, { useEffect, useState } from "react";
import PostsList from "./PostsList";
import * as postService from "../services/post";
import { useParams } from "react-router-dom";

const SearchPosts = () => {
  const { q } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    postService.getPostsByQuery(q).then((res) => {
      setPosts(res.data);
    });
  }, [q]);

  return (
    <>
      <PostsList posts={posts} />
    </>
  );
};

export default SearchPosts;
