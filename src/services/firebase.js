import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0mH930qB3pzkiuW80iInMfKBg10-j1bI",
  authDomain: "socialmediadatabase-6e54e.firebaseapp.com",
  projectId: "socialmediadatabase-6e54e",
  storageBucket: "socialmediadatabase-6e54e.appspot.com",
  messagingSenderId: "566450973167",
  appId: "1:566450973167:web:3b23c1260aac6d9913ee1a",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    if (file) {
      const storageRef = ref(storage, `images/${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //   const progress =
          //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //   // setUploadProgress(progress);
        },
        (error) => {
          reject();
        },
        async () => {
          getDownloadURL(storageRef).then((url) => {
            resolve(url);
          });
        }
      );
    }
  });
};
