import useClickOutside from "~/hooks/useClickOutside";
import apartment_1 from "~/assets/apartment_001.jpg";
import apartment_2 from "~/assets/apartment_002.jpg";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Review } from "./review";
import type { Property } from "~/hooks/useData";

interface Props {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  property: Property;
}

export const Details = ({ isOpen, onClose, property }: Props) => {
  const modalRef = useClickOutside({ isOpen, onClose });

  const images = [apartment_1, apartment_2];

  return (
    <>
      {isOpen && (
        <div className="fixed absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="relative bg-gray-100 rounded-2xl shadow-lg
                 w-[90%] lg:w-[650px] h-screen
                 overflow-y-auto animate-fadeIn scrollbar-hidden"
          >
            <div className="flex p-4 justify-between sticky top-0 bg-gray-100 z-10">
              <p className="font-bold text-lg">{property.title}</p>
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

            <p className="text-gray-500 px-4 mt-1 capitalize">
              {property.description}
            </p>

            <p className="flex px-4 gap-2 items-center text-gray-500 mt-1 capitalize">
              <FaMapMarkerAlt />
              {property.location}
            </p>

            <Review />
          </div>
        </div>
      )}
    </>
  );
};
