import useClickOutside from "~/hooks/useClickOutside";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Reviews } from "./reviews";
import { images } from "~/services/asset.services";
import { Book } from "./book";
import { useMe } from "~/hooks/useAuth";
import { useProperties } from "~/hooks/useProperties";
import type { Property } from "~/types";

interface Props {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  propertyId: number;
}

export const Details = ({ isOpen, onClose, propertyId }: Props) => {
  const modalRef = useClickOutside({ isOpen, onClose });

  const { data } = useMe();
  const currentUser = data.user;

  const { data: pData } = useProperties();
  const properties = pData?.properties;
  const property = properties?.find((p: Property) => p?.id === propertyId);

  if (!property) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto">
          <div
            ref={modalRef}
            className="relative bg-gray-100 rounded-2xl shadow-lg w-[98%] lg:w-[650px] max-h-[90vh] overflow-y-auto scrollbar-hidden animate-fadeIn"
          >
            <div className="flex px-4 pt-4 pb-2 justify-between sticky top-0 bg-gray-100 z-10">
              <p className="font-bold text-lg">Details</p>
              <button
                onClick={() => onClose(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="flex p-1 overflow-x-auto space-x-4 mb-2">
              {(property?.imageUrls?.length ? property?.imageUrls : images).map(
                (image: string, index: number) => (
                  <div key={index} className="w-100 h-100 flex-shrink-0">
                    <img
                      src={image}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                ),
              )}
            </div>

            <div className="px-4 space-y-1">
              <p className="capitalize font-bold text-lg">{property?.title}</p>
              <p className="text-green-500 mb-2 flex items-center text-sm font-bold capitalize">
                For {property?.listingType}
              </p>
              <p className="flex gap-1 items-center text-sm text-gray-500 capitalize">
                <FaMapMarkerAlt />
                {`${property?.city}, ${property?.state}, ${property?.country}.`}
              </p>

              <div className="flex gap-1 items-center mt-2">
                <p className="text-purple-600 font-bold text-lg">
                  ₦{property?.price}
                </p>
                {property?.listingType === "rental" && (
                  <p className="text-xs text-gray-400">{`/${property?.duration}`}</p>
                )}
              </div>
              {currentUser?.id !== property?.owner.id &&
                currentUser.role !== "admin" &&
                property?.isAvailable != false && <Book property={property} />}
              <p
                className="text-gray-500 mt-2"
                style={{ whiteSpace: "pre-wrap" }}
                dangerouslySetInnerHTML={{ __html: property?.description }}
              />
            </div>

            <Reviews property={property} />
          </div>
        </div>
      )}
    </>
  );
};
