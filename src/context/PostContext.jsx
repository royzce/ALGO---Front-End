import React, { createContext, useEffect, useState } from "react";
import * as postSvc from "../services/post";

export const PostContext = createContext({
  allPosts: [],
  onAddPost: () => {},
  onEditPost: () => {},
  onEditPrivacy: () => {},
  onDeletePost: () => {},
});

export default function PostProvider({ children }) {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    postSvc.getPosts().then((res) => {
      setAllPosts(res.data);
    });
  }, []);

  function handleAddPost(newPost) {
    // TODO
    console.log("inside handleAddPost", newPost);
  }

  function handleEditPost(editedPost) {
    // TODO
    console.log("inside handleEditPost", editedPost);
  }

  function handleEditPrivacy() {
    // TODO
    console.log("inside handleEditPrivacy");
  }

  function handleDeletePost() {
    // TODO
    console.log("inside handleDeletePost");
  }

  return (
    <PostContext.Provider
      value={{
        allPosts,
        onAddPost: handleAddPost,
        onEditPost: handleEditPost,
        onEditPrivacy: handleEditPrivacy,
        onDeletePost: handleDeletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
