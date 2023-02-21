import {
  Button,
  Card,
  CardMedia,
  Grid,
  LinearProgress,
  Typography,
  Stack,
} from "@mui/material";

import { Box } from "@mui/system";
import { useContext } from "react";
import { RegisterContext } from "../context/RegisterContext";

function FirebaseImageUpload() {
  const { previewUrl, uploadProgress, handleFileSelect } =
    useContext(RegisterContext);

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

      {/* <Grid item>
            <Button
              size="small"
              variant="contained"
              onClick={handleUpload}
              style={{ width: "6.438rem" }}
              disabled={!previewUrl}
            >
              Upload
            </Button>
          </Grid> */}
      {/* {uploadProgress > 0 && uploadProgress !== 100 && (
        <Grid item xs={12} sx={{ width: "100%" }}>
          <LinearProgressWithLabel value={uploadProgress} />
        </Grid>
      )} */}
    </Stack>
  );
}

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default FirebaseImageUpload;
