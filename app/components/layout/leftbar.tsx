import {
  FaBell,
  FaBriefcase,
  FaChartBar,
  FaComments,
  FaExclamationCircle,
  FaHome,
} from "react-icons/fa";
import { NavLink } from "react-router";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";

interface Prop {
  isOpen: boolean;
  onClose: (value: boolean) => void;
}

const Leftbar = ({ isOpen, onClose }: Prop) => {
  const modalRef = useClickOutside({ isOpen, onClose });
  const { currentUser } = useData();
  const navLinks = [
    { title: "Home", path: "/home", icon: FaHome, always: true },
    { title: "Dashboard", path: "/dashboard", icon: FaChartBar, restricted: true },
    { title: "Feedbacks", path: "/feedbacks", icon: FaExclamationCircle, restricted: true },
    { title: "Messages", path: "/messages", icon: FaComments, restricted: false },
    { title: "Notifications", path: "/notifications", icon: FaBell, restricted: false },
    { title: "Portfolio", path: `/portfolio/${currentUser.id}`, icon: FaBriefcase, restricted: false, owner: true },
  ];

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
          const isAdmin = currentUser.role === "admin";
          const isOwner = currentUser.role === "owner";
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
                className={`flex gap-2 items-center p-4 ${
                  isActive ? "bg-purple-600 text-white" : "hover:bg-gray-200"
                }`}
              >
                <link.icon />
                <span>{link.title}</span>
              </div>
            )}
          </NavLink>
        ))}
    </aside>
  );
};

export default Leftbar;
