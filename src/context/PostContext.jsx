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

  // TEST
  const { currentUser: user } = useContext(UserContext);

  useEffect(() => {
    postSvc.getPosts().then((res) => {
      setAllPosts(res.data);
    });
  }, []);

  function handlePosting(completed) {
    setPosting(completed);
  }

  async function handleAddPost(newPost) {
    newPost.date = new Date();
    console.log("inside handleAddPost", newPost);
    // postSvc
    //   .addPost(newPost)
    //   .then((res) => setAllPosts([...allPosts, res.data]));
    const { data } = await getCurrentUser();
    newPost.user = data;
    newPost.comment = [];
    newPost.reactions = [];
    newPost.postId = allPosts.length + 1;
    setAllPosts([...allPosts, newPost]);

    handlePosting(false);
  }

  function handleEditPost(editedPost) {
    editedPost.date = new Date();
    console.log("inside handleEditPost", editedPost);
    // postSvc.editPost(editedPost).then((res) => {
    //   setAllPosts(
    //     allPosts.map((post) => {
    //       return post.postId === res.data.postId
    //         ? { ...post, ...res.data }
    //         : post;
    //     })
    //   );
    // });

    setAllPosts(
      allPosts.map((post) => {
        return post.postId === editedPost.postId
          ? { ...post, ...editedPost }
          : post;
      })
    );
  }

  function handleEditPrivacy() {
    // TODO
    console.log("inside handleEditPrivacy");
  }

  function handleDeletePost(postId) {
    // postSvc.deletePost(postId).then((res) => {
    //   setAllPosts(allPosts.filter((post) => post.postId !== res.data.postId));
    // });
    setAllPosts(allPosts.filter((post) => post.postId !== postId));
  }

  function handleAddReact(reaction) {
    reaction.date = new Date();
    reaction.userId = 29;
    setAllPosts(
      allPosts.map((post) => {
        return post.postId === reaction.postId
          ? { ...post, reactions: [...post.reactions, reaction] }
          : post;
      })
    );
  }

  function handleEditReact(reaction) {
    reaction.date = new Date();

    const post = allPosts.find((post) => post.postId === reaction.postId);
    const newReactions = post.reactions.map((react) => {
      return react.reactionId === reaction.reactionId
        ? { ...react, ...reaction }
        : react;
    });

    setAllPosts(
      allPosts.map((post) => {
        return post.postId === reaction.postId
          ? { ...post, reactions: [...newReactions] }
          : post;
      })
    );
  }

  function handleDeleteReact(reaction) {
    setAllPosts(
      allPosts.map((post) => {
        return post.postId === reaction.postId
          ? {
              ...post,
              reactions: post.reactions.filter(
                (react) => react.reactionId !== reaction.reactionId
              ),
            }
          : post;
      })
    );
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
        onAddReact: handleAddReact,
        onEditReact: handleEditReact,
        onDeleteReact: handleDeleteReact,
        posting,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
