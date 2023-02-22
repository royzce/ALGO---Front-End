import React, { useContext } from "react";
import { CommentContext } from "../context/CommentContext";
import CommentForm from "./CommentForm";

export default function AddComment({ comment }) {
  const { onAdd } = useContext(CommentContext);

  function handleSubmit(value) {
    if (comment) {
      onAdd({ value, replyTo: comment.id });
    } else {
      onAdd({ value, replyTo: null });
    }
  }

  return <CommentForm onSubmit={handleSubmit} />;
}
