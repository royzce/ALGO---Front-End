import { createContext, useState } from "react";
import React from "react";

export const ProfileNavContext = createContext({
  profileTab: "",
  setProfileTab: () => {},
  friendsTab: "",
  setFriendsTab: () => {},
});

export default function ProfileNavProvider({ children }) {
  const [profileTab, setProfileTab] = useState("Post");
  const [friendsTab, setFriendsTab] = useState("AllFriends");
  return (
    <ProfileNavContext.Provider
      value={{
        profileTab,
        setProfileTab,
        friendsTab,
        setFriendsTab,
      }}
    >
      {children}
    </ProfileNavContext.Provider>
  );
}
