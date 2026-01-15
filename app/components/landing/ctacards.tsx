import { FaCircleUser } from "react-icons/fa6";
import { MdApartment, MdLandscape } from "react-icons/md";

export default function CTACards() {
  return (
    <section className="px-4 sm:px-6 md:px-8 py-14 md:py-20 bg-purple-600">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-14">
          <div className="relative rounded-[28px] border border-white/30 bg-white/15 hover:bg-white/20 transition p-8 md:p-10">
            <div className="w-12 h-12 text-white rounded-xl bg-white/25 flex items-center justify-center mb-5">
              <MdApartment size={30}/>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3">
              Looking for a Home?
            </h3>

            <p className="text-white/90 text-sm leading-relaxed mb-8 max-w-sm">
              Browse thousands of verified rentals, connect with landlords
              directly, and find your perfect place to call home. Your dream
              rental is just a few clicks away.
            </p>

            <button className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-100 transition">
              Find Rentals List <span className="text-lg">→</span>
            </button>
          </div>

          <div className="relative rounded-[28px] border border-white/30 bg-white/15 hover:bg-white/20 transition p-8 md:p-10">
            <div className="w-12 h-12 text-white rounded-xl bg-white/25 flex items-center justify-center mb-5">
              <MdLandscape size={30}/>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3">
              Own a Property?
            </h3>

            <p className="text-white/90 text-sm leading-relaxed mb-8 max-w-sm">
              List your property for free, screen qualified tenants, and collect
              rent seamlessly. Join thousands of landlords who trust RentRight
              to manage their rentals.
            </p>

            <button className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-100 transition">
              Property <span className="text-lg">→</span>
            </button>
          </div>
        </div>

        {/* Users Section */}
        <div className="text-center">
          <p className="text-white/90 text-sm mb-4">
            Join over 100,000 happy users on RentRight
          </p>

          <div className="flex items-center justify-center gap-3">
            <div className="flex -space-x-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <FaCircleUser key={i} size={20} className="text-white"/>
              ))}
            </div>

            <span className="text-white font-semibold text-sm">
              + 100K Users
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
