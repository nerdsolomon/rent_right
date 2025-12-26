import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";

export const Admins = () => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  const { users, deleteUser } = useData();
  return (
    <>
      <button
        onClick={() => onClose(true)}
        className="p-4 text-gray-500 text-center font-semibold border border-gray-300 shadow hover:shadow-md transition rounded-lg h-30"
      >
        Admins
        <p>{ users.length }</p>
      </button>

      {isOpen && (
        <div className="fixed absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="relative bg-gray-100 rounded-lg shadow-lg
                 w-[95%] lg:w-[700px] max-h-[100vh]
                 overflow-y-auto animate-fadeIn scrollbar-hidden"
          >
            <div className="flex py-2 px-4 justify-between border-b border-gray-300 sticky top-0 bg-gray-100 z-10">
              <p className="font-bold text-lg">Admins</p>
              <button
                onClick={() => onClose(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="flex m-2 overflow-x-auto">
              <table className="w-full">
                <thead className="text-xs sticky top-0">
                  <th align="left" className="px-1 py-2">Name</th>
                  <th align="left" className="px-1 py-2">Email</th>
                  <th align="left" className="px-1 py-2">Phone</th>
                </thead>
                <tbody>
                  {users.map((admin, index) => (
                    <tr key={index} className="hover:bg-gray-200">
                      <td className="px-1 py-2">{`${admin.firstName} ${admin.lastName}`}</td>
                      <td className="px-1 py-2">{admin.email}</td>
                      <td className="px-1 py-2">{admin.phone}</td>
                      <td>
                        <FaTrash
                          onClick={() => deleteUser(admin.id)}
                          className="text-red-400 text-sm hover:text-red-700"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
