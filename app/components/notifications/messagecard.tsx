import type { ReactNode } from "react";
import type { Notification } from "~/types";

interface Prop {
  notification: Notification;
  formatDate: (value: string) => ReactNode
}

export const MessageCard = ({ notification, formatDate }: Prop) => {
  return (
    <div
      key={notification.id ?? notification.datetime}
      className={`flex gap-3 px-5 py-4 border-b border-gray-100 hover:bg-gray-50 transition ${
        !notification.isRead ? "bg-blue-50/40" : "bg-white"
      }`}
    >
      {/* unread dot */}
      <div className="mt-1">
        {!notification.isRead && (
          <span className="w-2 h-2 bg-blue-500 rounded-full block" />
        )}
      </div>

      {/* content */}
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">
          {notification.message}
        </p>

        <p className="text-xs text-gray-400 mt-1">
          {formatDate(notification.datetime)}
        </p>
      </div>

      {/* badge */}
      {!notification.isRead && (
        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full h-fit">
          New
        </span>
      )}
    </div>
  );
};
