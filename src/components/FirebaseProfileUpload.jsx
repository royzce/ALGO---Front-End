import { Button, Card, CardMedia, Typography, Stack } from "@mui/material";

import { useContext } from "react";
import { RegisterContext } from "../context/RegisterContext";

function FirebaseImageUpload() {
  const { previewUrl, handleFileSelect } = useContext(RegisterContext);

  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-end"
      spacing={2}
      mb={1.5}
    >
      <Card sx={{ width: 100, borderRadius: "12px" }}>
        <CardMedia
          component="img"
          alt="Person"
          height="100"
          width="100"
          image={
            previewUrl
              ? previewUrl
              : process.env.PUBLIC_URL + "/assets/Person.png"
          }
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
