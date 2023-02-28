import {
  Avatar,
  Badge,
  Box,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { blue, green, red } from "@mui/material/colors";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { getElapsedTime } from "../services/util";
import { NotifContext } from "../context/NotifContext";

export default function NotificationPanel({ notifs, onClose }) {
  //TODO: connect to Notifications API
  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useState(0);

  const { currentUser } = useContext(UserContext);

  const [mvAnchorEl, setMvAnchorEl] = useState(null);
  const isMvOpen = Boolean(mvAnchorEl);

  const { onMarkAsRead, onMarkAllAsRead } = useContext(NotifContext);

  function handleTabChange(event, newIndex) {
    setTabIndex(newIndex);
  }

  function handleNotifClick(notif) {
    onClose();
    const { notifId, type, typeId } = notif;
    if (type === "frequest") {
      console.log("TODO: navigate to friend-request");
      //   navigate(`/${currentUser.username}/friend-request`);
    } else {
      console.log("TODO: navigate to post page");
      navigate(`/posts/${typeId}`);
    }
    onMarkAsRead(notifId);
    console.log("TODO: mark the notification as read");
  }

  function handleMoreVert(event) {
    setMvAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setMvAnchorEl(null);
  }

  function handleMarkAllAsRead() {
    onMarkAllAsRead();
    handleClose();
  }

  return (
    <Box sx={{ padding: "8px 16px" }}>
      <List
        dense={true}
        subheader={
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1">Notifications</Typography>

            <Tabs value={tabIndex} onChange={handleTabChange}>
              <Tab label="All" value={0} />
              <Tab label="Unread" value={1} />

              <IconButton size="small" onClick={handleMoreVert}>
                <MoreVertIcon />
              </IconButton>
              <Menu open={isMvOpen} onClose={handleClose} anchorEl={mvAnchorEl}>
                <MenuItem onClick={handleMarkAllAsRead}>
                  Mark all as read
                </MenuItem>
              </Menu>
            </Tabs>
          </Stack>
        }
      >
        {tabIndex === 0 && (
          <NotifList notifs={notifs} onClick={handleNotifClick} />
        )}
        {tabIndex === 1 && (
          <NotifList
            notifs={notifs && notifs.filter((notif) => !notif.isRead)}
            onClick={handleNotifClick}
          />
        )}
      </List>
    </Box>
  );
}

function NotifList({ notifs, onClick }) {
  function displayNotifText(notif) {
    const { user, type, count } = notif;
    let end = "";
    switch (type) {
      case "react":
        end = "reacted to your post";
        break;
      case "comment":
        end = "commented on your post";
        break;
      case "tag":
        end = "tagged you in a post";
        break;
      case "frequest":
        end = "sent you a friend request";
        break;
      default:
        break;
    }

    return `${user.firstName} ${user.lastName} ${
      count < 2
        ? ""
        : `and ${count - 1} ${count - 1 === 1 ? `other` : `others`}`
    } ${end}.`;
  }

  function displayDate(date) {
    const display = new Date(date);
    return getElapsedTime(display);
  }

  function displayBadge(type) {
    let icon = <></>;
    let color = null;
    switch (type) {
      case "react":
        icon = <LocalFireDepartmentIcon sx={{ fontSize: "14px" }} />;
        color = red[500];
        break;
      case "comment":
        icon = <ModeCommentIcon sx={{ fontSize: "14px" }} />;
        color = green[500];
        break;
      case "tag":
        icon = <GroupAddIcon sx={{ fontSize: "14px" }} />;
        color = blue[500];
        break;
      case "frequest":
        icon = <PersonAddIcon sx={{ fontSize: "14px" }} />;
        color = blue[500];
        break;
      default:
        break;
    }
    return (
      <Avatar sx={{ width: 20, height: 20, bgcolor: color }}>{icon}</Avatar>
    );
  }

  return notifs && notifs.length > 0 ? (
    notifs.map((notif) => (
      <ListItemButton
        key={`notif-${notif.type}-${notif.typeId}-${notif.userId}`}
        onClick={() => onClick(notif)}
        selected={!notif.isRead}
      >
        <ListItemAvatar>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Avatar sx={{ width: 20, height: 20, bgcolor: red[500] }}>
                {displayBadge(notif.type)}
              </Avatar>
            }
          >
            <Avatar alt="avatar" src={notif.user.avatar} />
          </Badge>
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="body2">{displayNotifText(notif)}</Typography>
          }
          secondary={
            <Typography variant="caption">{displayDate(notif.date)}</Typography>
          }
        />
      </ListItemButton>
    ))
  ) : (
    <Typography variant="subtitle2">No new notifications</Typography>
  );
}