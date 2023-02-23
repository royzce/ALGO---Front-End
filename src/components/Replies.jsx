import { List } from "@mui/material";
import React, { Fragment } from "react";
import Comment from "./Comment";

export default function Replies({ replies }) {
  return (
    <List disablePadding dense={true} sx={{ marginLeft: 5 }}>
      {replies &&
        replies.map((reply) => (
          <Fragment key={reply.id}>
            <Comment comment={reply} reply={true} />
          </Fragment>
        ))}
    </List>
  );
}
