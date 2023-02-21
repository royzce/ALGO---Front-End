import { List } from "@mui/material";
import React from "react";
import AddComment from "./AddComment";
import Comment from "./Comment";

export default function CommentSection() {
  return (
    <>
      <List disablePadding dense={true}>
        <Comment reply={false} />
      </List>
      <AddComment />
    </>
  );
}
