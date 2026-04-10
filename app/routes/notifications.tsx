import { FaBell } from "react-icons/fa";
import { useData } from "~/hooks/useData";
import { usePageTitle } from "~/hooks/usePageTitle";
import { RequireAuth } from "~/hooks/useRequireAuth";
import { type Notification } from "~/types";

type SectionProps = {
  title: string;
  items: Notification[];
};

const Notifications = () => {
  usePageTitle("RentRight - Notifications");
  const { notifications, currentUser } = useData();

  // Filter + sort newest first (FIXED TS-safe)
  const filteredNotifications: Notification[] = notifications
    .filter((n) => n.userId === currentUser.id)
    .sort(
      (a, b) =>
        new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
    );

  // Format date
  const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // Helpers
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

  // Group notifications (fully typed)
  const grouped = {
    today: filteredNotifications.filter((n: Notification) =>
      isToday(n.datetime)
    ),
    yesterday: filteredNotifications.filter((n: Notification) =>
      isYesterday(n.datetime)
    ),
    older: filteredNotifications.filter(
      (n: Notification) => !isToday(n.datetime) && !isYesterday(n.datetime)
    ),
  };

  // Section component (typed properly)
  const Section = ({ title, items }: SectionProps) => {
    if (items.length === 0) return null;

    return (
      <div className="mb-6">
        <h2 className="text-xs font-semibold text-gray-400 uppercase mb-2 px-2">
          {title}
        </h2>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {items.map((n: Notification) => (
            <div
              key={n.id ?? n.datetime}
              className={`flex gap-3 px-5 py-4 border-b border-gray-100 hover:bg-gray-50 transition ${
                !n.isRead ? "bg-blue-50/40" : "bg-white"
              }`}
            >
              {/* unread dot */}
              <div className="mt-1">
                {!n.isRead && (
                  <span className="w-2 h-2 bg-blue-500 rounded-full block" />
                )}
              </div>

              {/* content */}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  {n.message}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {formatDate(n.datetime)}
                </p>
              </div>

              {/* badge */}
              {!n.isRead && (
                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full h-fit">
                  New
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <RequireAuth>
      <div className="max-w-2xl mx-auto py-6 px-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Notifications
          </h1>
          <p className="text-sm text-gray-500">
            Your recent updates and alerts
          </p>
        </div>

        {/* Content */}
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
            <p className="text-sm text-gray-400">
              You're all caught up 🎉
            </p>
          </div>
        )}
      </div>
    </RequireAuth>
  );
};

export default Notifications;