import { useState } from "react";
import { FaExclamationTriangle, FaTrash } from "react-icons/fa";
import useClickOutside from "~/hooks/useClickOutside";
import { useDeleteUser } from "~/hooks/useUsers";

interface Prop {
  userId: number;
}

export const Delete = ({ userId }: Prop) => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  const { mutate: deleteUser } = useDeleteUser();
  return (
    <div>
      <div
        className="flex items-center gap-5 text-red-400 hover:text-red-900 cursor-pointer"
        onClick={() => onClose(true)}
      >
        <FaTrash size={18} />
        <p>Delete account</p>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="relative bg-gray-100 rounded-lg shadow-lg w-[90%] lg:w-[500px] max-h-[100vh] animate-fadeIn"
          >
            <div className="flex items-center justify-between py-3 px-4 border-b border-gray-300">
              <div className="flex items-center gap-2 text-red-600 font-semibold">
                <FaExclamationTriangle className="text-lg" />
                <span>Delete account</span>
              </div>

              <button
                onClick={() => onClose(false)}
                className="text-gray-400 hover:text-black text-lg"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-6 text-gray-700">
              <p className="text-sm leading-relaxed">
                <strong className="text-red-600">Warning:</strong> This action
                will permanently delete{" "}
                <strong>all your data and properties</strong>. This cannot be
                undone.
              </p>
            </div>

            <div className="flex justify-end gap-3 text-sm px-6 py-4 border-t border-gray-300">
              <button
                onClick={() => onClose(false)}
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  deleteUser(userId);
                  onClose(false);
                }}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
