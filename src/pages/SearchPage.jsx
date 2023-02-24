import { Button, ButtonGroup, Stack } from "@mui/material";
import React, { useContext, useState } from "react";
import {
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import FriendsList from "../components/FriendsList";
import GlobalCSS from "../components/GlobalCSS";
import PostsList from "../components/PostsList";
import { PostContext } from "../context/PostContext";

const SearchPage = () => {
  const { q } = useParams();
  // return <div>My Component with query {q} </div>;

  //all, people, posts
  const [filter, setFilter] = useState({
    people: true,
    posts: true,
  });
  const navigate = useNavigate();
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
      maxWidth={"md"}
      minWidth={"xs"}
      margin={"12px auto"}
      padding={"0 12px"}
    >
      <GlobalCSS />
      <ButtonGroup>
        <Button onClick={() => navigate(`/search/all/${q}`)}>All</Button>
        <Button onClick={() => navigate(`/search/people/${q}`)}>People</Button>
        <Button onClick={() => navigate(`/search/posts/${q}`)}>Posts</Button>
      </ButtonGroup>
      <Outlet />
    </Stack>
  );
};

export default SearchPage;

//searchParams
