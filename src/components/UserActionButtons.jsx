import { Button, ButtonGroup } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { UserContext } from "../context/UserContext";
import * as userService from "../services/user";
const UserActionButtons = ({ username }) => {
  const [isFriend, setFriend] = useState([]);
  const [isSender, setSender] = useState([]);
  const [isAcceptor, setAcceptor] = useState([]);
  const [isStranger, setStranger] = useState([]);
  // const [cancleButton, setCancelButton] = useState(false);
  // const [confirmButton, setConfirmButton] = useState(false);
  // const [deleteButton, setDeleteButton] = useState(false);
  // const [unfriendButton, setUnfriendButton] = useState(false);
  // const [addButton, setAddButton] = useState(false);

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
  }, [username]);

  return (
    <ButtonGroup size="small">
      {isAcceptor && <Button variant="contained">cancel request</Button>}
      {isSender && <Button variant="contained">accept</Button>}
      &nbsp;
      {isSender && <Button variant="contained">delete</Button>}
      {isFriend && <Button variant="contained">unfriend</Button>}
      {isStranger && (
        <Button variant="contained">
          <PersonAddIcon />
          &nbsp;add
        </Button>
      )}
    </ButtonGroup>
  );
};

export default UserActionButtons;
