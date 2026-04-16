import { FaBell, FaHome } from "react-icons/fa";
import { Searchbar } from "./searchbar";
import { MdMenu } from "react-icons/md";
import { useNavigate } from "react-router";
import { useNotifications } from "~/hooks/useNotifications";
import { useMe } from "~/hooks/useAuth";
import type { Notification } from "~/types";

interface Prop {
  isOpen: boolean;
  onClose: (value: boolean) => void;
}

export const Navbar = ({ isOpen, onClose }: Prop) => {
  const navigate = useNavigate();

  const { data, isLoading } = useMe();
  const currentUser = data?.user
  const { data: notificationsData } = useNotifications();

  const notifications: Notification[] = Array.isArray(notificationsData)
    ? notificationsData
    : [];

  const isAuthenticated = !!currentUser;

  const unreadNotifications = isAuthenticated
    ? notifications.filter(
        (n) => n.userId === currentUser.id && !n.isRead
      )
    : [];

  // 🔄 Loading state (only for auth)
  if (isLoading) {
    return (
      <nav className="p-2 border-b bg-white">
        Loading...
      </nav>
    );
  }

  return (
    <nav className="border-b border-gray-300 p-2 sticky top-0 z-50 grid grid-cols-2 lg:grid-cols-3 bg-white text-purple-600 font-bold">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden ml-2 cursor-pointer hover:text-purple-800 text-lg"
          onClick={() => onClose(!isOpen)}
        >
          <MdMenu />
        </button>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <div className="hidden lg:flex bg-purple-600 text-white w-8 h-8 rounded-lg items-center justify-center">
            <FaHome size={20} />
          </div>

          <span className="text-lg font-bold">RentRight</span>
        </div>
      </div>

      {/* CENTER */}
      <div className="hidden lg:flex items-center justify-center">
        <Searchbar />
      </div>

      {/* RIGHT */}
      <div className="flex justify-end gap-2 items-center">

        {/* MOBILE SEARCH + NOTIFICATIONS */}
        <div className="lg:hidden flex items-center gap-2">
          <Searchbar />

          {isAuthenticated && currentUser.role !== "admin" && (
            <div
              className="relative cursor-pointer"
              onClick={() => navigate("/notifications")}
            >
              <FaBell size={20} />

              {unreadNotifications.length > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] bg-blue-500 text-white rounded-full">
                  {unreadNotifications.length}
                </span>
              )}
            </div>
          )}
        </div>

        {/* PROFILE */}
        {isAuthenticated ? (
          <div
            className="flex items-center gap-2 hover:bg-gray-100 rounded-full px-2 py-2 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center overflow-hidden text-purple-600 font-semibold">
              {currentUser.imageUrl ? (
                <img
                  src={currentUser.imageUrl}
                  className="w-full h-full object-cover"
                />
              ) : (
                `${currentUser.firstName?.[0] ?? ""}${currentUser.lastName?.[0] ?? ""}`
              )}
            </div>

            <span className="hidden lg:block">
              {currentUser.company
                ? currentUser.company
                : `${currentUser.firstName ?? ""} ${currentUser.lastName ?? ""}`}
            </span>
          </div>
        ) : (
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};