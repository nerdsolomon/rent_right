import Signin from "./signin";
import Signup from "./signup";
import { FaHome } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 md:py-4 bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="bg-purple-600 text-white w-8 md:w-10 h-8 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0">
          <FaHome size={20} />
        </div>
        <span className="text-lg md:text-xl font-bold text-gray-800 hidden sm:inline">
          RentRight
        </span>
      </div>

      <div className="flex items-center gap-3 lg:gap-4">
        <Signin />
        <button className="text-purple-600 border border-purple-600 px-3 py-2 rounded-full text-sm font-semibold hover:bg-purple-50 transition">
          Get Started
        </button>
      </div>
    </nav>
  );
}
