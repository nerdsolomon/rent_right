import { useState } from "react";
import { FaBug } from "react-icons/fa";
import useClickOutside from "~/hooks/useClickOutside";

export const Feedback = () => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  return (
    <div>
      <div
        className="flex items-center gap-5 text-gray-400 hover:text-gray-600 cursor-pointer"
        onClick={() => onClose(true)}
      >
        <FaBug size={18} />
        <p>Send feedback</p>
      </div>

      {isOpen && (
        <div className="fixed absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-gray-100 rounded-2xl shadow-lg w-[90%] md:w-[400px] p-4 animate-fadeIn"
          >
            <div className="flex justify-between mb-6">
              <div>
                <p className="font-semibold">Send feedback</p>
                <p className="text-gray-400 text-xs">
                  Report any technical issue
                </p>
              </div>
              <button
                onClick={() => onClose(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form className="space-y-2">
              <textarea
                required
                rows={3}
                className="w-full p-2 border border-gray-300 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the technical issue"
              />
              <button
                type="submit"
                className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 text-sm rounded-lg"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
