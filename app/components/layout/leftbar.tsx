import { FaBell, FaChartBar, FaComments, FaExclamationCircle, FaHome } from "react-icons/fa";
import { NavLink } from "react-router";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";

interface Prop {
  isOpen: boolean;
  onClose: (value: boolean) => void;
}

const navLinks = [
  { title: "Home", path: "/home", icon: FaHome, restricted: false },
  { title: "Dashboard", path: "/dashboard", icon: FaChartBar, restricted: true },
  { title: "Feedbacks", path: "/feedbacks", icon: FaExclamationCircle, restricted: true },
  { title: "Messages", path: "/messages", icon: FaComments, restricted: false },
  { title: "Notifications", path: "/notifications", icon: FaBell, restricted: false },
];

const Leftbar = ({ isOpen, onClose }: Prop) => {
  const modalRef = useClickOutside({ isOpen, onClose });
  const { currentUser } = useData();
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
        .filter((link) => !link.restricted || currentUser.role === "admin")
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
