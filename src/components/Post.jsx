import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../context/PostContext";
import { UserContext } from "../context/UserContext";
import CommentSection from "./CommentSection";
import EditPrivacy from "./EditPrivacy";
import PostActions from "./PostActions";
import PostForm from "./PostForm";
import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";
import PostStats from "./PostStats";

export default function Post({ post, page, shared }) {
  const [editPrivacy, setEditPrivacy] = useState(false);

  const [editing, setEditing] = useState(false);
  const { onEditPost, onAddReact, onEditReact, onDeleteReact } =
    useContext(PostContext);

  const { currentUser: user } = useContext(UserContext);

  const [showComments, setShowComments] = useState(false);

  const [reaction, setReaction] = useState(null);

  useEffect(() => {
    if (post && user) {
      const react = post.reactions.find(
        (react) => react.userId === user.userId
      );
      setReaction(react);
    }
  }, [post, user]);

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

  const styles = {
    card: {
      width: "100%",
      borderRadius: "10px",
    },
    cardContent: {
      width: "100%",
      padding: "24px",
    },
  };

  function handleReact(value) {
    console.log("inside handleReact ", value);
    if (value && reaction) {
      // edit reaction
      const react = { ...reaction, postId: post.postId, value };
      onEditReact(react);
    } else if (value && !reaction) {
      // add reaction
      const react = { postId: post.postId, value };
      onAddReact(react);
    } else {
      // delete reaction
      onDeleteReact(reaction);
      setReaction(null);
    }
  }

  function handleShare() {
    // TODO
  }

  return post ? (
    <>
      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <PostHeader
            post={post}
            onEdit={handleEdit}
            onEditPrivacy={handleEditPriv}
            user={user}
          />
          <Typography paragraph>{post.value}</Typography>
          {!page && <PostMedia post={post} />}
          {!shared && (
            <>
              <PostStats
                post={post}
                onToggleComments={handleToggleComments}
                reaction={reaction}
                totalReacts={post.reactions && post.reactions.length}
                totalComments={post.comment && post.comment.length}
              />
              <hr style={{ marginBottom: "12px" }} />
              <PostActions
                onReact={handleReact}
                reaction={reaction}
                onShare={handleShare}
              />
              <hr style={{ marginTop: "12px" }} />
              <CommentSection
                show={showComments}
                post={post}
                allComments={post.comment}
              />
            </>
          )}
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
  ) : (
    <CircularProgress />
  );
}
