import React, { createContext, useEffect, useState } from "react";
import * as postSvc from "../services/post";

export const PostContext = createContext({
  allPosts: [],
  onAddPost: () => {},
  onEditPost: () => {},
  onEditPrivacy: () => {},
  onDeletePost: () => {},
  //   onAddComment: () => {},
  //   onEditComment: () => {},
  //   onDeleteComment: () => {},
});

export default function PostProvider({ children }) {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    postSvc.getPosts().then((res) => {
      setAllPosts(res.data);
      console.log("PostProvider mounting", res.data);
    });
    return () => console.log("PostProvider unmounting");
  }, []);

  function handleAddPost() {
    // TODO
    console.log("inside handleAddPost");
  }

  function handleEditPost() {
    // TODO
    console.log("inside handleEditPost");
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
