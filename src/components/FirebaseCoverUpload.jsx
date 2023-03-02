import React from "react";
import { useContext } from "react";
import { RegisterContext } from "../context/RegisterContext";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Card,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

const FirebaseCoverUpload = ({
  previewProfile,
  onFileSelect,
  closePreview,
}) => {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
    >
      <div style={{ position: "relative" }}>
        <Card>
          <CardMedia
            component="img"
            alt="Person"
            image={
              previewProfile
                ? previewProfile
                : process.env.PUBLIC_URL + "/assets/cover.png"
            }
            style={{ objectFit: "cover", width: "300px", height: "200px" }}
          />
        </Card>
        {previewProfile && (
          <IconButton
            onClick={closePreview}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "#fff",
              backgroundColor: "#C0C0C0",
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </div>
      <Stack direction="column" spacing={1}>
        <Typography variant="body2">
          Upload your cover photo (Optional)
        </Typography>
        <Button size="small" variant="contained" component="label">
          <input hidden accept="image/*" type="file" onChange={onFileSelect} />
          Choose file
        </Button>
      </Stack>
    </Stack>
  );
};

export default FirebaseCoverUpload;
