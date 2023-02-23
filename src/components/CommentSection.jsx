import { List } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { CommentContext } from "../context/CommentContext";
import * as commentSvc from "../services/comment";
import AddComment from "./AddComment";
import Comment from "./Comment";

export default function CommentSection({ show, post }) {
  const [allComments, setAllComments] = useState([]);
  const comments = allComments.filter((comment) => !comment.replyTo);

  useEffect(() => {
    if (show) {
      commentSvc.getComments(post.id).then((res) => {
        setAllComments(res.data);
        console.log("CommentSection mounting", res.data);
      });
    } else {
      setAllComments([]);
    }
  }, [show]);

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
        <List disablePadding dense={true}>
          {comments &&
            comments.map((comment) => (
              <Fragment key={comment.id}>
                <Comment
                  comment={comment}
                  replies={allComments.filter(
                    (com) => com.replyTo === comment.id
                  )}
                  reply={false}
                />
              </Fragment>
            ))}
        </List>
        <AddComment />
      </CommentContext.Provider>
    </>
  );
}
