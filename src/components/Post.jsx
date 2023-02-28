import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../context/PostContext";
import { UserContext } from "../context/UserContext";
import * as postSvc from "../services/post";
import CommentSection from "./CommentSection";
import EditPrivacy from "./EditPrivacy";
import PostActions from "./PostActions";
import PostForm from "./PostForm";
import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";
import PostStats from "./PostStats";
import RepostForm from "./RepostForm";

export default function Post({ post, page, shared }) {
  const [editPrivacy, setEditPrivacy] = useState(false);

  const [editing, setEditing] = useState(false);
  const { onEditPost, onAddPost } = useContext(PostContext);

  const { currentUser: user } = useContext(UserContext);

  const [showComments, setShowComments] = useState(false);

  const [reactions, setReactions] = useState([]);
  const reaction =
    reactions && reactions.find((react) => react.userId === user.userId);

  const [srcPost, setSrcPost] = useState(null);
  const [reposting, setReposting] = useState(false);

  useEffect(() => {
    if (post) {
      setReactions(post.reactions);
    }

    if (post && post.isRepost) {
      postSvc.getPost(post.repostId).then((res) => setSrcPost(res.data));
    }
  }, [post]);

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

  function handleEditSubmit(submitBody) {
    if (!submitBody.media) {
      submitBody.media = post.media.map((media) => media.mediaLink);
    }
    const editedPost = { ...post, ...submitBody };
    console.log("Inside handleSubmit in Post.jsx", editedPost);
    onEditPost(editedPost);
  }

  function handleRepostSubmit(submitBody) {
    console.log("Inside handleSubmit in Post.jsx", submitBody);
    onAddPost(submitBody);
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

  async function handleReact(value) {
    if (value && reaction) {
      // edit reaction
      const react = { postId: post.postId, value };
      const res = await postSvc.editReaction(react);
      console.log("inside handleReact ", res);
      setReactions(
        reactions.map((r) => {
          return r.userId === user.userId ? { ...reaction, value } : r;
        })
      );
    } else if (value && !reaction) {
      // add reaction
      const react = { postId: post.postId, value, date: new Date() };
      const res = await postSvc.addReaction(react);
      console.log("inside handleAddReact", res);
      setReactions(reactions ? [...reactions, res.data] : [res.data]);
    } else {
      // delete reaction
      const res = await postSvc.deleteReaction(post.postId);
      console.log("deleting reaction", res);
      setReactions(
        reactions.filter((react) => react.reactionId !== reaction.reactionId)
      );
    }
  }

  function handleShare() {
    // TODO
    setReposting(true);
  }

  function handleCloseRepost() {
    setReposting(false);
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
            shared={shared}
          />
          <Typography paragraph>{post.value}</Typography>
          {!page && <PostMedia post={post} srcPost={srcPost} />}
          {!shared && (
            <>
              <PostStats
                post={post}
                reactions={reactions}
                onToggleComments={handleToggleComments}
                totalReacts={post.reactions && post.reactions.length}
                totalComments={post.comment && post.comment.length}
                user={user}
              />
              <hr style={{ marginBottom: "12px" }} />
              <PostActions
                onReact={handleReact}
                reaction={reaction}
                onShare={handleShare}
                user={user}
                privacy={post && post.privacy}
              />
              <hr style={{ marginTop: "12px" }} />
              <CommentSection
                show={showComments}
                post={post}
                user={user}
                onShowComments={setShowComments}
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
          withPhoto={post && post.media.length > 0}
          onSubmit={handleEditSubmit}
        />
      )}
      {editPrivacy && (
        <EditPrivacy
          open={editPrivacy}
          onSelect={handleEditSubmit}
          onClose={handleClosePriv}
          privacy={post.privacy}
        />
      )}
      {reposting && (
        <RepostForm
          open={reposting}
          onClose={handleCloseRepost}
          srcPost={post.isRepost ? srcPost : post}
          post={post.isRepost ? post : null}
          onSubmit={handleRepostSubmit}
        />
      )}
    </>
  ) : (
    <CircularProgress />
  );
}
