import { http } from "./http";

export function getPosts() {
  return http.get("/posts");
}

export function getPost(id) {
  return http.get(`/posts/${id}`);
}
