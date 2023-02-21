import {
  Button,
  Card,
  CardMedia,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import "firebase/storage";
import { Box } from "@mui/system";
const firebaseConfig = {
  apiKey: "AIzaSyA0mH930qB3pzkiuW80iInMfKBg10-j1bI",
  authDomain: "socialmediadatabase-6e54e.firebaseapp.com",
  projectId: "socialmediadatabase-6e54e",
  storageBucket: "socialmediadatabase-6e54e.appspot.com",
  messagingSenderId: "566450973167",
  appId: "1:566450973167:web:3b23c1260aac6d9913ee1a",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

function FirebaseImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    console.log("awit outside");
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      console.log("awit");
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const storageRef = ref(storage, `images/${selectedFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);
      setUploading(true);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.log("Upload failed:", error);
          setUploading(false);
        },
        () => {
          getDownloadURL(storageRef)
            .then((url) => {
              console.log("Download URL:", url);
              setDownloadUrl(url);
            })
            .finally(() => {
              setUploading(false);
              alert("upload successful");
            });
        }
      );
    }
  };

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

        <Grid item md={8} container direction="column" spacing={2}>
          <Grid item>
            <Button
              size="small"
              variant="contained"
              onClick={handleUpload}
              style={{ width: "6.438rem" }}
              disabled={!previewUrl}
            >
              Upload
            </Button>
          </Grid>
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
      {uploadProgress > 0 && uploadProgress !== 100 && (
        <Grid item xs={12} sx={{ width: "100%" }}>
          <LinearProgressWithLabel value={uploadProgress} />
        </Grid>
      )}
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
