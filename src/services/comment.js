import { http } from "./http";

export function getComments(postId) {
  return http.get(`/comments?postId=${postId}`);
}
