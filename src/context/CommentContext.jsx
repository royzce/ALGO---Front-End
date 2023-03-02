import { createContext } from "react";

export const CommentContext = createContext({
  comments: [],
  post: {},
  handleAddComment: () => {},
  handleEditComment: () => {},
  handleDeleteComment: () => {},
});
