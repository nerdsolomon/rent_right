import { useState } from "react";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";

export const BeOwner = () => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  const { currentUser, updateUser } = useData();
  const [alert, setAlert] = useState(false);

  const becomeOwner = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nin = formData.get("nin");
    updateUser({
      ...currentUser,
      NIN: Number(nin),
      role: "owner",
    });
    setAlert(true);
  };

  return (
    <>
      <div className="flex gap-4 items-center lg:block border border-gray-200 shadow-lg p-4 rounded-lg m-2 space-y-2">
        <div>
          <p className="font-bold text-lg text-gray-500">Become an Owner</p>
          <p className="text-gray-400 text-sm">
            Upload your property for sale and rent. Verify to be an owner.
          </p>
        </div>

        <button
          onClick={() => onClose(true)}
          className="bg-blue-500 text-white text-sm font-bold w-full rounded-lg py-2 hover:bg-blue-700"
        >
          Get started
        </button>
      </div>

      {isOpen && (
        <div className="fixed absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-gray-100 rounded-2xl shadow-lg w-[90%] md:w-[400px] p-6 space-y-4 animate-fadeIn"
          >
            <div className="flex justify-between">
              <p className="font-bold text-blue-500">Owner Verification</p>
              <button
                onClick={() => onClose(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-400 text-sm">
              To become an owner, you will need to be verified through your
              National Identification Number.
            </p>

            <form className="space-y-4" onSubmit={becomeOwner}>
              {alert && (
                <div className="bg-yellow-100 rounded-lg text-sm text-gray-500 p-2">
                  Verification complete, you're now an owner!
                </div>
              )}
              <input
                className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="NIN"
                name="nin"
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-10 py-2 bg-blue-500 text-sm hover:bg-blue-700 text-white rounded-lg font-semibold"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
