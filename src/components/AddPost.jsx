import {
  Avatar,
  Card,
  CardContent,
  IconButton,
  TextField,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Stack } from "@mui/system";
import React from "react";

export default function AddPost() {
  return (
    <Card>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            alt="prof-pic"
            src="https://i.pinimg.com/originals/f9/a0/b4/f9a0b4f86ab0226ec83dfff20c08ba78.jpg"
          />
          <TextField placeholder="Say something, Johnny." fullWidth />
          <IconButton>
            <AddPhotoAlternateIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
