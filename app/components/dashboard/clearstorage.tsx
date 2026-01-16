import { useState } from "react";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";
import { FaExclamationTriangle, FaTrash } from "react-icons/fa";

export const ClearStorage = () => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  const { clearStorage } = useData();
  return (
    <>
      <button
        onClick={() => onClose(true)}
        className="p-2 flex gap-2 w-full justify-center items-center hover:text-red-700 text-red-500 font-semibold border border-gray-300 shadow hover:shadow-md transition rounded-lg"
      >
        <FaTrash /> <p>Clear Storage</p>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="relative bg-gray-100 rounded-lg shadow-lg w-[90%] lg:w-[700px] max-h-[100vh] animate-fadeIn"
          >
            <div className="flex items-center justify-between py-3 px-4 border-b border-gray-300">
              <div className="flex items-center gap-2 text-red-600 font-semibold">
                <FaExclamationTriangle className="text-lg" />
                <span>Clear Storage</span>
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
                <strong>all users, properties, reviews, and feedbacks</strong>.
                This cannot be undone.
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
                  clearStorage();
                  onClose(false);
                }}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2"
              >
                <FaTrash />
                Clear Storage
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
