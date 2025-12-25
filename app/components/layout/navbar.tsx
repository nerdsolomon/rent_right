import { FaUserCircle } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { useNavigate } from "react-router";
import { useData } from "~/hooks/useData";
import { Searchbar } from "./searchbar";

interface Prop {
  isOpen: boolean;
  onClose: (value: boolean) => void;
}

const Navbar = ({ isOpen, onClose }: Prop) => {
  const { currentUser } = useData();
  const navigate = useNavigate();
  return (
    <nav className="border-b border-gray-300 p-2 sticky top-0 z-50 grid grid-cols-3 bg-white text-blue-500 font-bold">
      <div className="flex items-center gap-4 text-xl">
        <MdMenu
          onClick={() => onClose(!isOpen)}
          className="lg:hidden ml-2 cursor-pointer hover:text-blue-700"
        />
        <span className="lg:px-2">RentRight</span>
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

export default Navbar;
