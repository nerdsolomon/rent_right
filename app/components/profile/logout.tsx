import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useLogout } from "~/hooks/useAuth";
import useClickOutside from "~/hooks/useClickOutside";
import { useNavigate } from "react-router";

export const Logout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useClickOutside({ isOpen, setIsOpen });

  const { mutate: logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        setIsOpen(false);
        navigate("/", { replace: true });
      },
    });
  };

  return (
    <div>
      <div
        className="flex items-center gap-5 text-gray-400 hover:text-gray-600 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <FaSignOutAlt size={18} />
        <p>Logout</p>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="lg:w-[400px] w-[90%] rounded-2xl bg-white p-6 shadow-xl animate-[fadeIn_.2s_ease]"
          >
            {/* Header with Icon */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <FaSignOutAlt size={18} />
              </div>

              <div>
                <p className="text-lg font-semibold text-gray-800">
                  Exit application?
                </p>
                <p className="text-sm text-gray-500">
                  You'll be logged out of your account.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition flex items-center gap-2"
              >
                <FaSignOutAlt size={16} />
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
