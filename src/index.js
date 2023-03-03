import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter } from "react-router-dom";
import { RegisterProvider } from "./context/RegisterContext";
import PostProvider from "./context/PostContext";
import UserProvider from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";
import { PopupProvider } from "./context/PopupContext";
import { NotifProvider } from "./context/NotifContext";
import ProfileNavProvider from "./context/ProfileNavContext";
import { FriendProvider } from "./context/FriendContext";
import { DarkModeProvider } from "./context/DarkModeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DarkModeProvider>
        <AuthProvider>
          <UserProvider>
            <PopupProvider>
              <RegisterProvider>
                <FriendProvider>
                  <PostProvider>
                    <NotifProvider>
                      <App />
                    </NotifProvider>
                  </PostProvider>
                </FriendProvider>
              </RegisterProvider>
            </PopupProvider>
          </UserProvider>
        </AuthProvider>
      </DarkModeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
