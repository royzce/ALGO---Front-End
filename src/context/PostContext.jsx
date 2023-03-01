import React, { createContext, useContext, useEffect, useState } from "react";
import * as postSvc from "../services/post";
import { compareByDateDesc } from "../services/util";
import { UserContext } from "./UserContext";

export const PostContext = createContext({
  allPosts: [],
  onAddPost: () => {},
  onEditPost: () => {},
  onEditPrivacy: () => {},
  onDeletePost: () => {},
  onPosting: () => {},
  posting: false,
  onAddReact: () => {},
  onEditReact: () => {},
  onDeleteReact: () => {},
});

export default function PostProvider({ children }) {
  const [allPosts, setAllPosts] = useState([]);
  const [posting, setPosting] = useState(false);

  const { currentUser: user } = useContext(UserContext);

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

  async function handleAddPost(newPost) {
    newPost.date = new Date();
    console.log("newpost", newPost);
    const res = await postSvc.addPost(newPost);
    console.log("inside handleAddPost", res);

    const media = newPost.media
      ? newPost.media.map((url) => {
          return { mediaLink: url };
        })
      : [];

    const post = { ...res.data, media, tags: newPost.tags, user };

    setAllPosts([...allPosts, post].sort(compareByDateDesc));
    handlePosting(false);
  }

  async function handleEditPost(editedPost) {
    const res = await postSvc.editPost(editedPost);
    console.log("inside handleEditPost", res);
    getAllPosts();
    handlePosting(false);
  }

  async function handleEditPrivacy(editedPost) {
    const res = await postSvc.editPrivacy(editedPost);
    console.log("inside handleEditPrivacy", res);
    getAllPosts();
    handlePosting(false);
  }

  async function handleDeletePost(postId) {
    const res = await postSvc.deletePost(postId);
    if (res) {
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
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
