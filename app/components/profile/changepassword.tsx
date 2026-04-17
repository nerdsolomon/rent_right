import { useEffect, useState } from "react";
import { FaUserLock } from "react-icons/fa";
import { useMe } from "~/hooks/useAuth";
import useClickOutside from "~/hooks/useClickOutside";
import { useUpdateUser } from "~/hooks/useUsers";

export const ChangePassword = () => {
  const [isOpen, setIsOpen] = useState(false);

  const modalRef = useClickOutside({
    isOpen,
    onClose: setIsOpen,
  });

  const [formData, setFormData] = useState({
    old: "",
    new: "",
    confirm: "",
  });

  const [notMatch, setNotMatch] = useState(false);
  const [message, setMessage] = useState("");

  const { data, isLoading } = useMe();
  const currentUser = data?.user
  const { mutate: updateUser, isPending } = useUpdateUser();

  // ✅ FIXED: watch both fields
  useEffect(() => {
    setNotMatch(
      formData.new.length > 0 &&
      formData.confirm.length > 0 &&
      formData.new !== formData.confirm
    );
  }, [formData.new, formData.confirm]);

  const changePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser?.id) {
      setMessage("User not loaded");
      return;
    }

    if (notMatch) {
      setMessage("Passwords do not match");
      return;
    }

    // 🚨 backend must validate old password
    updateUser(
      {
        id: currentUser.id,
        data: {
          oldPassword: formData.old,
          password: formData.new,
        },
      },
      {
        onSuccess: () => {
          setMessage("Password changed successfully");
          setFormData({ old: "", new: "", confirm: "" });
        },
        onError: () => {
          setMessage("Failed to change password");
        },
      }
    );
  };

  return (
    <div>
      <div
        className="flex items-center gap-5 text-gray-400 hover:text-gray-600 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <FaUserLock size={18} />
        <p>Change password</p>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-gray-100 rounded-2xl shadow-lg w-[90%] md:w-[400px] p-6 text-center"
          >
            <p className="font-bold mb-4 text-purple-600">
              Change Password
            </p>

            <form className="space-y-4" onSubmit={changePassword}>
              {message && (
                <div className="bg-yellow-100 rounded-lg text-sm text-gray-600 p-2">
                  {message}
                </div>
              )}

              <input
                type="password"
                placeholder="Old Password"
                value={formData.old}
                onChange={(e) =>
                  setFormData({ ...formData, old: e.target.value })
                }
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />

              <input
                type="password"
                placeholder="New Password"
                value={formData.new}
                onChange={(e) =>
                  setFormData({ ...formData, new: e.target.value })
                }
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirm}
                onChange={(e) =>
                  setFormData({ ...formData, confirm: e.target.value })
                }
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />

              {notMatch && (
                <p className="text-sm text-red-500 text-left">
                  Passwords don't match
                </p>
              )}

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm hover:bg-purple-600 hover:text-white border rounded-lg text-purple-600"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 text-sm hover:bg-purple-800 bg-purple-600 text-white rounded-lg"
                >
                  {isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};