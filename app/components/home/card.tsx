import { FaMapMarkerAlt } from "react-icons/fa";
import { Details } from "./details";
import { useState } from "react";
import { useData, type Property } from "~/hooks/useData";

export const Card = () => {
  const [isOpen, onClose] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property>();
  const { properties } = useData();

  return (
    <>
      {properties.map((property, index) => (
        <div
          key={index}
          onClick={() => {
            setSelectedProperty(property);
            onClose(true);
          }}
          className="w-full lg:w-50 bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer"
        >
          <div className="relative w-full h-44 rounded-t-lg overflow-hidden">
            <img
              src={property.imageUrl}
              className="absolute inset-0 w-full h-full object-cover"
              alt={property.title}
            />
          </div>

          <div className="p-3">
            <p className="font-semibold truncate">
              {`${property.title} : ${property.description}`}
            </p>
            <p className="text-sm flex gap-2 items-center text-gray-500 mt-1 capitalize">
              <FaMapMarkerAlt />
              {property.location}
            </p>
          </div>
        </div>
      ))}

      {isOpen && selectedProperty && (
        <Details
          isOpen={isOpen}
          onClose={() => onClose(false)}
          property={selectedProperty}
        />
      )}
    </>
  );
};
