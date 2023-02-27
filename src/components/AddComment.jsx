import React, { useContext } from "react";
import { CommentContext } from "../context/CommentContext";
import CommentForm from "./CommentForm";

export default function AddComment({ comment, onShowComments }) {
  const { onAdd } = useContext(CommentContext);

  function handleSubmit(value) {
    if (comment) {
      onAdd({ value, replyTo: comment.commentId });
    } else {
      onAdd({ value, replyTo: 0 });
    }
    onShowComments(true);
  }

  return <CommentForm onSubmit={handleSubmit} />;
}
