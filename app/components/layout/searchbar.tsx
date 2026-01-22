import { useEffect, useRef, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";

export const Searchbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
    }
  }, [isExpanded]);

  return (
    <div className="flex items-center">
      <button
        onClick={() => setIsExpanded(true)}
        className={`lg:hidden rounded-full bg-white p-2 hover:bg-gray-100 ${
          isExpanded ? "invisible" : "visible"
        }`}
      >
        <RiSearch2Line size={20} />
      </button>

      <div
        className={`
          absolute inset-0 z-50 flex items-center pr-2
          lg:static lg:z-auto lg:flex
          ${isExpanded ? "flex" : "hidden"} lg:flex
        `}
      >
        <div className="absolute left-1/2 -translate-x-1/2 w-[90vw] lg:static lg:translate-x-0 lg:w-[600px]">
          <RiSearch2Line className="absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            onBlur={() => setIsExpanded(false)}
            className="w-full pl-10 pr-3 py-2 text-sm font-normal rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
      </div>
    </div>
  );
};
