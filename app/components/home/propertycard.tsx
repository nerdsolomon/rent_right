import { FaMapMarkerAlt } from "react-icons/fa";
import { Details } from "./details";
import { useState } from "react";
import profileImg from "~/assets/profile.png";
import type { Property } from "~/types";
import { Actions } from "./actions";
import { useData } from "~/hooks/useData";
import { ProfileInfo } from "./profileinfo";

interface Prop {
  property: Property;
}

export const PropertyCard = ({ property }: Prop) => {
  const [isOpen, onClose] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property>();
  const { currentUser, isAuthenticated } = useData();

  return (
    <>
      <a className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-600">
        <div className="relative h-48">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          <ProfileInfo user={property.owner} />

          {currentUser.role === "owner" && isAuthenticated && (
            <div className="absolute top-3 right-3">
              <Actions property={property} />
            </div>
          )}

          <div className="absolute bottom-3 left-3 bg-purple-600 text-white px-2 py-1 rounded-full text-xs shadow">
            {property.isAvailable ? "Available" : "Unavailable"}
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold capitalize text-gray-900 text-base mb-1 line-clamp-1">
            {property.title}
          </h3>

          <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
            <FaMapMarkerAlt />
            {`${property.city}, ${property.state}, ${property.country}.`}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex gap-1 items-center">
              <p className="text-purple-600 font-bold text-lg">
                ${property.price}
              </p>
              <p className="text-xs text-gray-400">/year</p>
            </div>

            <span
              onClick={() => {
                setSelectedProperty(property);
                onClose(true);
              }}
              className="text-purple-600 text-xs font-semibold border border-purple-600 px-3 py-2 rounded-full group-hover:bg-purple-50 transition"
            >
              View Details
            </span>
          </div>
        </div>
      </a>

      {isOpen && selectedProperty && isAuthenticated && (
        <Details
          isOpen={isOpen}
          onClose={() => onClose(false)}
          property={selectedProperty}
        />
      )}
    </>
  );
};
