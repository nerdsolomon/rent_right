

export default function HeroSection() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  return (
    <section className="bg-[#faf7fb] px-4 sm:px-6 md:px-8 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-7xl mx-auto">

        {/* LEFT */}
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
            RentRight connects tenants and landlords seamlessly. Browse thousands of verified listings, message owners directly, and manage payments all in one place.
          </p>

          {/* Search Box */}
          <div className="bg-white rounded-3xl p-4 shadow-lg max-w-xl">
            <div className="flex items-center gap-4">
              <div className="flex items-center flex-1 bg-purple-50 rounded-full px-5 py-3">
                <span className="text-purple-600 mr-3">📍</span>
                <input
                  type="text"
                  placeholder="Enter city, neighborhood, or address"
                  className="w-full outline-none text-sm sm:text-base placeholder-gray-400 bg-transparent text-gray-800"
                />
              </div>

              <button className="text-purple-600 border border-purple-600 px-6 py-2 rounded-full text-sm font-semibold hover:bg-purple-200 transition">
                Search
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {["Apartment", "Houses", "Pet Friendly", "Furnished"].map(
                (item, i) => (
                  <button
                    key={i}
                    className="bg-gray-100 hover:bg-purple-100 hover:text-purple-700 transition px-4 py-2 rounded-full text-xs sm:text-sm text-gray-700 font-medium"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative">
          <ImageCarousel />
        </div>
      </div>

      {/* STATS */}
      <div
        ref={ref}
        className="flex flex-wrap gap-8 mt-12 max-w-7xl mx-auto"
      >
        {[
          { value: 50000, label: "Properties", suffix: "+" },
          { value: 100000, label: "Happy Tenants", suffix: "+" },
          { value: 10000, label: "Landlords", suffix: "+" },
          { value: 98, label: "Satisfaction", suffix: "%" },
        ].map((stat, i) => (
          <div key={i}>
            <h3 className="text-3xl font-extrabold text-purple-600">
              {inView && (
                <CountUp
                  start={0}
                  end={stat.value}
                  duration={1.4}
                  separator=","
                />
              )}
              {stat.suffix}
            </h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
