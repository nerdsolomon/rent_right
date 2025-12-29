import { FaBell } from "react-icons/fa";
import { usePageTitle } from "~/hooks/usePageTitle";
import { useRequireAuth } from "~/hooks/useRequireAuth";

const Notifications = () => {
  useRequireAuth()
  usePageTitle("RentRight - Notifications");

  return (
    <div className="flex justify-center">
      <div className="mt-40">
        <div className="flex justify-center">
          <FaBell size={40} className="text-gray-400" />
        </div>
        <p className="text-center font-bold text-[22px] text-gray-400">
          No notifications
        </p>
      </div>
    </div>
  );
};

export default Notifications;
