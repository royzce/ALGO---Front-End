import fireimg from "../assets/fireimg.png";
import hahaimg from "../assets/hahaimg.png";
import madimg from "../assets/madimg.png";
import brokenimg from "../assets/brokenimg.png";
import trashimg from "../assets/trashimg.png";
import fire from "../assets/fire.gif";
import haha from "../assets/haha.gif";
import trash from "../assets/trash.gif";
import broken from "../assets/broken.gif";
import mad from "../assets/mad.gif";

import { http } from "./http";

export function getPosts() {
  return http.get("/posts");
}

export function getPost(postId) {
  return http.get(`/posts/${postId}`);
}

export function addPost(newPost) {
  return http.post("/posts", newPost);
}

export function editPost(editedPost) {
  return http.put(`/posts/${editedPost.postId}/edit`, editedPost);
}

export function editPrivacy(editedPost) {
  return http.put(`/posts/${editedPost.postId}/editPrivacy`, {
    privacy: editedPost.privacy,
  });
}

export function deletePost(postId) {
  return http.delete(`/posts/${postId}`);
}

export function addReaction(reaction) {
  return http.post("/reactions", reaction);
}

export function editReaction(reaction) {
  return http.put(`/reactions`, reaction);
}

export function deleteReaction(postId) {
  console.log("delete service", postId);
  return http.delete(`/reactions`, { data: { postId: postId } });
}

export function addComment(newComment) {
  return http.post(`/posts/${newComment.postId}/comments`, newComment);
}

export function editComment(editedComm) {
  return http.put(
    `/posts/${editedComm.postId}/comments/${editedComm.commentId}/edit`,
    { value: editedComm.value }
  );
}

export function deleteComment(postId, commentId) {
  return http.delete(`/posts/${postId}/comments/${commentId}`);
}

export function getAllPhotos() {
  return http.get("/profiles/photos");
}
export const REACTIONS = [
  { text: "fire", img: fireimg, gif: fire },
  { text: "broken", img: brokenimg, gif: broken },
  { text: "trash", img: trashimg, gif: trash },
  { text: "haha", img: hahaimg, gif: haha },
  { text: "mad", img: madimg, gif: mad },
];
