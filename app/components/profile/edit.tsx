import { useState } from "react";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";

export const Edit = () => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  const { currentUser, updateUser } = useData();
  const [alert, setAlert] = useState(false);

  const editUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser({ ...currentUser });
    setAlert(true);
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={() => onClose(true)}
        className="px-2 py-1 border border-gray-400 text-xs hover:bg-gray-400 text-gray-400 hover:text-white rounded-lg font-semibold"
      >
        Edit
      </button>

      {isOpen && (
        <div className="fixed absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-lg w-[90%] md:w-[400px] p-6 text-center animate-fadeIn"
          >
            <div className="flex justify-between mb-8">
              <p className="font-bold">Edit Profile</p>
              <button
                onClick={() => onClose(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4" onSubmit={editUser}>
              {alert && (
                <div className="bg-yellow-100 rounded-lg text-sm text-gray-500 p-2">
                  Profile updated
                </div>
              )}

              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="First Name"
                required
                value={currentUser.firstName}
                onChange={(e) =>
                  updateUser({
                    ...currentUser,
                    firstName: e.target.value,
                  })
                }
              />

              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Last Name"
                required
                value={currentUser.lastName}
                onChange={(e) =>
                  updateUser({
                    ...currentUser,
                    lastName: e.target.value,
                  })
                }
              />

              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Company (Optional)"
                value={currentUser.company}
                onChange={(e) =>
                  updateUser({
                    ...currentUser,
                    company: e.target.value,
                  })
                }
              />

              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                placeholder="Email"
                required
                value={currentUser.email}
                onChange={(e) =>
                  updateUser({
                    ...currentUser,
                    email: e.target.value,
                  })
                }
              />

              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                placeholder="Phone Number"
                required
                value={currentUser.phone}
                onChange={(e) =>
                  updateUser({
                    ...currentUser,
                    phone: Number(e.target.value),
                  })
                }
              />

              <button
                className="border border-gray-400 bg-blue-500 px-4 py-2 text-white hover:bg-blue-800 rounded-lg"
                type="submit"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
