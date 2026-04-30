import { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useMe } from "~/hooks/useAuth";
import useClickOutside from "~/hooks/useClickOutside";
import { useUpdateUser } from "~/hooks/useUsers";
import { emptyUser } from "~/types";

export const Edit = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useClickOutside({ isOpen, setIsOpen });

  const { data } = useMe();
  const currentUser = data?.user;

  const { mutate: updateUser, error } = useUpdateUser();

  const [alert, setAlert] = useState(false);

  // ✅ NEW: store actual file + preview URL
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const fileRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState(emptyUser);

  useEffect(() => {
    if (currentUser) {
      setFormData(currentUser);
    }
  }, [currentUser]);

  const editUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData();

    form.append("firstName", formData.firstName);
    form.append("lastName", formData.lastName);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("company", formData.company || "");

    // ✅ send actual file (NOT base64)
    if (file) {
      form.append("image", file);
    }

    updateUser({
      id: currentUser.id,
      data: form,
    });

    setAlert(true);
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-1 border border-purple-600 text-xs hover:bg-purple-600 text-purple-600 hover:text-white rounded-lg font-semibold"
      >
        Edit profile
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-lg w-[95%] md:w-[700px] p-6 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
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
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Image */}
              <div className="flex flex-col items-center md:w-[30%]">
                <div className="relative inline-block">
                  <div className="w-28 h-28 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-semibold text-[40px] overflow-hidden">
                    {preview || currentUser?.imageUrl ? (
                      <img
                        src={preview || currentUser?.imageUrl}
                        className="w-full h-full object-cover"
                      />
                    ) : currentUser?.company ? (
                      currentUser.company.charAt(0)
                    ) : (
                      `${currentUser?.firstName?.charAt(0) || ""}${
                        currentUser?.lastName?.charAt(0) || ""
                      }`
                    )}
                  </div>

                  <div
                    onClick={() => fileRef.current?.click()}
                    className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 text-purple-600 cursor-pointer"
                  >
                    <FaCamera />
                    <input
                      className="hidden"
                      type="file"
                      accept="image/*"
                      ref={fileRef}
                      onChange={(e) => {
                        const selectedFile = e.target.files?.[0];
                        if (!selectedFile) return;

                        setFile(selectedFile);

                        // ✅ preview without base64
                        setPreview(URL.createObjectURL(selectedFile));
                      }}
                    />
                  </div>
                </div>

                <p className="text-xs text-gray-400 mt-3 capitalize">
                  {(currentUser?.role === "owner" && "Landlord") ||
                    currentUser?.role}
                </p>
              </div>

              {/* Form */}
              <form
                className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4"
                onSubmit={editUser}
              >
                {alert && (
                  <div className="col-span-2 bg-yellow-100 text-sm text-gray-600 p-2 rounded">
                    Profile updated
                  </div>
                )}

                {error && (
                  <div className="col-span-2 bg-red-100 text-red-600 text-sm p-2 rounded">
                    {(error as Error).message}
                  </div>
                )}

                <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">First Name</label>
                    <input
                      className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Last Name</label>
                    <input
                      className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
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
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        company: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-sm text-gray-600">Email</label>
                  <input
                    className="p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center w-full"
                    type="email"
                    required
                    disabled
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-span-2">
                  <label className="text-sm text-gray-600">Phone Number</label>
                  <div className="flex gap-2">
                    <div className="w-1/5 p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                      +234
                    </div>

                    <input
                      className="w-2/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>
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
