import { createContext, useContext, useEffect, useState } from "react";
import * as userService from "../services/user";
import { PopupContext } from "./PopupContext";
import { UserContext } from "./UserContext";
export const FriendContext = createContext({
  allfriends: [],
  friendRequests: [],
  setAllFriends: () => {},
  onAdd: () => {},
  render: false,
});

export const FriendProvider = ({ children }) => {
  const [allFriends, setAllFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [render, setRender] = useState(false);
  const { onShowSuccess, onShowFail } = useContext(PopupContext);
  const { currentUser } = useContext(UserContext);

  function getFriendRequest() {
    userService.getFriendRequest().then((reqs) => {
      console.log("FriendProvider friend requests", reqs);
      setFriendRequests(reqs.data);
    });
  }
  const handleAdd = async (friendId, dateNow) => {
    console.log("On Add", friendId);
    await userService
      .addFriend(friendId, dateNow)
      .then((res) => {
        onShowSuccess("Friend request sent.");
        setRender(!render);
      })
      .catch((err) => {
        onShowFail("An unexpected error occurred. Try again later");
      });
  };

  async function handleAccept(friendId) {
    await userService
      .acceptRequest(friendId)
      .then((res) => {
        onShowSuccess("Friend request accepted.");
        setFriendRequests(
          friendRequests.filter((req) => req.userId !== friendId)
        );
        setRender(!render);
      })
      .catch((err) => {
        onShowFail("An unexpected error occurred. Try again later.");
      });
  }

  useEffect(() => {
    userService.getFriends().then((friends) => setAllFriends(friends.data));
    getFriendRequest();
  }, [currentUser]);

  async function handleDeleteReq(userId) {
    await userService
      .rejectRequest(userId)
      .then((res) => {
        onShowSuccess("Request removed.");
        setFriendRequests(
          friendRequests.filter((req) => req.userId !== userId)
        );
        setRender(!render);
      })
      .catch((err) => {
        onShowFail("An unexpected error occurred. Try again later.");
      });
  }

  async function handleUnfriend(friendId) {
    await userService
      .removeFriend(friendId)
      .then((res) => {
        onShowSuccess("Removed Friend");
        setAllFriends(
          allFriends.filter((friend) => friend.userId !== friendId)
        );
        setRender(!render);
      })
      .catch((err) => {
        onShowFail("An unexpected error occured. Try again later.");
        console.log("Error", err);
      });
  }

  async function handleCancelReq(userId) {
    handleUnfriend(userId);
  }

  return (
    <FriendContext.Provider
      value={{
        allFriends,
        friendRequests,
        setFriendRequests,
        setAllFriends: setAllFriends,
        onAdd: handleAdd,
        render,
        onAccept: handleAccept,
        onDeleteRequest: handleDeleteReq,
        onUnfriend: handleUnfriend,
        onCancelRequest: handleCancelReq,
      }}
    >
      {children}
    </FriendContext.Provider>
  );
};
