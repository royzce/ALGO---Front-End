import { createContext, useContext, useEffect, useState } from "react";
import * as userSvc from "../services/user";
import { compareByDateDesc } from "../services/util";
import { UserContext } from "./UserContext";

export const NotifContext = createContext({
  notifs: [],
  onMarkAsRead: () => {},
  onMarkAllAsRead: () => {},
});

export function NotifProvider({ children }) {
  const [notifs, setNotifs] = useState([]);
  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    if (currentUser) {
      getAllNotifs();
      const refreshNotifs = setInterval(() => {
        getAllNotifs();
      }, 60000);
      return () => clearInterval(refreshNotifs);
    }
  }, [currentUser]);

  async function getAllNotifs() {
    const res = await userSvc.getNotifications();
    setNotifs(res.data.sort(compareByDateDesc));
  }

  async function handleMarkAsRead(notifId) {
    const res = await userSvc.updateNotif(notifId);
    setNotifs(
      notifs.map((notif) => {
        return notif.notifId === notifId ? { ...notif, isRead: true } : notif;
      })
    );
  }

  async function handleMarkAllAsRead() {
    for (const notif of notifs) {
      const res = await userSvc.updateNotif(notif.notifId);
    }
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
