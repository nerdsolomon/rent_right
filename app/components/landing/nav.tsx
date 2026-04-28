import Signin from "./signin";
import { FaHome } from "react-icons/fa";

export const Nav = () => {
  return (
    <nav
      id="navbar"
      className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 md:py-4 bg-white border-b border-gray-200 sticky top-0 z-50"
    >
      <div className="text-purple-600 flex items-center">
        <FaHome size={25} />
        <span className="text-[25px] font-bold sm:inline">
          xterra
        </span>
      </div>

      <div className="flex items-center gap-3 lg:gap-4">
        <Signin />
        <a
          href="#get-started"
          className="text-purple-600 border border-purple-600 px-3 py-2 rounded-full text-sm font-semibold hover:bg-purple-50 transition"
        >
          Get Started
        </a>
      </div>
    </nav>
  );
};
