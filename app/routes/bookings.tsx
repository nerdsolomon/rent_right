import { FaCalendarAlt } from "react-icons/fa";
import { useData } from "~/hooks/useData";
import { usePageTitle } from "~/hooks/usePageTitle";
import { RequireAuth } from "~/hooks/useRequireAuth";

const Bookings = () => {
  usePageTitle("RentRight - Bookings");
  const { bookings } = useData();

  return (
    <RequireAuth>
      <div className="space-y-2">
              {bookings.length > 0 ? (
                bookings.map((b, index) => (
                  <div
                    key={index}
                    className="p-2 flex items-center w-full text-sm mb-2 border-b border-gray-300"
                  >
                    <div className="items-center">
                      <span className="font-bold mr-2 capitalize">{b.property.title}</span>
                      <p>{b.day}</p>
                      <p>{b.time}</p>
                      <p className="capitalize">{b.user.firstName}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="mt-40">
                  <div className="flex justify-center">
                    <FaCalendarAlt size={40} className="text-gray-300 mb-5" />
                  </div>
                  <p className="text-center font-bold text-[22px] text-gray-300">
                    No bookings
                  </p>
                </div>
              )}
            </div>
    </RequireAuth>
  );
};

export default Bookings;
