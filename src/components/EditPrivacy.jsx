import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import EditPrivacyForm from "./EditPrivacyForm";

export default function EditPrivacy({ open, post, onSelect, onClose }) {
  const [choice, setChoice] = useState(null);

  useEffect(() => {
    if (post) {
      setChoice(post.privacy);
    }
  }, [post]);

  function handleSelect(choice) {
    setChoice(choice);
    onSelect({ privacy: choice });
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: "50%" }}>
        <CardHeader
          sx={{ paddingY: "8px" }}
          action={
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          }
        />
        <CardContent sx={{ paddingY: 0 }}>
          <EditPrivacyForm
            choice={choice}
            onSelect={handleSelect}
            isRepost={post && post.isRepost}
          />
        </CardContent>
      </Card>
    </Modal>
  );
}
