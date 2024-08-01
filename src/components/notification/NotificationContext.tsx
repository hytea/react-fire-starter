import { ReactNode, createContext, useContext, useState } from "react";

import Notify from "./Notify";
import "./Notify.css";
import { Notification } from "./types";

interface NotificationContextProps {
  addNotification: (notification: Omit<Notification, "id">) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined,
);

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, "id">) => {
    const id = new Date().getTime();
    setNotifications((prev) => [...prev, { ...notification, id }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 3000);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <NotificationContainer
        notifications={notifications}
        onClose={removeNotification}
      />
    </NotificationContext.Provider>
  );
}

function NotificationContainer({
  notifications,
  onClose,
}: {
  notifications: Notification[];
  onClose: (id: number) => void;
}) {
  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <Notify
          key={notification.id}
          id={notification.id}
          title={notification.title}
          details={notification.details}
          image={notification.image}
          onClose={onClose}
        />
      ))}
    </div>
  );
}
