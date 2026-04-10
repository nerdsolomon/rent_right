import { useState } from "react";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";
import type { IconType } from "react-icons";
import { Options } from "./options";

interface Props {
  label: string;
  role: string;
  icon: IconType;
}

export const Users = ({ role, label, icon: Icon }: Props) => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  const { users } = useData();
  return (
    <>
      <button
        onClick={() => onClose(true)}
        className="p-4 text-gray-500 text-sm text-start font-semibold border border-gray-300 shadow hover:shadow-md transition rounded-lg h-30"
      >
        <Icon className="text-xl" />
        <p className="text-xl font-bold">
          {users.filter((user) => user.role === role).length}
        </p>
        {label}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          {/* Modal */}
          <div
            ref={modalRef}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden animate-fadeIn"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">{label}</h2>

              <button
                onClick={() => onClose(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="max-h-[70vh] overflow-y-auto divide-y divide-gray-100">
              {users.filter((user) => user.role === role).length > 0 ? (
                users
                  .filter((user) => user.role === role)
                  .map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
                    >
                      {/* Left */}
                      <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-semibold">
                          {user.firstName?.[0]}
                          {user.lastName?.[0]}
                        </div>

                        {/* Info */}
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800 capitalize">
                            {user.firstName} {user.lastName}
                          </span>
                          <span className="text-sm text-gray-500">
                            {user.email}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <Options user={user} />
                    </div>
                  ))
              ) : (
                <div className="py-10 text-center text-gray-400">
                  No users found
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
