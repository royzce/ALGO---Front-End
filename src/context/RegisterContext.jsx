import { createContext, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

export const RegisterContext = createContext({
  selectedFile: null,
  previewUrl: null,
  uploading: false,
  downloadUrl: null,
  uploadProgress: 0,
  handleUpload: () => {},
  handleFileSelect: () => {},
  closePreview: () => {},
});

export const RegisterProvider = ({ children }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const closePreview = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleUpload = async () => {
    return new Promise((resolve, reject) => {
      if (selectedFile) {
        const storageRef = ref(storage, `images/${Date.now()}`);
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
            reject();
          },
          async () => {
            getDownloadURL(storageRef).then((url) => {
              setUploading(false);
              resolve(url);
            });
          }
        );
      }
    });
  };

  return (
    <RegisterContext.Provider
      value={{
        previewUrl,
        uploadProgress,
        handleUpload: handleUpload,
        handleFileSelect: handleFileSelect,
        closePreview: closePreview,
        uploading,
        selectedFile,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};
