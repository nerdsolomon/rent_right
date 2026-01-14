import { FaHeart, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { Details } from "./details";
import { useState } from "react";
import { useData } from "~/hooks/useData";
import type { Property } from "~/types";

interface Prop {
  property: Property;
}

export const PropertyCard = ({ property }: Prop) => {
  const [isOpen, onClose] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property>();

  return (
    <>
      <a
        onClick={() => {
          setSelectedProperty(property);
          onClose(true);
        }}
        className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-600"
      >
        <div className="relative h-48">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Featured
          </span>

          <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow text-gray-700 group-hover:text-red-500 transition">
            <FaHeart />
          </div>

          <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 text-black shadow">
            <FaStar className="text-yellow-500" /> {property.rating}
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-1">
            {property.title}
          </h3>

          <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
            <FaMapMarkerAlt />
            {`${property.city}, ${property.state}, ${property.country}.`}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 font-bold text-lg">
                ${property.price}
              </p>
              <p className="text-xs text-gray-400">/year</p>
            </div>

            <span className="text-purple-600 text-xs font-semibold border border-purple-600 px-3 py-1 rounded-full group-hover:bg-purple-50 transition">
              View Details
            </span>
          </div>
        </div>
      </a>

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
