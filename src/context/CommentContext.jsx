import { createContext } from "react";

export const CommentContext = createContext({
  comments: [],
  handleAddComment: () => {},
  handleEditComment: () => {},
  handleDeleteComment: () => {},
});
