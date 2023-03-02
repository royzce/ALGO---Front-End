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
    const newComment = {
      postId: post.postId,
      value,
      replyTo,
      isEdited: false,
      date: new Date(),
    };
    const res = await postSvc.addComment(newComment);
    const updatedComm = [...comments, res.data].sort(compareByDateAsc);

    setPost({ ...post, comment: updatedComm });
  }

  async function handleEditComment(editedComm) {
    const res = await postSvc.editComment(editedComm);
    const updatedComm = comments.map((comment) => {
      return comment.commentId === res.data.commentId
        ? { ...comment, ...res.data }
        : comment;
    });
    setPost({ ...post, comment: updatedComm });
  }

  async function handleDeleteComment(commentId) {
    const res = await postSvc.deleteComment(post.postId, commentId);

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
          post: post,
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
