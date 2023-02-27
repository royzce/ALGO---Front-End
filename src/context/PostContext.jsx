import React, { createContext, useContext, useEffect, useState } from "react";
import * as postSvc from "../services/post";
import { getCurrentUser } from "../services/user";
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
    postSvc.getPosts().then((res) => {
      const posts = res.data.sort(compare);
      setAllPosts(posts);
    });
  }, []);

  function compare(postA, postB) {
    const timeA = new Date(postA.date).getTime();
    const timeB = new Date(postB.date).getTime();
    return (timeA - timeB) * -1;
  }

  function handlePosting(completed) {
    setPosting(completed);
  }

  async function handleAddPost(newPost) {
    newPost.date = new Date();

    const res = await postSvc.addPost(newPost);
    console.log("inside handleAddPost", res);

    const media = newPost.media
      ? newPost.media.map((url) => {
          return { mediaLink: url };
        })
      : [];

    const post = { ...res.data, media, tags: newPost.tags, user };

    setAllPosts([...allPosts, post].sort(compare));
    handlePosting(false);
  }

  async function handleEditPost(editedPost) {
    const res = await postSvc.editPost(editedPost);
    console.log("inside handleEditPost", res);
    setAllPosts(
      allPosts
        .map((post) => {
          return post.postId === res.data.postId
            ? { ...post, ...res.data }
            : post;
        })
        .sort(compare)
    );
    handlePosting(false);
  }

  async function handleDeletePost(postId) {
    const res = await postSvc.deletePost(postId);
    if (res) {
      setAllPosts(
        allPosts.filter((post) => post.postId !== postId).sort(compare)
      );
    }
  }

  return (
    <PostContext.Provider
      value={{
        allPosts,
        onAddPost: handleAddPost,
        onEditPost: handleEditPost,
        onDeletePost: handleDeletePost,
        onPosting: handlePosting,
        posting,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
