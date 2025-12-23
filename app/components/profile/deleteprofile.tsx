import { useState } from "react";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";

export const Deleteprofile = () => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  const { currentUser, deleteUser } = useData();
  return (
    <div>
      <button
        onClick={() => onClose(true)}
        className="p-2 bg-red-400 mt-2 text-xs hover:bg-red-500 text-white rounded-lg font-semibold"
      >
        Delete Account
      </button>

      {isOpen && (
        <div className="fixed absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-gray-100 rounded-2xl shadow-lg w-[270px] p-6 animate-fadeIn"
          >
            <p className="text-gray-400 text-md">
              Deleting your account will permanently erase all your data. Are you sure you want to continue?
            </p>
            <div className="grid grid-cols-2 gap-2 items-center mt-4">
              <button
                onClick={() => onClose(false)}
                className="p-2 bg-gray-400 mt-2 text-xs hover:bg-gray-500 text-white rounded-lg font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteUser(currentUser.id)}
                className="p-2 bg-red-400 mt-2 text-xs hover:bg-red-500 text-white rounded-lg font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

