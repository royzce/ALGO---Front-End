import React, { useContext } from "react";
import { PostContext } from "../context/PostContext";
import PostsList from "./PostsList";

const SearchPosts = () => {
  const { allPosts } = useContext(PostContext);
  return <PostsList posts={allPosts} />;
};

export default SearchPosts;
