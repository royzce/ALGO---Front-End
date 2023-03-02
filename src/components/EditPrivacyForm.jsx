import {
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import LockIcon from "@mui/icons-material/Lock";
import GroupIcon from "@mui/icons-material/Group";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import React from "react";

export default function EditPrivacyForm({ choice, onSelect, isRepost }) {
  return (
    <List
      subheader="Choose the audience for this post:"
      disablePadding
      dense={true}
    >
      <ListItemButton
        selected={choice === "public"}
        onClick={() => onSelect("public")}
      >
        <ListItemIcon>
          <PublicOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          primary="Public"
          secondary="Everyone on Algo can see this post."
        />
        <IconButton>
          {choice === "public" ? (
            <RadioButtonCheckedIcon />
          ) : (
            <RadioButtonUncheckedIcon />
          )}
        </IconButton>
      </ListItemButton>
      <ListItemButton
        selected={choice === "friends"}
        onClick={() => onSelect("friends")}
      >
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText
          primary="Friends"
          secondary="Your friends (and their friends) on Algo can see this post."
        />
        <IconButton>
          {choice === "friends" ? (
            <RadioButtonCheckedIcon />
          ) : (
            <RadioButtonUncheckedIcon />
          )}
        </IconButton>
      </ListItemButton>
      {!isRepost && (
        <ListItemButton
          selected={choice === "private"}
          onClick={() => onSelect("private")}
        >
          <ListItemIcon>
            <LockIcon />
          </ListItemIcon>
          <ListItemText
            primary="Private"
            secondary="Only you can see this post."
          />
          <IconButton>
            {choice === "private" ? (
              <RadioButtonCheckedIcon />
            ) : (
              <RadioButtonUncheckedIcon />
            )}
          </IconButton>
        </ListItemButton>
      )}
    </List>
  );
}
