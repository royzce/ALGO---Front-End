import {
  Tabs,
  Tab,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { REACTIONS } from "../services/post";
import UserList from "./UserList";
import { Stack } from "@mui/system";

export default function ReactUserList({ open, onClose, reactions }) {
  const [tab, setTab] = useState(reactions && reactions[0].value);

  function handleTabChange(event, newIndex) {
    setTab(newIndex);
  }

  const styles = {
    modal: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    card: {
      width: "50%",
      maxHeight: "90%",
      overflowY: "scroll",
      borderRadius: "10px",
      padding: "10px",
    },
  };

  return (
    <Modal open={open} onClose={onClose} sx={styles.modal}>
      <Card sx={styles.card}>
        <CardHeader
          title={
            <Typography variant="subtitle1" fontWeight="fontWeightBold">
              People who reacted to this post
            </Typography>
          }
          action={
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent sx={{ paddingY: 0 }}>
          <Tabs value={tab} onChange={handleTabChange}>
            {REACTIONS.map((react) => {
              const exists = reactions.find(
                (reaction) => reaction.value === react.text
              );

              const count = reactions.filter(
                (reaction) => reaction.value === react.text
              ).length;

              if (exists) {
                return (
                  <Tab
                    key={react.text}
                    label={
                      <Stack
                        direction="row"
                        alignItems="flex-start"
                        spacing={1}
                      >
                        <img src={react.gif} height={20} />{" "}
                        <Typography variant="button">{count}</Typography>
                      </Stack>
                    }
                    value={react.text}
                  />
                );
              }
              return;
            })}
          </Tabs>

          {REACTIONS.map(
            (react) =>
              tab === react.text && (
                <UserList
                  list={
                    reactions &&
                    reactions.filter(
                      (reaction) => reaction.value === react.text
                    )
                  }
                />
              )
          )}
        </CardContent>
      </Card>
    </Modal>
  );
}
