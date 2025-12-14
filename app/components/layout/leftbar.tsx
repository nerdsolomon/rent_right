import { FaHeart, FaHome } from "react-icons/fa";
import { NavLink } from "react-router";
import useClickOutside from "~/hooks/useClickOutside";

interface Prop {
  isOpen: boolean;
  onClose: (value: boolean) => void;
}

const navLinks = [
  { title: "Home", path: "/home", icon: FaHome },
  { title: "Property", path: "/property", icon: FaHome },
  { title: "Favorites", path: "/favorites", icon: FaHeart },
];

const Leftbar = ({ isOpen, onClose }: Prop) => {
  const modalRef = useClickOutside({ isOpen, onClose });
  return (
    <aside
      ref={modalRef}
      className={`
          fixed top-[70px] left-0 overflow-y-auto transition-transform duration-300 ease-in-out
          w-[250px] h-screen border-r border-gray-200 bg-gray-100 z-40 font-semibold
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:translate-x-0 lg:block
        `}
    >
      {navLinks.map((link, index) => (
        <NavLink to={link.path} onClick={() => onClose(false)}>
          {({ isActive }) => (
            <div className={`flex gap-2 items-center p-4 ${isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`} >
              <link.icon /> <span>{link.title}</span>
            </div>
          )}
        </NavLink>
      ))}
    </aside>
  );
};

export default Leftbar;
