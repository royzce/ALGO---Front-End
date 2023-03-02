import { createContext, useContext, useEffect, useState } from "react";
import * as userService from "../services/user";
import { PopupContext } from "./PopupContext";
export const FriendContext = createContext({
  allfriends: [],
  friendRequests: [],
  setAllFriends: () => {},
  onAdd: () => {},
});

export const FriendProvider = ({ children }) => {
  const [allFriends, setAllFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const dateNow = new Date();
  const { onShowSuccess, onShowFail } = useContext(PopupContext);

  function getFriendRequest() {
    userService.getFriendRequest().then((reqs) => {
      console.log("reqs are", reqs);
      setFriendRequests(reqs.data);
    });
  }
  const onAdd = async (friendId, dateNow) => {
    console.log("On Add", friendId);
    await userService
      .addFriend(friendId, dateNow)
      .then((res) => {
        onShowSuccess("Friend request sent.");
        getFriendRequest();
      })
      .catch((err) => {
        onShowFail("An unexpected error occurred. Try again later");
      });
  };

  useEffect(() => {
    userService.getFriends().then((friends) => setAllFriends(friends.data));
    getFriendRequest();
  }, []);

  return (
    <FriendContext.Provider
      value={{
        allFriends,
        friendRequests,
        setAllFriends: setAllFriends,
        onAdd: onAdd,
      }}
    >
      {children}
    </FriendContext.Provider>
  );
};
