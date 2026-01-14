import { useData } from "~/hooks/useData";
import { PropertyCard } from "../home/propertycard";

export default function FeaturedProperties() {
  const { properties } = useData();

  if (properties.length == 0) return null;

  return (
    <section className="px-4 sm:px-6 md:px-8 py-10 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.slice(0, 4).map((property, index) => (
            <PropertyCard property={property} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
