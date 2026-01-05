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
        <div className="fixed absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="relative bg-gray-100 rounded-lg shadow-lg
                 w-[95%] lg:w-[700px] max-h-[100vh]
                 animate-fadeIn scrollbar-hidden"
          >
            <div className="flex py-2 px-4 justify-between rounded-lg border-b border-gray-300 sticky top-0 bg-gray-100 z-10">
              <p className="font-bold text-lg">{label}</p>
              <button
                onClick={() => onClose(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            {users
              .filter((user) => user.role === role)
              .map((user, index) => (
                <div
                  key={index}
                  className="w-full flex items-center px-4 rounded-lg justify-between hover:bg-gray-200"
                >
                  <div className="py-1 capitalize">{`${user.firstName} ${user.lastName}`}</div>
                  <Options userId={user.id}/>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};
