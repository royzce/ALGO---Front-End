import { createContext, useContext, useEffect, useState } from "react";
import * as usersService from "../services/user";

export const UserActionsContext = createContext({});

export const UserActionsProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [pendingFriends, setPendingFriends] = useState([]);
  const [nonFriends, setNonFriends] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  // useEffect(() => {
  //   if (currentUser) {

  //     let nonFriend = usersService.getNonFriend().then((nonFriend) => {
  //       console.log("non friends R ", nonFriend);
  //       setNonFriends(nonFriend);
  //     });

  //     usersService.getOnlyFriend().then((friend) => {
  //       console.log("current user friend is", friend);
  //     });
  //   }
  // }, [currentUser]);

  function handleCurrentUser(user) {
    setCurrentUser(user);
  }

  return (
    <UserActionsContext.Provider value={{ onCurrentUser: handleCurrentUser }}>
      {children}
    </UserActionsContext.Provider>
  );
};
