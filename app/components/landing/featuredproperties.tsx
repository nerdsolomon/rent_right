import { FaMapMarkerAlt } from "react-icons/fa";
import { images } from "~/services/asset.services";

export default function FeaturedProperties() {
  const properties = [
    {
      id: 1,
      title: "Modern Downtown Loft",
      location: "123 Main St, San Lekki, Lagos",
      rating: 4.9,
      price: 3500,
      badge: "Featured",
      image: images[0],
      href: "/properties/1",
    },
    {
      id: 2,
      title: "Cozy Garden Apartment",
      location: "125 Main St, Lekki, Lagos",
      rating: 4.7,
      price: 2800,
      badge: "Featured",
      image: images[0],
      href: "/properties/2",
    },
    {
      id: 3,
      title: "Luxury Penthouse Suite",
      location: "12 Soy Tower, Ikoyi, Lagos",
      rating: 5.0,
      price: 8500,
      badge: "Featured",
      image: images[0],
      href: "/properties/3",
    },
    {
      id: 4,
      title: "Charming Victorian Home",
      location: "321 Heritage 3, Island, Lagos",
      rating: 4.8,
      price: 4200,
      badge: "New",
      image: images[0],
      href: "/properties/4",
    },
  ];

  return (
    <section className="px-4 sm:px-6 md:px-8 py-10 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property) => (
            <a
              key={property.id}
              href={property.href}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              {/* Image */}
              <div className="relative h-48">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badge */}
                <span className="absolute top-3 left-3 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {property.badge}
                </span>

                {/* Heart */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow text-gray-700 group-hover:text-red-500 transition">
                  ♥
                </div>

                {/* Rating */}
                <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 text-black shadow">
                  ⭐ {property.rating}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-base mb-1 line-clamp-1">
                  {property.title}
                </h3>

                <p className="text-gray-500 text-sm mb-4 flex items-center gap-1">
                  <FaMapMarkerAlt /> {property.location}
                </p>

                {/* Footer */}
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
          ))}
        </div>

      </div>
    </section>
  );
}
