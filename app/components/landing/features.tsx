import {
  FaSearch,
  FaComments,
  FaCreditCard,
  FaCheck,
  FaUserCheck,
  FaBell,
} from 'react-icons/fa';


export default function Features() {
  const features = [
  {
    id: 1,
    icon: FaSearch,
    title: 'Smart Search',
    description:
      'Find properties with advanced filters for location, price, amenities, and more.',
  },
  {
    id: 2,
    icon: FaComments,
    title: 'Direct Messaging',
    description: 'Chat directly with landlords and tenants in real time.',
  },
  {
    id: 3,
    icon: FaCreditCard,
    title: 'Easy Payments',
    description: 'Pay rent securely with multiple payment options.',
  },
  {
    id: 4,
    icon: FaCheck,
    title: 'Verified Listings',
    description: 'All properties are verified to ensure authenticity and safety.',
  },
  {
    id: 5,
    icon: FaUserCheck,
    title: 'Tenant Screening',
    description: 'Comprehensive screening to protect both tenants and landlords.',
  },
  {
    id: 6,
    icon: FaBell,
    title: 'Smart Alerts',
    description:
      'Get instant notifications when new properties match your preferences.',
  },
];


  return (
    <section className="bg-[#f7f3fb] px-4 sm:px-6 md:px-8 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-purple-600 font-semibold text-xs tracking-widest uppercase mb-3">
            Features
          </p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
            <span className="text-black">Everything You Need To </span>
            <span className="bg-gradient-to-r from-purple-800 to-pink-700 bg-clip-text text-transparent font-semibold">
              Rent Smarter
            </span>
          </h2>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg">
            RentRight provides all the tools you need for a seamless rental
            experience, whether you’re a tenant or a landlord.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group bg-white rounded-2xl p-6 md:p-8 shadow-sm
                         hover:bg-purple-200 hover:shadow-md transition duration-300"
            >
              {/* Icon (NO hover effect) */}
              <div className="w-12 h-12 rounded-xl bg-gray-100 text-purple-600 flex items-center justify-center mb-5">
                <feature.icon size={22} />
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
