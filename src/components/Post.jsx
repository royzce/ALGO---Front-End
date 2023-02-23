import { Card, CardContent, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { PostContext } from "../context/PostContext";
import * as commentSvc from "../services/comment";
import CommentSection from "./CommentSection";
import EditPrivacy from "./EditPrivacy";
import PostActions from "./PostActions";
import PostForm from "./PostForm";
import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";
import PostReactions from "./PostReactions";
import PostStats from "./PostStats";

export default function Post({ post }) {
  const [showComments, setShowComments] = useState(false);
  const [editPrivacy, setEditPrivacy] = useState(false);
  const [editing, setEditing] = useState(false);
  const { onEditPost } = useContext(PostContext);

  function handleToggleComments() {
    setShowComments(!showComments);
  }

  function handleEdit() {
    setEditing(true);
  }

  function handleEditPriv() {
    setEditPrivacy(true);
  }

  function handleClosePriv() {
    setEditPrivacy(false);
  }

  function handleCloseEdit() {
    setEditing(false);
  }

  function handleSubmit(editDetails) {
    const editedPost = { ...post, ...editDetails };
    onEditPost(editedPost);
  }

  return (
    <>
      <Card sx={{ width: "100%", borderRadius: "10px" }}>
        <CardContent sx={{ width: "100%", padding: "24px" }}>
          <PostHeader
            post={post}
            onEdit={handleEdit}
            onEditPrivacy={handleEditPriv}
          />
          <Typography paragraph>{post.value}</Typography>
          <PostMedia post={post} />
          {/**
         TODO: for implementation once users are available and the reactions
        are decided
         */}
          <PostStats post={post} onToggleComments={handleToggleComments} />
          {/**
           * TODO: for implementation once the reactions are decided
           */}
          {/* <PostReactions post={post} /> */}
          <hr style={{ marginBottom: "12px" }} />
          <PostActions post={post} />
          <hr style={{ marginTop: "12px" }} />
          <CommentSection show={showComments} post={post} />
        </CardContent>
      </Card>
      {editing && (
        <PostForm
          post={post}
          open={editing}
          onClose={handleCloseEdit}
          withPhoto={post.imgUrl.length > 0}
          onSubmit={handleSubmit}
        />
      )}
      {editPrivacy && (
        <EditPrivacy
          open={editPrivacy}
          onSelect={handleSubmit}
          onClose={handleClosePriv}
          privacy={post.privacy}
        />
      )}
    </>
  );
}
