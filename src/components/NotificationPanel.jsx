import {
  Avatar,
  Badge,
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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { getElapsedTime } from "../services/util";
import { NotifContext } from "../context/NotifContext";
import ColorTheme from "../components/ColorTheme";
import { useTheme } from "@mui/material/styles";

export default function NotificationPanel({ notifs, onClose }) {
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
    if (type === "requestFriend") {
      navigate(`/${currentUser.username}/friend-request`);
    } else {
      navigate(`/posts/${typeId}`);
    }
    onMarkAsRead(notifId);
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

  function MenuNotifPanel() {
    return (
      <Menu
        open={isMvOpen}
        onClose={handleClose}
        anchorEl={mvAnchorEl}
        PaperProps={{
          sx: {
            overflow: "visible",
            borderRadius: "10px",
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 12,
              width: 10,
              height: 10,
              bgcolor: theme.palette.mode === "dark" ? "#2F2F2F" : "#FFFFFF",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleMarkAllAsRead}>Mark all as read</MenuItem>
      </Menu>
    );
  }

  const theme = useTheme();
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="fontWeightBold" marginLeft="20px">
          Notifications
        </Typography>

        <Stack direction="row">
          <Tabs value={tabIndex} onChange={handleTabChange}>
            <Tab label="All" value={0} />
            <Tab label="Unread" value={1} />
          </Tabs>
          <IconButton size="small" onClick={handleMoreVert}>
            <MoreVertIcon />
          </IconButton>
          <MenuNotifPanel />
        </Stack>
      </Stack>
      <List
        sx={{ maxHeight: "300px", width: "450px", overflowY: "auto" }}
        dense={true}
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
    </>
  );
}

function NotifList({ notifs, onClick }) {
  function displayNotifText(notif) {
    const { from, type, count } = notif;
    let end = "";
    switch (type) {
      case "reaction":
        end = "reacted to your post";
        break;
      case "comments":
        end = "commented on your post";
        break;
      case "tag":
        end = "tagged you in a post";
        break;
      case "share":
        end = "shared your post";
        break;
      case "requestFriend":
        end = "sent you a friend request";
        break;
      default:
        break;
    }

    return (
      <>
        <Typography variant="inherit" component="span">
          <strong>
            {from.firstName} {from.lastName}
          </strong>
          {count < 2 ? (
            ""
          ) : (
            <span>
              {" "}
              and{" "}
              <strong>
                {count - 1} {count - 1 === 1 ? `other` : `others`}
              </strong>{" "}
            </span>
          )}{" "}
          {end}.
        </Typography>
      </>
    );
  }

  function displayDate(date) {
    const display = new Date(date);
    return getElapsedTime(display);
  }

  function displayBadge(type) {
    let icon = <></>;
    switch (type) {
      case "reaction":
        icon = (
          <i
            className="fa-solid fa-fire text-white"
            style={{ fontSize: "10px" }}
          />
        );
        break;
      case "comments":
        icon = (
          <i
            className="fa-solid fa-comment text-white"
            style={{ fontSize: "10px" }}
          />
        );
        break;
      case "tag":
        icon = <i className="fa-solid fa-user-tag text-white" />;
        break;
      case "share":
        icon = (
          <i
            className="fa-solid fa-share text-white"
            style={{ fontSize: "10px" }}
          />
        );
        break;
      case "requestFriend":
        icon = (
          <i
            className="fa-solid fa-user-plus text-white"
            style={{ fontSize: "10px" }}
          />
        );
        break;
      default:
        break;
    }
    return icon;
  }
  function badgeColor(type) {
    let color = null;
    switch (type) {
      case "reaction":
        color = ColorTheme.palette.error.main;
        break;
      case "comments":
        color = ColorTheme.palette.success.main;
        break;
      case "tag":
        color = ColorTheme.palette.primary.main;
        break;
      case "share":
        color = ColorTheme.palette.success.main;
        break;
      case "requestFriend":
        color = ColorTheme.palette.primary.main;
        break;
      default:
        break;
    }
    return color;
  }

  return notifs && notifs.length > 0 ? (
    notifs.map((notif) => (
      <ListItemButton
        key={notif.notifId}
        onClick={() => onClick(notif)}
        selected={!notif.isRead}
      >
        <ListItemAvatar>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <Avatar
                sx={{ bgcolor: badgeColor(notif.type), width: 20, height: 20 }}
              >
                {displayBadge(notif.type)}
              </Avatar>
            }
            // color={badgeColor(notif.type)}
          >
            <Avatar alt="avatar" src={notif.from.avatar} />
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
    <Typography variant="subtitle2" sx={{ padding: "20px", width: "450px" }}>
      No new notifications
    </Typography>
  );
}
