import { useEffect, useState } from "react";
import { FaUserLock } from "react-icons/fa";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";

export const ChangePassword = () => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  const { currentUser, updateUser } = useData();
  const [formData, setFormData] = useState({ old: "", new: "", confirm: "" });
  const [notMatch, setNotMatch] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (formData.new !== formData.confirm) setNotMatch(true);
    else setNotMatch(false);
  }, [formData.confirm]);

  const changePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.old === currentUser.password && notMatch === false) {
      updateUser({ ...currentUser, password: formData.new });
      setMessage("Password changed successfully");
    } else {
      setMessage("Old password is incorrect");
    }
    setAlert(true);
  };

  return (
    <div>
      <div
        className="flex items-center gap-5 text-gray-400 hover:text-gray-600 cursor-pointer"
        onClick={() => onClose(true)}
      >
        <FaUserLock size={18} />
        <p>Change password</p>
      </div>

      {isOpen && (
        <div className="fixed absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-gray-100 rounded-2xl shadow-lg w-[70%] md:w-[400px] p-6 text-center animate-fadeIn"
          >
            <p className="font-bold mb-4">Change Password</p>

            <form className="space-y-4" onSubmit={changePassword}>
              {alert && (
                <div className="bg-yellow-100 rounded-lg text-sm text-gray-500 p-2">
                  {message}
                </div>
              )}
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Old Password"
                required
                value={formData.old}
                onChange={(e) =>
                  setFormData({ ...formData, old: e.target.value })
                }
              />
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="New Password"
                required
                value={formData.new}
                onChange={(e) =>
                  setFormData({ ...formData, new: e.target.value })
                }
              />
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Confirm Password"
                required
                value={formData.confirm}
                onChange={(e) =>
                  setFormData({ ...formData, confirm: e.target.value })
                }
              />
              {notMatch && (
                <p className="text-sm text-red-500 text-start">
                  Passwords don't match...
                </p>
              )}
              <div className="grid grid-cols-2 gap-2 items-center">
                <button
                  onClick={() => onClose(false)}
                  className="p-2 bg-gray-400 text-xs hover:bg-gray-500 text-white rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="p-2 bg-gray-400 text-xs hover:bg-gray-500 text-white rounded-lg font-semibold"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
