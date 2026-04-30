import {
  FaBell,
  FaBriefcase,
  FaCalendarAlt,
  FaChartBar,
  FaExclamationCircle,
  FaHome,
  FaUserCheck,
} from "react-icons/fa";
import { NavLink } from "react-router";
import { useMe } from "~/hooks/useAuth";
import useClickOutside from "~/hooks/useClickOutside";
import { useNotifications } from "~/hooks/useNotifications";
import type { Notification } from "~/types";

interface Prop {
  isOpen: boolean;
  onClose: (value: boolean) => void;
}

const Leftbar = ({ isOpen, onClose }: Prop) => {
  const modalRef = useClickOutside({ isOpen, onClose });
  const { data: nData } = useNotifications()
  const notifications = nData?.notifications ?? []

  const { data } = useMe();
  const currentUser = data?.user
  
  const navLinks = [
    { title: "Home", path: "/home", icon: FaHome, always: true },
    { title: "Dashboard", path: "/dashboard", icon: FaChartBar, restricted: true },
    { title: "Requests", path: "/requests", icon: FaUserCheck, restricted: true },
    { title: "Feedbacks", path: "/feedbacks", icon: FaExclamationCircle, restricted: true },
    { title: "Bookings", path: "/bookings", icon: FaCalendarAlt, restricted: false },
    { title: "Notifications", path: "/notifications", icon: FaBell, restricted: false },
    { title: "Portfolio", path: `/portfolio/${currentUser?.id}`, icon: FaBriefcase, restricted: false, owner: true },
  ];

  const unreadNotifications = notifications.filter((n: Notification) => n.userId === currentUser?.id && !n.isRead);

  return (
    <aside
      ref={modalRef}
      className={`
          fixed top-[70px] left-0 overflow-y-auto transition-transform duration-300 ease-in-out
          w-[250px] h-screen border-r border-gray-200 bg-gray-100 z-40 font-semibold text-purple-600
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:translate-x-0 lg:block
        `}
    >
      {navLinks
        .filter((link) => {
          const isAdmin = currentUser?.role === "admin";
          const isOwner = currentUser?.role === "owner";
          if (link.always) return true;
          if (isAdmin) return link.restricted === true;
          if (link.restricted) return false;        
          if (link.owner && !isOwner) return false; 
          return true;
        })
        .map((link, index) => (
          <NavLink key={index} to={link.path} onClick={() => onClose(false)}>
            {({ isActive }) => (
              <div
                className={`relative flex items-center justify-between p-4 transition ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <link.icon />
                  <span>{link.title}</span>
                </div>

                {link.path === "/notifications" && unreadNotifications.length > 0 && (
                  <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                    {unreadNotifications.length}
                  </span>
                )}
              </div>
            )}
          </NavLink>
        ))}
    </aside>
  );
};

export default Leftbar;
