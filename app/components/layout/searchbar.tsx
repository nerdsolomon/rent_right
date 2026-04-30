import { useEffect, useMemo, useRef, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { useProperties } from "~/hooks/useProperties";
import { PropertyCard } from "../home/propertycard";
import type { Property } from "~/types";

export const Searchbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const { data } = useProperties();
  const properties: Property[] = data?.properties ?? [];

  const filteredProperties = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();

    return properties.filter((p: Property) =>
      [p.title, p.city, p.state, p.type, p.listingType, p.duration]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(q)),
    );
  }, [properties, query]);

  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="flex items-center">
      <button
        onClick={() => {
          setIsExpanded(true);
          inputRef.current?.focus();
        }}
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
            value={query}
            placeholder="Search"
            onFocus={() => setIsExpanded(true)}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 text-sm font-normal rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>
      </div>

      {isExpanded && query.trim() && (
        <div className="fixed inset-0 z-[60] flex justify-center mt-15">
          <div className="w-[95%] md:w-[700px] bg-white rounded-xl shadow-lg h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-3 border-b border-gray-200 mb-3">
              <span className="text-sm font-medium text-gray-600">
                Search results
              </span>

              <button
                onClick={() => {
                  setQuery("");
                  setIsExpanded(false);
                  inputRef.current?.blur();
                }}
                className="text-sm text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
                {filteredProperties.map((property: Property, index: number) => (
                  <PropertyCard property={property} key={index} />
                ))}
              </div>
            ) : (
              <div className="p-3 text-sm text-gray-500">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
