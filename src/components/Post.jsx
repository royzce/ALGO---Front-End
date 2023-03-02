import { Card, CardContent, Skeleton, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../context/PostContext";
import { UserContext } from "../context/UserContext";
import * as postSvc from "../services/post";
import { compareByDateAsc } from "../services/util";
import CommentSection from "./CommentSection";
import EditPrivacy from "./EditPrivacy";
import PostActions from "./PostActions";
import PostForm from "./PostForm";
import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";
import PostStats from "./PostStats";
import ReactUserList from "./ReactUserList";
import RepostForm from "./RepostForm";
import SharesUserList from "./SharesUserList";
import TagsUserList from "./TagsUserList";

export default function Post({ post, page, shared }) {
  const [thisPost, setThisPost] = useState(null);
  const { reactions, comment, shares, isRepost, tags } = thisPost || {};

  const { currentUser: user } = useContext(UserContext);

  const reaction =
    reactions && reactions.find((react) => react.userId === user.userId);

  const [editPrivacy, setEditPrivacy] = useState(false);

  const [editing, setEditing] = useState(false);
  const editingRepost = editing && thisPost.isRepost;
  const editingPost = editing && !thisPost.isRepost;

  const { onEditPost, onEditPrivacy, onAddPost } = useContext(PostContext);

  const [showComments, setShowComments] = useState(false);
  const [showReactLi, setShowReactLi] = useState(false);
  const [showShareLi, setShowShareLi] = useState(false);
  const [showTagLi, setShowTagLi] = useState(false);

  const [srcPost, setSrcPost] = useState(null);
  // const isPostVisible = srcPost
  const [reposting, setReposting] = useState(false);

  useEffect(() => {
    if (post) {
      setThisPost(post);

      if (post.isRepost) {
        postSvc.getPost(post.repostId).then((res) => setSrcPost(res.data));
      }
    }
  }, [post]);

  function handleToggleComments() {
    setShowComments(!showComments);
  }

  function handleMenuEdit() {
    setEditing(true);
  }

  function handlePrivIcon() {
    setEditPrivacy(true);
  }

  function handleClosePriv() {
    setEditPrivacy(false);
  }

  function handleCloseEditForm() {
    setEditing(false);
  }

  function handleEditSubmit(submitBody) {
    if (!submitBody.media) {
      submitBody.media = thisPost.media.map((media) => media.mediaLink);
    }
    const editedPost = { ...thisPost, ...submitBody };
    console.log("Inside handleEditSubmit in Post.jsx", editedPost);
    onEditPost(editedPost);
  }

  function handlePrivChange(submitBody) {
    const editedPost = { ...thisPost, ...submitBody };
    console.log("Inside handlePrivChange in Post.jsx", editedPost);
    onEditPrivacy(editedPost);
  }

  function handleRepostSubmit(submitBody) {
    console.log("Inside handleRepostSubmit in Post.jsx", submitBody);
    if (editingRepost) {
      const editedPost = { ...thisPost, ...submitBody };
      onEditPost(editedPost);
    } else {
      onAddPost(submitBody);
    }
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
    let updatedReacts = [];
    if (value && reaction) {
      // edit reaction
      const react = { postId: thisPost.postId, value };
      const res = await postSvc.editReaction(react);
      console.log("inside handleReact ", res);

      updatedReacts = reactions.map((r) => {
        return r.userId === user.userId ? { ...reaction, value } : r;
      });
    } else if (value && !reaction) {
      // add reaction
      let react = { postId: thisPost.postId, value, date: new Date() };
      const res = await postSvc.addReaction(react);
      console.log("inside handleAddReact", res);
      react = { ...res.data, user };
      updatedReacts = reactions ? [...reactions, react] : [react];
    } else {
      // delete reaction
      const res = await postSvc.deleteReaction(thisPost.postId);
      console.log("deleting reaction", res);

      updatedReacts = reactions.filter(
        (react) => react.reactionId !== reaction.reactionId
      );
    }
    setThisPost({ ...thisPost, reactions: updatedReacts });
  }

  function handleShare() {
    setReposting(true);
  }

  function handleCloseRepost() {
    setReposting(false);
  }

  return thisPost ? (
    <>
      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <PostHeader
            post={thisPost}
            onMenuEdit={handleMenuEdit}
            onPrivIcon={handlePrivIcon}
            user={user}
            shared={shared}
            setShowTagLi={setShowTagLi}
          />
          <Typography paragraph>{thisPost.value}</Typography>
          {(!page || (page && isRepost)) && (
            <PostMedia post={thisPost} srcPost={srcPost} />
          )}
          {!shared && (
            <>
              <PostStats
                post={thisPost}
                reactions={reactions}
                onToggleComments={handleToggleComments}
                totalComments={comment && comment.length}
                totalShares={shares && shares.length}
                setShowReactLi={setShowReactLi}
                setShowShareLi={setShowShareLi}
                user={user}
              />
              <hr style={{ marginBottom: "12px" }} />
              <PostActions
                onReact={handleReact}
                reaction={reaction}
                onShare={handleShare}
                user={user}
                post={thisPost}
              />
              <hr style={{ marginTop: "12px" }} />
              <CommentSection
                comments={comment && comment.sort(compareByDateAsc)}
                show={showComments}
                post={thisPost}
                setPost={setThisPost}
                user={user}
                onShowComments={setShowComments}
              />
            </>
          )}
        </CardContent>
      </Card>
      {editingPost && (
        <PostForm
          post={thisPost}
          open={editingPost}
          onClose={handleCloseEditForm}
          withPhoto={thisPost && thisPost.media.length > 0}
          onSubmit={handleEditSubmit}
        />
      )}
      {editPrivacy && (
        <EditPrivacy
          post={thisPost}
          open={editPrivacy}
          onSelect={handlePrivChange}
          onClose={handleClosePriv}
        />
      )}
      {reposting && (
        <RepostForm
          open={reposting}
          onClose={handleCloseRepost}
          srcPost={thisPost.isRepost ? srcPost : thisPost}
          onSubmit={handleRepostSubmit}
        />
      )}
      {editingRepost && (
        <RepostForm
          open={editingRepost}
          onClose={handleCloseEditForm}
          srcPost={srcPost}
          post={thisPost.isRepost ? thisPost : null}
          onSubmit={handleRepostSubmit}
        />
      )}
      {showReactLi && (
        <ReactUserList
          open={showReactLi}
          onClose={() => setShowReactLi(false)}
          reactions={reactions}
        ></ReactUserList>
      )}
      {showShareLi && (
        <SharesUserList
          open={showShareLi}
          onClose={() => setShowShareLi(false)}
          shares={shares}
        >
          <Typography variant="subtitle1" fontWeight="fontWeightBold">
            People who shared this post
          </Typography>
        </SharesUserList>
      )}
      {showTagLi && (
        <TagsUserList
          open={showTagLi}
          onClose={() => setShowTagLi(false)}
          tags={tags}
        ></TagsUserList>
      )}
    </>
  ) : (
    <Skeleton animation="wave" height={50} width="100%" />
  );
}
