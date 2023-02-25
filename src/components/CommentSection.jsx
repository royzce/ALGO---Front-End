import { List } from "@mui/material";
import React, { Fragment } from "react";
import { CommentContext } from "../context/CommentContext";
import AddComment from "./AddComment";
import Comment from "./Comment";

export default function CommentSection({ show, post, allComments }) {
  const comments = allComments.filter((comment) => !comment.replyTo);

  function handleAddComment({ value, replyTo }) {
    // TODO
    console.log("inside handleAddComment", value, replyTo);
  }

  function handleEditComment(comment) {
    // TODO
    console.log("inside handleEditComment", comment);
  }

  function handleDeleteComment(id) {
    // TODO
    console.log("inside handleDeleteComment", id);
  }

  return (
    <>
      <CommentContext.Provider
        value={{
          onAdd: handleAddComment,
          onEdit: handleEditComment,
          onDelete: handleDeleteComment,
        }}
      >
        {show && (
          <List disablePadding dense={true}>
            {comments &&
              comments.map((comment) => (
                <Fragment key={comment.commentId}>
                  <Comment
                    comment={comment}
                    replies={allComments.filter(
                      (com) => com.replyTo === comment.commentId
                    )}
                    reply={false}
                  />
                </Fragment>
              ))}
          </List>
        )}
        <AddComment />
      </CommentContext.Provider>
    </>
  );
}
