import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";

export const Logout = () => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  const { logout } = useData();
  return (
    <div>
      <div
        className="flex items-center gap-5 text-gray-400 hover:text-gray-600 cursor-pointer"
        onClick={() => onClose(true)}
      >
        <FaSignOutAlt size={18} />
        <p>Logout</p>
      </div>

      {isOpen && (
        <div className="fixed absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-gray-100 rounded-2xl shadow-lg w-[270px] p-6 text-center animate-fadeIn"
          >
            <p className="text-center text-gray-600 text-lg">
              Do you want to exit app?
            </p>
            <div className="grid grid-cols-2 gap-2 items-center mt-4">
              <button
                onClick={() => onClose(false)}
                className="p-2 border border-purple-400 text-xs hover:bg-purple-600 hover:text-white text-purple-600 rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => logout()}
                className="p-2 bg-purple-600 text-xs hover:bg-purple-800 text-white rounded-lg font-semibold"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
