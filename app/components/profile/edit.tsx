import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";

export const Edit = () => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  const { currentUser, updateUser } = useData();
  const [alert, setAlert] = useState(false);
  const [prevImage, setPrevImage] = useState("");
  const prevImageRef = useRef<HTMLInputElement | null>(null);

  const editUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUser({ ...currentUser, imageUrl: prevImage });
    setAlert(true);
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={() => onClose(true)}
        className="px-4 py-1 border border-purple-600 text-xs hover:bg-purple-600 text-purple-600 hover:text-white rounded-lg font-semibold"
      >
        Edit profile
      </button>

      {isOpen && (
        <div className="fixed absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-lg w-[95%] md:w-[700px] p-6 animate-fadeIn max-h-[90vh] overflow-y-auto scrollbar-hidden"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="font-bold text-lg text-purple-600">
                  Personal Information
                </p>
                <p className="text-xs text-gray-400">
                  Update your personal details
                </p>
              </div>

              <button
                onClick={() => onClose(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:w-[30%]">
                <div className="relative inline-block">
                  <div className="w-30 h-30 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-semibold text-[40px] lg:text-[50px] overflow-hidden">
                    {currentUser?.imageUrl || prevImage ? (
                      <img
                        src={currentUser.imageUrl || prevImage}
                        className="w-full h-full object-cover"
                      />
                    ) : currentUser.company ? (
                      currentUser.company.charAt(0)
                    ) : (
                      `${currentUser.firstName.charAt(0)}${currentUser.lastName.charAt(0)}`
                    )}
                  </div>

                  <div
                    onClick={() => prevImageRef.current?.click()}
                    className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 text-purple-600 w-6 h-6 flex items-center justify-center"
                  >
                    <FaCamera />
                    <input
                      className="hidden"
                      type="file"
                      accept="image/*"
                      ref={prevImageRef}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onload = () => setPrevImage(reader.result);
                        reader.readAsDataURL(file);
                      }}
                    />
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-3 capitalize">
                  {(currentUser.role == "owner" && "Landlord") ||
                    currentUser.role}
                </p>
              </div>

              <form
                className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4"
                onSubmit={editUser}
              >
                {alert && (
                  <div className="col-span-2 bg-yellow-100 rounded-lg text-sm text-gray-500 p-2">
                    Profile updated
                  </div>
                )}

                <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">First Name</label>
                    <input
                      className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      type="text"
                      required
                      value={currentUser.firstName}
                      onChange={(e) =>
                        updateUser({
                          ...currentUser,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Last Name</label>
                    <input
                      className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      type="text"
                      required
                      value={currentUser.lastName}
                      onChange={(e) =>
                        updateUser({
                          ...currentUser,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="text-sm text-gray-600">
                    Company (Optional)
                  </label>
                  <input
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    type="text"
                    value={currentUser.company}
                    onChange={(e) =>
                      updateUser({
                        ...currentUser,
                        company: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-sm text-gray-600">Email</label>
                  <input
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    type="email"
                    required
                    value={currentUser.email}
                    onChange={(e) =>
                      updateUser({
                        ...currentUser,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-sm text-gray-600">Phone Number</label>
                  <input
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    type="number"
                    required
                    value={currentUser.phone}
                    onChange={(e) =>
                      updateUser({
                        ...currentUser,
                        phone: Number(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="col-span-2">
                  <button
                    className="bg-purple-600 px-4 py-2 text-white hover:bg-purple-800 rounded-lg"
                    type="submit"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
