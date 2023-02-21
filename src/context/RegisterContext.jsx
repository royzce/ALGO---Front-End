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
});

export const RegisterProvider = ({ children }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
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
  //   async function uploadTaskPromize() {
  //     return new Promise(function (resolve, reject) {
  //       const storageRef = storage.ref(YOUR_STORAGE_PATH);
  //       const uploadTask = storageRef.put(YOUR_FILE_OR_BLOB);
  //       uploadTask.on(
  //         "state_changed",
  //         function (snapshot) {
  //           var progress =
  //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //           console.log("Upload is " + progress + "% done");
  //         },
  //         function error(err) {
  //           console.log("error", err);
  //           reject();
  //         },
  //         function complete() {
  //           uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
  //             resolve(downloadURL);
  //           });
  //         }
  //       );
  //     });
  //   }
  const uploadTaskPromise = async () => {
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
          () => {
            getDownloadURL(storageRef)
              .then((url) => {
                setDownloadUrl(url);
              })
              .finally(() => {
                setUploading(false);
                resolve(downloadUrl);
                //   alert("upload successful");
              });
          }
        );
      }
    });
  };
  //   const handleUpload = async () => {
  //     if (selectedFile) {
  //       const storageRef = ref(storage, `images/${Date.now()}`);
  //       const uploadTask = uploadBytesResumable(storageRef, selectedFile);
  //       setUploading(true);
  //       uploadTask.on(
  //         "state_changed",
  //         (snapshot) => {
  //           const progress =
  //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //           setUploadProgress(progress);
  //         },
  //         (error) => {
  //           console.log("Upload failed:", error);
  //           setUploading(false);
  //         },
  //         () => {
  //           getDownloadURL(storageRef)
  //             .then((url) => {
  //               setDownloadUrl(url);
  //             })
  //             .finally(() => {
  //               setUploading(false);
  //               //   alert("upload successful");
  //             });
  //         }
  //       );
  //     }
  //   };

  return (
    <RegisterContext.Provider
      value={{
        previewUrl,
        uploadProgress,
        handleUpload: uploadTaskPromise,
        handleFileSelect: handleFileSelect,
        downloadUrl,
        uploading,
        selectedFile,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};
