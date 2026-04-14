import { FaBell, FaHome, FaUserCircle } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { useNavigate } from "react-router";
import { useData } from "~/hooks/useData";
import { Searchbar } from "./searchbar";

interface Prop {
  isOpen: boolean;
  onClose: (value: boolean) => void;
}

export const Navbar = ({ isOpen, onClose }: Prop) => {
  const { currentUser, notifications } = useData();
  const navigate = useNavigate();
  const unreadNotifications = notifications.filter(
    (n) => n.userId === currentUser.id && !n.isRead,
  );
  return (
    <nav className="border-b border-gray-300 p-2 sticky top-0 z-50 grid grid-cols-2 lg:grid-cols-3 bg-white text-purple-600 font-bold">
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

      <div className="hidden lg:flex items-center justify-center">
        <Searchbar />
      </div>

      <div className="flex justify-end gap-2">
        <div className="lg:hidden flex items-center justify-center gap-2">
          <Searchbar />
          {currentUser.role !== "admin" && (
            <div
              className="relative inline-flex items-center justify-center"
              onClick={() => navigate("/notifications")}
            >
              <FaBell size={20} aria-label="Notifications" />

              {unreadNotifications.length > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-medium bg-blue-500 text-white rounded-full">
                  {unreadNotifications.length}
                </span>
              )}
            </div>
          )}
        </div>
        <div
          className="items-center flex gap-2 hover:bg-gray-100 capitalize rounded-full px-2 py-2"
          onClick={() => navigate("/profile")}
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-purple-100 text-purple-600 flex items-center justify-center text-3xl md:text-lg font-semibold">
          {currentUser.imageUrl ? (
            <img
              src={currentUser.imageUrl}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            `${currentUser.firstName?.[0]}${currentUser.lastName?.[0]}`
          )}
        </div>



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
