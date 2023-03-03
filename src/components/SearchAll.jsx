import React, { useContext, useEffect, useState } from "react";
import PostsList from "./PostsList";
import * as postService from "../services/post";
import * as userService from "../services/user";
import DiscoverFriends from "./DiscoverFriends";
import { useParams } from "react-router-dom";

const SearchAll = () => {
  const { q } = useParams();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    postService.getPostsByQuery(q).then((res) => {
      setPosts(res.data);
    });
    userService.getUsersBy(q).then((res) => {
      setUsers(res.data);
    });
  }, [q]);

  return (
    <>
      <DiscoverFriends users={users} />
      <PostsList posts={posts} />
    </>
  );
};

export default SearchAll;
