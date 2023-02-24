import React, { useContext } from "react";
import { PostContext } from "../context/PostContext";
import FriendsList from "./FriendsList";
import PostsList from "./PostsList";

const SearchAll = () => {
  const { allPosts } = useContext(PostContext);
  return (
    <>
      <FriendsList />
      <PostsList posts={allPosts} />
    </>
  );
};

export default SearchAll;
