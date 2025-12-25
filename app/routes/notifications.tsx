import { FaBell } from "react-icons/fa";
import { usePageTitle } from "~/hooks/usePageTitle";

const Notifications = () => {
  usePageTitle("RentRight - Notifications");

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div>
        <div className="flex justify-center">
          <FaBell size={50} className="text-gray-400" />
        </div>
        <p className="text-center font-bold text-[25px] text-gray-400">
          No new notification
        </p>
      </div>
    </div>
  );
};

export default Notifications;
