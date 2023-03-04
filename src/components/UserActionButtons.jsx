import { Button, ButtonGroup } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import * as userService from "../services/user";
import { FriendContext } from "../context/FriendContext";
const UserActionButtons = ({ username, userId }) => {
  const [isFriend, setFriend] = useState(false);
  const [isSender, setSender] = useState(false);
  const [isAcceptor, setAcceptor] = useState(false);
  const [isStranger, setStranger] = useState(false);
  const dateNow = new Date();

  const {
    onAdd,
    onAccept,
    onDeleteRequest,
    onUnfriend,
    onCancelRequest,
    render,
  } = useContext(FriendContext);

  useEffect(() => {
    userService.getUserStatus(username).then((status) => {
      if (status.data.userStatus === "friends") {
        setFriend(true);
        setSender(false);
        setAcceptor(false);
        setStranger(false);
      } else if (status.data.userStatus === "sender") {
        setFriend(false);
        setSender(true);
        setAcceptor(false);
        setStranger(false);
      } else if (status.data.userStatus === "acceptor") {
        setFriend(false);
        setSender(false);
        setAcceptor(true);
        setStranger(false);
      } else if (status.data.userStatus === "stranger") {
        setFriend(false);
        setSender(false);
        setAcceptor(false);
        setStranger(true);
      } else {
        setFriend(false);
        setSender(false);
        setAcceptor(false);
        setStranger(false);
      }
    });
  }, [render, username]);

  return (
    <ButtonGroup size="small">
      {isAcceptor && (
        <Button variant="contained" onClick={() => onCancelRequest(userId)}>
          cancel request
        </Button>
      )}
      {isSender && (
        <Button variant="contained" onClick={() => onAccept(userId)}>
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
        <Button variant="contained" onClick={() => onUnfriend(userId)}>
          unfriend
        </Button>
      )}
      {isStranger && (
        <Button variant="contained" onClick={() => onAdd(userId, dateNow)}>
          <PersonAddIcon />
          &nbsp;add
        </Button>
      )}
    </ButtonGroup>
  );
};

export default UserActionButtons;
