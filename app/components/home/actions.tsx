import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";
import type { Property } from "~/types";

interface Prop {
  property: Property;
}

export const Actions = ({ property }: Prop) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteProperty } = useData();
  const modalRef = useClickOutside({ isOpen, onClose: setIsOpen });

  return (
    <div ref={modalRef} className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-sm text-purple-600"
      >
        <FaEllipsisV />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-0 z-[9999] w-40 rounded-lg bg-white shadow-md">
          <div className="py-1 text-xs text-gray-700">
            <button className="block w-full px-4 py-2 text-left rounded-lg hover:bg-gray-100">
              Edit
            </button>
            <button className="block w-full px-4 py-2 text-left rounded-lg hover:bg-gray-100">
              {property.isAvailable ? "Make Unavailable" : "Make Available"}
            </button>

            <button
              onClick={() => {
                deleteProperty(property.id);
                setIsOpen(false);
              }}
              className="block w-full px-4 capitalize py-2 text-left rounded-lg hover:bg-gray-100 text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
