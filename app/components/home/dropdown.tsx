import { useState } from "react";
import useClickOutside from "~/hooks/useClickOutside";

interface Prop {
  label: string;
  value: string;
  list: string[];
  onSelect: (value: string) => void;
}

const Dropdown = ({ label, value, list, onSelect }: Prop) => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  return (
    <div ref={modalRef} className="relative inline-block text-left">
      <button
        onClick={() => onClose(true)}
        className="border text-xs capitalize px-2 py-1 rounded-full text-gray-400 hover:bg-blue-400 hover:text-white"
      >
        {value || label}
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-35 origin-top-right h-40 overflow-y-auto scrollbar-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-200 ring-opacity-5 pointer-events-auto">
          <div className="py-1 text-xs text-gray-700">
            <button
              key="all"
              onClick={() => {
                onSelect("");
                onClose(false);
              }}
              className="block w-full px-4 py-2 capitalize text-left hover:bg-gray-100"
            >
              All
            </button>
            {list.map((item) => (
              <button
                key={item}
                onClick={() => {
                  onSelect(item);
                  onClose(false);
                }}
                className="block w-full px-4 py-2 capitalize text-left hover:bg-gray-100"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
