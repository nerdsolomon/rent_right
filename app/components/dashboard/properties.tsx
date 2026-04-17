import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import useClickOutside from "~/hooks/useClickOutside";
import { type IconType } from "react-icons";
import { useDeleteProperty, useProperties } from "~/hooks/useProperties";
import type { Property } from "~/types";

interface Props {
  label: string;
  type: string;
  icon: IconType;
}

export const Properties = ({ label, type, icon: Icon }: Props) => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  
  const { data } = useProperties()
  const properties = data?.properties ?? []
  const { mutate: deleteProperty } = useDeleteProperty()
  return (
    <>
      <button
        onClick={() => onClose(true)}
        className="p-4 text-gray-500 text-sm text-start font-semibold border border-gray-300 shadow hover:shadow-md transition rounded-lg h-30"
      >
        <Icon className="text-xl" />
        <p className="text-xl font-bold">
          {properties.filter((property: Property) => property.type === type).length}
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
            <div className="max-h-[70vh] overflow-y-auto">
              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  {/* Header */}
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
                    <tr>
                      <th className="text-left px-4 py-3">Title</th>
                      <th className="text-left px-4 py-3">Owner</th>
                      <th className="text-right px-4 py-3">Actions</th>
                    </tr>
                  </thead>

                  {/* Body */}
                  <tbody className="divide-y divide-gray-100">
                    {properties.filter((p: Property) => p.type === type).length > 0 ? (
                      properties
                        .filter((property: Property) => property.type === type)
                        .map((property: Property, index: number) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-50 transition"
                          >
                            <td className="px-4 py-3 font-medium capitalize text-gray-800">
                              {property.title}
                            </td>

                            <td className="px-4 py-3 text-gray-600">
                              {property.owner.company
                                ? property.owner.company
                                : `${property.owner.firstName} ${property.owner.lastName}`}
                            </td>

                            <td className="px-4 py-3 text-right">
                              <button
                                onClick={() => deleteProperty(property.id)}
                                className="p-2 rounded-md hover:bg-red-50 transition group"
                              >
                                <FaTrash className="text-red-400 group-hover:text-red-600 text-sm" />
                              </button>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="text-center py-8 text-gray-400"
                        >
                          No properties found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
