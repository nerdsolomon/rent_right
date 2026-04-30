import { useState, type SetStateAction } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import BookingItem from "~/components/booking/bookingitem";
import { Details } from "~/components/home/details";
import { useMe } from "~/hooks/useAuth";
import { useMyBookings } from "~/hooks/useBookings";
import { usePageTitle } from "~/hooks/usePageTitle";
import { useProperties } from "~/hooks/useProperties";
import { RequireAuth } from "~/hooks/useRequireAuth";
import type { Booking, Property } from "~/types";

const Bookings = () => {
  usePageTitle("Axterra - Bookings");

  const { data: bData } = useMyBookings();
  const bookings = bData?.bookings ?? [];

  const { data: uData } = useMe();
  const currentUser = uData?.user;

  const { data: pData } = useProperties();
  const properties = pData?.properties;

  const [isOpen, onClose] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number>();

  if (!currentUser) return null;

  const filteredBookings = bookings.filter((booking: Booking) => {
    if (currentUser.role === "owner") {
      const property = properties?.find((p: Property) => p?.id === booking.propertyId);
      return property.userId === currentUser.id;
    }

    if (currentUser.role === "user") {
      return booking.userId === currentUser.id;
    }

    return false;
  });

  return (
    <RequireAuth>
      <div className="w-full mt-4">
        {filteredBookings.length > 0 ? (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <div className="min-w-[650px]">
                {/* Header */}
                <div
                  className={`grid bg-gray-100 text-gray-600 text-xs font-semibold uppercase p-3 ${
                    currentUser.role === "owner" ? "grid-cols-6" : "grid-cols-5"
                  }`}
                >
                  <span>Property</span>
                  <span>Date</span>
                  <span>Time</span>
                  {currentUser.role === "owner" && <span>User</span>}
                  <span>Status</span>
                  <span className="text-right">Actions</span>
                </div>

                {/* Rows */}
                {filteredBookings.map((b: Booking) => (
                  <BookingItem
                    key={b.id}
                    booking={b}
                    currentUser={currentUser}
                    onSelect={(propertyId: number) => {
                      setSelectedPropertyId(propertyId);
                      onClose(true);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-40 text-center">
            <FaCalendarAlt size={40} className="text-gray-300 mb-5 mx-auto" />
            <p className="font-bold text-[22px] text-gray-300">No bookings</p>
          </div>
        )}
      </div>

      {isOpen && selectedPropertyId && (
        <Details
          isOpen={isOpen}
          onClose={() => onClose(false)}
          propertyId={selectedPropertyId}
        />
      )}
    </RequireAuth>
  );
};

export default Bookings;
