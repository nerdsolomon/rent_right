import useClickOutside from "~/hooks/useClickOutside";
import { FaMapMarkerAlt, FaTrash } from "react-icons/fa";
import { Review } from "./review";
import { useData } from "~/hooks/useData";
import type { Property } from "~/types";
import { images } from "~/services/asset.services";

interface Props {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  property: Property;
}

export const Details = ({ isOpen, onClose, property }: Props) => {
  const modalRef = useClickOutside({ isOpen, onClose });
  const { deleteProperty, currentUser } = useData();
  return (
    <>
      {isOpen && (
        <div className="fixed absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="relative bg-gray-100 rounded-2xl shadow-lg
                 w-[90%] lg:w-[650px] max-h-[100vh]
                 overflow-y-auto animate-fadeIn scrollbar-hidden"
          >
            <div className="flex p-4 justify-between sticky top-0 bg-gray-100 z-10">
              <p className="font-bold text-lg">Details</p>
              <button
                onClick={() => onClose(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="flex p-4 overflow-x-auto space-x-4 mb-2">
              {images.map((image, index) => (
                <img key={index} src={image} className="w-100" />
              ))}
            </div>

            <div className="flex justify-between text-lg font-bold px-4">
              <p className="capitalize">{property.title}</p>
              <p className="text-green-500">${property.price}/month</p>
            </div>

            <p className="text-gray-500 px-4 mt-1 capitalize">
              {property.description}
            </p>

            <div className="flex justify-between px-4 text-sm ">
              <p className="flex gap-1 items-center text-gray-500 capitalize">
                <FaMapMarkerAlt />
                {`${property.city}, ${property.state}, ${property.country}.`}
              </p>

              {currentUser.role === "owner" && (
                <FaTrash
                  onClick={() => {
                    deleteProperty(property.id);
                    onClose(false);
                  }}
                  className="text-red-400 hover:text-red-700"
                />
              )}
            </div>

            <Review propertyId={property.id} />
          </div>
        </div>
      )}
    </>
  );
};
