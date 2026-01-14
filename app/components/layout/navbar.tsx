import { FaHome, FaUserCircle } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { useNavigate } from "react-router";
import { useData } from "~/hooks/useData";
import { Searchbar } from "./searchbar";

interface Prop {
  isOpen: boolean;
  onClose: (value: boolean) => void;
}

export const Navbar = ({ isOpen, onClose }: Prop) => {
  const { currentUser } = useData();
  const navigate = useNavigate();
  return (
    <nav className="border-b border-gray-300 p-2 sticky top-0 z-50 grid grid-cols-3 bg-white text-purple-600 font-bold">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden ml-2 cursor-pointer hover:text-purple-800 text-lg"
          onClick={() => onClose(!isOpen)}
        >
          <MdMenu />
        </button>

        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="hidden lg:flex bg-purple-600 text-white w-8 md:w-10 h-8 md:h-10 rounded-lg items-center justify-center flex-shrink-0">
            <FaHome size={20} />
          </div>
          <span className="text-lg text-xl font-bold text-purple-600 sm:inline">
            RentRight
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Searchbar />
      </div>

      <div className="flex justify-end">
        <div
          className="items-center flex gap-2 hover:bg-gray-100 rounded-full px-2 py-2"
          onClick={() => navigate("/profile")}
        >
          <FaUserCircle size={30} />
          <span className="hidden lg:block">
            {currentUser.company
              ? currentUser.company
              : `${currentUser.firstName} ${currentUser.lastName}`}
          </span>
        </div>
      </div>
    </nav>
  );
};