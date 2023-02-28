import { List } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { CommentContext } from "../context/CommentContext";
import * as postSvc from "../services/post";
import { compareByDate } from "../services/util";
import AddComment from "./AddComment";
import Comment from "./Comment";

export default function CommentSection({ show, onShowComments, post, user }) {
  const [comments, setComments] = useState([]);
  const onlyComments =
    comments && comments.filter((comment) => !comment.replyTo);

  useEffect(() => {
    if (post && post.comment) {
      setComments(post.comment.sort(compareByDate));
      console.log("CommentSection", post.comment);
    }
  }, [post]);

  async function handleAddComment({ value, replyTo }) {
    // TODO
    const newComment = {
      postId: post.postId,
      value,
      replyTo,
      isEdited: false,
      date: new Date(),
    };
    const res = await postSvc.addComment(newComment);
    console.log("inside handleAddComment", res);
    setComments([...comments, res.data].sort(compareByDate));
  }

  async function handleEditComment(editedComm) {
    // TODO
    const res = await postSvc.editComment(editedComm);
    console.log("inside handleEditComment", res);
    setComments(
      comments.map((comment) => {
        return comment.commentId === res.data.commentId
          ? { ...comment, ...res.data }
          : comment;
      })
    );
  }

  async function handleDeleteComment(commentId) {
    // TODO
    const res = await postSvc.deleteComment(post.postId, commentId);

    console.log("inside handleDeleteComment response", res);

    // TODO: server response data has no commentId
    setComments(comments.filter((comment) => comment.commentId !== commentId));
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
            {onlyComments &&
              onlyComments.map((comment) => (
                <Fragment key={comment.commentId}>
                  <Comment
                    comment={comment}
                    replies={comments.filter(
                      (com) => com.replyTo === comment.commentId
                    )}
                    reply={false}
                  />
                </Fragment>
              ))}
          </List>
        )}
        <AddComment onShowComments={onShowComments} />
      </CommentContext.Provider>
    </>
  );
}
