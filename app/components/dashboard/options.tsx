import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";
import type { User } from "~/types";

interface Prop {
  user : User
}

export const Options = ({ user } : Prop ) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteUser, toggleRole } = useData();
  const modalRef = useClickOutside({ isOpen, onClose: setIsOpen });

  return (
    <div ref={modalRef} className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-2 rounded-lg text-sm text-gray-400 hover:bg-gray-200"
      >
        <FaEllipsisV />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-[9999] w-40 rounded-lg bg-white shadow-md">
          <div className="py-1 text-xs text-gray-700">
            <button
              onClick={() => {
                toggleRole(user.id)
                setIsOpen(false)
              }}
              className="block w-full px-4 py-2 text-left rounded-lg hover:bg-gray-100"
            >
              {user.role === "admin" ? "Make user" : "Make admin"}
            </button>

            <button
              onClick={() => {
                deleteUser(user.id);
                setIsOpen(false);
              }}
              className="block w-full px-4 capitalize py-2 text-left rounded-lg hover:bg-gray-100 text-red-600"
            >
              {`Delete ${user.firstName}`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
