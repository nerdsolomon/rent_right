import { useData } from "~/hooks/useData";
import ImageCarousel from "./carousel";

export default function HeroSection() {
  const { properties, users } = useData();
  return (
    <section className="bg-[#faf7fb] px-4 sm:px-6 md:px-8 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-7xl mx-auto">
        <div>
          <div className="mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Find Your
            </h2>
            <div className="w-20 h-1 bg-purple-600 rounded mt-2" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            <span className="text-purple-600 block">Perfect Rental</span>
            <span className="text-gray-900 block">Home Today</span>
          </h1>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mb-8 leading-relaxed">
            RentRight connects tenants and landlords seamlessly. Browse
            thousands of verified listings, message owners directly, and manage
            payments all in one place.
          </p>

          <div className="flex flex-wrap gap-8 max-w-7xl mx-auto">
            {[
              { value: properties.length, label: "Properties", suffix: "+" },
              { value: users.length, label: "Members", suffix: "+" },
              { value: users.filter((u) => u.role === "owner").length, label: "Landlords", suffix: "+" },
            ].map((stat, i) => (
              <div key={i}>
                <h3 className="text-3xl font-extrabold text-purple-600">
                  {stat.suffix} {stat.value}
                </h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <ImageCarousel />
        </div>
      </div>
    </section>
  );
}
