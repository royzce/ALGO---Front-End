import { Container, Grid, Stack, Typography } from "@mui/material";
import React, { Fragment, useContext } from "react";
import Post from "./Post";
import appLogo from "../assets/logo.png";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function PostsList({ posts }) {
  console.log("inside PostsList", posts);

  const { currentUser } = useContext(UserContext);
  const { username, q } = useParams();

  return posts && posts.length > 0 ? (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      {posts.map((post) => (
        <Fragment key={post.postId}>
          <Post post={post} />
        </Fragment>
      ))}
    </Grid>
  ) : (
    <>
      <Typography variant="h6">No posts to display.</Typography>
      {currentUser && (
        <Typography variant="body2">
          {q
            ? `We couldn't find any post about '${q}'.`
            : currentUser.username !== username
            ? `Add your friends to see their posts.`
            : `Go ahead and post something.`}
        </Typography>
      )}
      <img
        src={appLogo}
        className="rounded mx-auto d-block"
        style={{ height: "8vh", marginTop: "26px" }}
        alt="Algo app logo"
      />
    </>
  );
}
