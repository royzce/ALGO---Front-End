import {
  Button,
  Card,
  CardMedia,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";

import { Box } from "@mui/system";
import { useContext } from "react";
import { RegisterContext } from "../context/RegisterContext";

function FirebaseImageUpload() {
  const { previewUrl, uploadProgress, handleFileSelect } =
    useContext(RegisterContext);

  return (
    <>
      <Grid container alignItems="center">
        <Grid item md={4}>
          <Card sx={{ width: 100 }}>
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
        </Grid>

        <Grid item md={8}>
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
          <Grid item>
            <Button size="small" variant="contained" component="label">
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleFileSelect}
              />
              Choose file
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {/* {uploadProgress > 0 && uploadProgress !== 100 && (
        <Grid item xs={12} sx={{ width: "100%" }}>
          <LinearProgressWithLabel value={uploadProgress} />
        </Grid>
      )} */}
    </>
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
