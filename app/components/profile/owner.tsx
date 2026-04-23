import { useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { useMe } from "~/hooks/useAuth";
import useClickOutside from "~/hooks/useClickOutside";
import { useUpdateUser } from "~/hooks/useUsers";
import { emptyVerifyOwner } from "~/types";

export const Owner = () => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  const { data } = useMe();
  const currentUser = data?.user;
  const { mutate: updateUser, isPending } = useUpdateUser();
  const [alert, setAlert] = useState(false);
  const [formData, setFormData] = useState(emptyVerifyOwner);

  const becomeOwner = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser?.id) return;

    setFormData({ ...formData, status: "pending" });

    updateUser(
      {
        id: currentUser.id,
        data: {
          verifyOwner: formData,
        },
      },
      {
        onSuccess: () => {
          setAlert(true);
          setFormData(emptyVerifyOwner);
        },
      },
    );

    setAlert(true);
    setFormData(emptyVerifyOwner);
  };

  return (
    <>
      <div
        className="flex items-center gap-5 text-gray-400 hover:text-gray-600 cursor-pointer"
        onClick={() => onClose(true)}
      >
        <FaUserTie size={18} />
        <p>Become an owner</p>
      </div>

      {isOpen && (
        <div className="fixed absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-lg w-[95%] md:w-[700px] p-6 animate-fadeIn max-h-[90vh] overflow-y-auto scrollbar-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-bold text-lg text-purple-600">
                  Owner Verification
                </p>
                <p className="text-sm text-gray-400">
                  To be approved as an owner, your identity will need to be
                  verified through your National Identification Number. Input in
                  the fields details of yourself as it appears in your NIN.
                </p>
              </div>

              <button
                onClick={() => onClose(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {alert && (
                <div className="bg-yellow-100 rounded-lg text-sm text-gray-600 p-2">
                  Details submitted successfully. Please await Admin approval...
                </div>
              )}

              <form onSubmit={becomeOwner}>
                <div className="col-span-2">
                  <label className="text-sm text-gray-600">NIN*</label>
                  <input
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="number"
                    placeholder="NIN"
                    required
                    value={formData.NIN}
                    onChange={(e) =>
                      setFormData({ ...formData, NIN: Number(e.target.value) })
                    }
                  />
                </div>

                <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                  <div>
                    <label className="text-sm text-gray-600">First name*</label>
                    <input
                      className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      type="text"
                      placeholder="First name"
                      required
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-600">Last name*</label>
                    <input
                      className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      type="text"
                      placeholder="Last name"
                      required
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="py-2">
                  <label className="text-sm text-gray-600">
                    Date of birth*
                  </label>
                  <input
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="date"
                    placeholder="Date of birth"
                    required
                    value={formData.DoB}
                    onChange={(e) =>
                      setFormData({ ...formData, DoB: e.target.value })
                    }
                  />
                </div>

                <div className="py-2">
                  <label className="text-sm text-gray-600">Address*</label>
                  <input
                    className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="text"
                    placeholder="Address"
                    required
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </div>

                <div className="col-span-2 mt-2">
                  <button
                    disabled={isPending}
                    className="bg-purple-600 px-4 py-2 text-white w-full hover:bg-purple-800 rounded-lg disabled:opacity-50"
                    type="submit"
                  >
                    {isPending ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
