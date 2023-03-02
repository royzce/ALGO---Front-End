import { Button, ButtonGroup } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { UserContext } from "../context/UserContext";
import * as userService from "../services/user";
import { PopupContext } from "../context/PopupContext";
import { async } from "q";
const UserActionButtons = ({
  username,
  userId,
  handleActionFriendList,
  handleActionDiscover,
  onDeleteRequest,
  onAcceptRequest,
}) => {
  const [isFriend, setFriend] = useState([]);
  const [isSender, setSender] = useState([]);
  const [isAcceptor, setAcceptor] = useState([]);
  const [isStranger, setStranger] = useState([]);
  const dateNow = new Date();

  const { onShowSuccess, onShowFail } = useContext(PopupContext);

  async function deleteRequest() {
    await userService
      .rejectRequest(userId)
      .then((res) => {
        onShowSuccess("Request removed.");
      })
      .catch((err) => {
        onShowFail("An unexpected error occurred. Try again later.");
      });
  }

  async function acceptRequest() {
    await userService
      .acceptRequest(userId)
      .then((res) => {
        onShowSuccess("Friend request accepted.");
      })
      .catch((err) => {
        onShowFail("An unexpected error occurred. Try again later.");
      });
  }

  useEffect(() => {
    userService.getUserStatus(username).then((status) => {
      console.log("status is", status);
      if (status.data.userStatus === "friends") {
        console.log(username, "is friends");
        setFriend(true);
        setSender(false);
        setAcceptor(false);
        setStranger(false);
      } else if (status.data.userStatus === "sender") {
        console.log(username, "is sender");
        setFriend(false);
        setSender(true);
        setAcceptor(false);
        setStranger(false);
      } else if (status.data.userStatus === "acceptor") {
        console.log(username, "is acceptor");
        setFriend(false);
        setSender(false);
        setAcceptor(true);
        setStranger(false);
      } else if (status.data.userStatus === "stranger") {
        console.log(username, "is stranger");
        setFriend(false);
        setSender(false);
        setAcceptor(false);
        setStranger(true);
      } else {
        console.log(username, "is You");
        setFriend(false);
        setSender(false);
        setAcceptor(false);
        setStranger(false);
      }
    });
  }, [username]);

  // const onRemoveFriend = async (userId) => {
  //   await userService
  //     .removeFriend(userId)
  //     .then((res) => {
  //       onShowSuccess("Removed Friend");
  //       setFriends(friends.filter((friend) => friend.userId !== friendId));
  //     })
  //     .catch((err) => {
  //       onShowFail("An unexpected error occured. Try again later.");
  //       console.log("Error", err);
  //     });
  // };
  return (
    <ButtonGroup size="small">
      {isAcceptor && (
        <Button
          variant="contained"
          onClick={() => handleActionFriendList(userId)}
        >
          cancel request
        </Button>
      )}
      {isSender && (
        <Button variant="contained" onClick={() => onAcceptRequest(userId)}>
          accept
        </Button>
      )}
      &nbsp;
      {isSender && (
        <Button variant="contained" onClick={() => onDeleteRequest(userId)}>
          delete
        </Button>
      )}
      {isFriend && (
        <Button
          variant="contained"
          onClick={() => handleActionFriendList(userId)}
        >
          unfriend
        </Button>
      )}
      {isStranger && (
        <Button
          variant="contained"
          onClick={() => handleActionDiscover(userId, dateNow)}
        >
          <PersonAddIcon />
          &nbsp;add
        </Button>
      )}
    </ButtonGroup>
  );
};

export default UserActionButtons;
