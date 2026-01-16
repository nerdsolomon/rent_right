import { useState } from "react";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";
import { type User } from "~/types";

interface Prop {
  user: User;
}

export const ProfileInfo = ({ user }: Prop) => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  const { isAuthenticated } = useData();

  return (
    <>
      <span
        onClick={() => {
          if (isAuthenticated) onClose(true);
        }}
        className="absolute top-3 left-3 w-8 h-8 aspect-square bg-gray-400 flex capitalize items-center justify-center border-2 border-purple-600 rounded-full font-bold text-purple-600"
      >
        {user?.imageUrl ? (
          <img
            src={user.imageUrl}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : user.company ? (
          user.company.charAt(0)
        ) : (
          `${user.firstName.charAt(0)} ${user.lastName.charAt(0)}`
        )}
      </span>

      {isOpen && (
        <div className="fixed absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-gray-100 rounded-2xl bg-purple-100 shadow-lg w-[90%] md:w-[400px] p-4 animate-fadeIn"
          >
            <div className="flex justify-end mb-2 px-2">
              <button
                onClick={() => onClose(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="flex justify-center">
              <div className="w-[25%] border-4 border-purple-600 bg-gray-400 rounded-full aspect-square flex capitalize items-center justify-center text-purple-600 text-[40px] lg:text-[50px] font-bold">
                {user?.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : user.company ? (
                  user.company.charAt(0)
                ) : (
                  `${user.firstName.charAt(0)} ${user.lastName.charAt(0)}`
                )}
              </div>
            </div>

            <span className="flex justify-center text-lg font-bold text-purple-600 p-2">
              {user.company
                ? user.company
                : `${user.firstName} ${user.lastName}`}
            </span>

            <div className="grid grid-cols-2 gap-2 items-center mt-4">
              <button className="p-2 border border-purple-600 text-sm hover:bg-purple-600 hover:text-white text-purple-600 rounded-lg font-semibold">
                Report
              </button>
              <button className="p-2 border border-purple-600 text-sm hover:bg-purple-600 hover:text-white text-purple-600 rounded-lg font-semibold">
                Message
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
