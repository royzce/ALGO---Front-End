import { Backdrop, CircularProgress } from "@mui/material";
import React, { createContext, useContext, useEffect, useState } from "react";
import * as postSvc from "../services/post";
import { compareByDateDesc } from "../services/util";
import { PopupContext } from "./PopupContext";
import { UserContext } from "./UserContext";

export const PostContext = createContext({
  allPosts: [],
  onAddPost: () => {},
  onEditPost: () => {},
  onEditPrivacy: () => {},
  onDeletePost: () => {},
  onPosting: () => {},
  posting: false,
  editing: false,
  onAddReact: () => {},
  onEditReact: () => {},
  onDeleteReact: () => {},
});

export default function PostProvider({ children }) {
  const [allPosts, setAllPosts] = useState([]);
  const [posting, setPosting] = useState(false);
  const [editing, setEditing] = useState(false);

  const { currentUser: user } = useContext(UserContext);
  const { onShowSuccess } = useContext(PopupContext);

  useEffect(() => {
    if (user) {
      getAllPosts();
    }
  }, [user]);

  async function getAllPosts() {
    const res = await postSvc.getPosts();
    const posts = res.data.sort(compareByDateDesc);
    setAllPosts(posts);
  }

  function handlePosting(completed) {
    setPosting(completed);
  }

  function handleEditing(completed) {
    setEditing(completed);
  }

  async function handleAddPost(newPost) {
    newPost.date = new Date();
    const res = await postSvc.addPost(newPost);

    getAllPosts();
    onShowSuccess("Posted!");
    handlePosting(false);
  }

  async function handleEditPost(editedPost) {
    const res = await postSvc.editPost(editedPost);
    getAllPosts();
    handleEditing(false);
  }

  async function handleEditPrivacy(editedPost) {
    const res = await postSvc.editPrivacy(editedPost);
    getAllPosts();
    handlePosting(false);
  }

  async function handleDeletePost(postId) {
    const res = await postSvc.deletePost(postId);
    if (res) {
      onShowSuccess("Post deleted.");
      setAllPosts(
        allPosts
          .filter((post) => post.postId !== postId)
          .sort(compareByDateDesc)
      );
    }
  }

  return (
    <PostContext.Provider
      value={{
        allPosts,
        onAddPost: handleAddPost,
        onEditPost: handleEditPost,
        onEditPrivacy: handleEditPrivacy,
        onDeletePost: handleDeletePost,
        onPosting: handlePosting,
        posting,
        editing,
        onEditing: handleEditing,
      }}
    >
      {children}
      {editing && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={editing}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </PostContext.Provider>
  );
}
