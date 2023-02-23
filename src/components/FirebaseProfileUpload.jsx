import { Button, Card, CardMedia, Typography, Stack } from "@mui/material";

import { useContext } from "react";
import { RegisterContext } from "../context/RegisterContext";

function FirebaseImageUpload() {
  const { previewUrl, handleFileSelect } = useContext(RegisterContext);

  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
    >
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
      <Stack direction="column" spacing={1}>
        <Typography variant="body2">Upload you photo (Optional)</Typography>
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
