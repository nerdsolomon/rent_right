import { FaMapMarkerAlt } from "react-icons/fa";
import apartment_1 from "~/assets/apartment_001.jpg";
import apartment_2 from "~/assets/apartment_002.jpg";

export const Card = () => {
  let properties = [
    { imageUrl: apartment_1, title: "Condo", description: "2 Bedroom", location: "Apapa" },
    { imageUrl: apartment_2, title: "Condo", description: "1 Bedroom", location: "Lekki" },
    { imageUrl: apartment_1, title: "Condo", description: "2 Bedroom", location: "Apapa" },
    { imageUrl: apartment_2, title: "Condo", description: "1 Bedroom", location: "Lekki" },
    { imageUrl: apartment_1, title: "Condo", description: "2 Bedroom", location: "Apapa" },
    { imageUrl: apartment_2, title: "Condo", description: "1 Bedroom", location: "Lekki" }
  ];

  return (
    <>
      {properties.map((property, index) => (
        <div
          key={index}
          className="w-[100%] lg:w-50 bg-white rounded-lg shadow hover:shadow-md transition flex-shrink-0"
        >
          <div className="relative w-full h-44 rounded-t-lg overflow-hidden">
            <img
              src={property.imageUrl}
              className="absolute inset-0 w-full h-full object-cover"
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
    </>
  );
};
