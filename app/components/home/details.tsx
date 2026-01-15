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
                 w-[98%] lg:w-[650px] max-h-[100vh]
                 overflow-y-auto animate-fadeIn scrollbar-hidden"
          >
            <div className="flex px-4 pt-2 justify-between sticky top-0 bg-gray-100 z-10">
              <p className="font-bold text-lg">Details</p>
              <button
                onClick={() => onClose(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="flex p-1 overflow-x-auto space-x-4 mb-2">
              {images.map((image, index) => (
                <img key={index} src={image} className="w-100" />
              ))}
            </div>

            <div className="px-4 space-y-1">
              <p className="capitalize font-bold text-lg">{property.title}</p>
              <p className="flex gap-1 items-center text-sm text-gray-500 capitalize">
                <FaMapMarkerAlt />
                {`${property.city}, ${property.state}, ${property.country}.`}
              </p>
              <div className="flex gap-1 items-center mt-2">
                <p className="text-purple-600 font-bold text-lg">
                  ${property.price}
                </p>
                <p className="text-xs text-gray-400">/year</p>
              </div>
              <p className="text-gray-500 mt-2">{property.description}</p>
            </div>

            <Review propertyId={property.id} />
          </div>
        </div>
      )}
    </>
  );
};
