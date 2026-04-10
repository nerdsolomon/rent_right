import { FaBell } from "react-icons/fa";
import { Section } from "~/components/notifications/section";
import { useData } from "~/hooks/useData";
import { usePageTitle } from "~/hooks/usePageTitle";
import { RequireAuth } from "~/hooks/useRequireAuth";
import { type Notification } from "~/types";

const Notifications = () => {
  usePageTitle("RentRight - Notifications");
  const { notifications, currentUser } = useData();

  const filteredNotifications: Notification[] = notifications
    .filter((n) => n.userId === currentUser.id)
    .sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());

  const isToday = (date: string) => {
    const d = new Date(date);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  };

  const isYesterday = (date: string) => {
    const d = new Date(date);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return d.toDateString() === yesterday.toDateString();
  };

  const grouped = {
    today: filteredNotifications.filter((n: Notification) =>
      isToday(n.datetime),
    ),
    yesterday: filteredNotifications.filter((n: Notification) =>
      isYesterday(n.datetime),
    ),
    older: filteredNotifications.filter(
      (n: Notification) => !isToday(n.datetime) && !isYesterday(n.datetime),
    ),
  };

  return (
    <RequireAuth>
      <div className="max-w-2xl mx-auto py-6 px-4">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-purple-600">
            Notifications
          </h1>
        </div>

        {filteredNotifications.length > 0 ? (
          <>
            <Section title="Today" items={grouped.today} />
            <Section title="Yesterday" items={grouped.yesterday} />
            <Section title="Older" items={grouped.older} />
          </>
        ) : (
          <div className="py-16 text-center">
            <FaBell size={40} className="text-gray-300 mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-300">
              No notifications
            </p>
            <p className="text-sm text-gray-400">You're all caught up</p>
          </div>
        )}
      </div>
    </RequireAuth>
  );
};

export default Notifications;
