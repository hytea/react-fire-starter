import React from "react";

import Notify from "./Notify";
import "./Notify.css";
import { Notification } from "./types";

interface NotificationContainerProps {
  notifications: Array<Notification>;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({
  notifications,
}) => {
  return (
    <div className="notification-container">
      {notifications.map((notification, index) => (
        <Notify
          id={index}
          key={notification.id}
          title={notification.title}
          details={notification.details}
          image={notification.image}
          onClose={() => {}}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;