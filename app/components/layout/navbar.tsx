import { FaUserCircle } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { useNavigate } from "react-router";
import {useData} from "~/hooks/useData";

interface Prop {
  isOpen: boolean;
  onClose: (value: boolean) => void;
}

const Navbar = ({ isOpen, onClose }: Prop) => {
  const {currentUser} = useData()
  const navigate = useNavigate()
  return (
    <nav className="border-b border-gray-300 p-4 sticky top-0 z-50 flex justify-between bg-white text-blue-500 font-bold">
      <div className="flex items-center gap-2">
        <button onClick={() => onClose(!isOpen)} className="lg:hidden text-xl cursor-pointer p-2 transition rounded-lg hover:bg-gray-100">
          <MdMenu />
        </button>
        <span className="text-xl ">RentRight</span>
        
      </div>
      
      <div className="items-center flex gap-2 hover:bg-gray-100 rounded-full px-2 py-2" onClick={() => navigate("/profile")}>
        <FaUserCircle size={30} />
        <span className="hidden lg:block">{currentUser.firstName} {currentUser.lastName}</span>
      </div>
    </nav>
  );
};

export default Navbar;
