import { useState } from "react";
import { useNavigate } from "react-router";
import { useMe } from "~/hooks/useAuth";
import useClickOutside from "~/hooks/useClickOutside";
import { type User } from "~/types";

interface Prop {
  user: User;
}

export const ProfileInfo = ({ user }: Prop) => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  const { data } = useMe();
  const currentUser = data?.user
  const navigate = useNavigate()

  return (
    <>
      <span
        onClick={() => {
          if (currentUser) onClose(true);
        }}
        className="absolute top-3 left-3 w-8 h-8 cursor-pointer aspect-square flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-semibold"
      >
        {user?.imageUrls ? (
          <img
            src={user.imageUrls}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : user.company ? (
          user.company.charAt(0)
        ) : (
          `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
        )}
      </span>

      {isOpen && (
        <div className="fixed absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-gray-100 rounded-2xl shadow-lg w-[90%] md:w-[400px] p-4 animate-fadeIn"
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
              <div className="w-[25%] aspect-square flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-semibold text-[40px] lg:text-[50px]">
                {user?.imageUrls ? (
                  <img
                    src={user.imageUrls}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : user.company ? (
                  user.company.charAt(0)
                ) : (
                  `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
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
              <button onClick={() => navigate(`/portfolio/${user.id}`)} className="p-2 border border-purple-600 text-sm hover:bg-purple-600 hover:text-white text-purple-600 rounded-lg font-semibold">
                Portfolio
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
