import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";
import { type IconType } from "react-icons";

interface Props {
  label: string;
  type: string;
  icon: IconType;
}

export const Properties = ({ label, type, icon: Icon } : Props) => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  const { deleteProperty, properties } = useData();
  return (
    <>
      <button
        onClick={() => onClose(true)}
        className="p-4 text-gray-500 text-sm text-start font-semibold border border-gray-300 shadow hover:shadow-md transition rounded-lg h-30"
      >
        <Icon className="text-xl" />
        <p className="text-xl font-bold">{ properties.filter(property => property.type === type).length }</p>
        { label }
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
              <p className="font-bold text-lg">{ label }</p>
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
                  <th align="left" className="px-1 py-2">Title</th>
                  <th align="left" className="px-1 py-2">Owner</th>
                </thead>
                <tbody>
                  {properties.filter(property => property.type === type).map((property, index) => (
                    <tr key={index} className="hover:bg-gray-200">
                      <td className="px-1 py-2">{property.title}</td>
                      <td className="px-1 py-2">{property.owner}</td>
                      <td>
                        <FaTrash
                          onClick={() => deleteProperty(property.id)}
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
