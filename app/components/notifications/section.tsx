import { type Notification } from "~/types";
import { MessageCard } from "./messagecard";

type SectionProps = {
  title: string;
  items: Notification[];
};

export const Section = ({ title, items }: SectionProps) => {
  if (items.length === 0) return null;

  const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="mb-6">
      <h2 className="text-xs font-semibold text-gray-400 uppercase mb-2 px-2">
        {title}
      </h2>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {items.map((n: Notification) => (
          <MessageCard notification={n} formatDate={formatDate} />
        ))}
      </div>
    </div>
  );
};
