import { createContext, useEffect, useState } from "react";
import * as userService from "../services/user";
export const FriendContext = createContext({
  allfriends: [],
  setAllFriends: () => {},
});

export const FriendProvider = ({ children }) => {
  const [allFriends, setAllFriends] = useState([]);

  useEffect(() => {
    userService
      .getFriends()
      .then((friends) => console.log("friends from context", friends));
  }, []);

  return (
    <FriendContext.Provider
      value={{ allFriends, setAllFriends: setAllFriends }}
    >
      {children}
    </FriendContext.Provider>
  );
};
