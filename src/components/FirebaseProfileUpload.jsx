import {
  Button,
  Card,
  CardMedia,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";

import { useContext } from "react";
import { RegisterContext } from "../context/RegisterContext";
import CloseIcon from "@mui/icons-material/Close";

function FirebaseImageUpload() {
  const { previewUrl, handleFileSelect, closePreview } =
    useContext(RegisterContext);

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
    >
      <div style={{ position: "relative" }}>
        <Card sx={{ borderRadius: "50%" }}>
          <CardMedia
            component="img"
            alt="Person"
            image={
              previewUrl
                ? previewUrl
                : process.env.PUBLIC_URL + "/assets/Person.png"
            }
            style={{ objectFit: "cover", width: "150px", height: "150px" }}
          />
        </Card>
        {previewUrl && (
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
        <Typography variant="body2">Upload your photo (Optional)</Typography>
        <Button size="small" variant="contained" component="label">
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleFileSelect}
          />
          Choose file
        </Button>
      </Stack>
    </Stack>
  );
}

export default FirebaseImageUpload;
