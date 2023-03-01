import { createContext, useEffect, useState } from "react";
import * as userSvc from "../services/user";
import { compareByDateDesc } from "../services/util";

export const NotifContext = createContext({
  notifs: [],
  onMarkAsRead: () => {},
  onMarkAllAsRead: () => {},
});

export function NotifProvider({ children }) {
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    getAllNotifs();
    const refreshNotifs = setInterval(() => {
      getAllNotifs();
    }, 60000);
    return () => clearInterval(refreshNotifs);
  }, []);

  async function getAllNotifs() {
    const res = await userSvc.getNotifications();
    console.log("inside getAllNotifs", res);
    setNotifs(res.data.sort(compareByDateDesc));
  }

  function handleMarkAsRead(notifId) {
    console.log("inside handleMarkAsRead");
    setNotifs(
      notifs.map((notif) => {
        return notif.notifId === notifId ? { ...notif, isRead: true } : notif;
      })
    );
    // getAllNotifs();
  }

  function handleMarkAllAsRead() {
    console.log("inside handleMarkAllAsRead");
    setNotifs(
      notifs.map((notif) => {
        return notif.isRead ? notif : { ...notif, isRead: true };
      })
    );
    // getAllNotifs();
  }

  return (
    <NotifContext.Provider
      value={{
        notifs,
        onMarkAsRead: handleMarkAsRead,
        onMarkAllAsRead: handleMarkAllAsRead,
      }}
    >
      {children}
    </NotifContext.Provider>
  );
}
