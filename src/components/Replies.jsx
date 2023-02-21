import { List } from "@mui/material";
import React from "react";
import AddComment from "./AddComment";
import Comment from "./Comment";

export default function Replies() {
  return (
    <List disablePadding dense={true} sx={{ marginLeft: 5 }}>
      <Comment reply={true} />
      <AddComment />
    </List>
  );
}
