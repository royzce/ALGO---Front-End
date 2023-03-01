import { List } from "@mui/material";
import React, { Fragment } from "react";
import { CommentContext } from "../context/CommentContext";
import * as postSvc from "../services/post";
import { compareByDateAsc } from "../services/util";
import AddComment from "./AddComment";
import Comment from "./Comment";

export default function CommentSection({
  show,
  onShowComments,
  post,
  setPost,
  user,
  comments,
}) {
  const onlyComments =
    comments && comments.filter((comment) => !comment.replyTo);

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
    console.log("comments", comments);
    const updatedComm = [...comments, res.data].sort(compareByDateAsc);

    setPost({ ...post, comment: updatedComm });
  }

  async function handleEditComment(editedComm) {
    console.log("edited com", editedComm);
    // TODO
    const res = await postSvc.editComment(editedComm);
    console.log("inside handleEditComment", res);

    const updatedComm = comments.map((comment) => {
      return comment.commentId === res.data.commentId
        ? { ...comment, ...res.data }
        : comment;
    });
    setPost({ ...post, comment: updatedComm });
  }

  async function handleDeleteComment(commentId) {
    // TODO
    const res = await postSvc.deleteComment(post.postId, commentId);

    console.log("inside handleDeleteComment response", res);

    // TODO: server response data has no commentId
    const updatedComm = comments.filter(
      (comment) => comment.commentId !== commentId
    );
    setPost({ ...post, comment: updatedComm });
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
