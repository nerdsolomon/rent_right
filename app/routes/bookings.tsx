import { useState, type SetStateAction } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import BookingItem from "~/components/booking/bookingitem";
import { Details } from "~/components/home/details";
import { useMe } from "~/hooks/useAuth";
import { useMyBookings, useUpdateBooking } from "~/hooks/useBookings";
import { useCreateNotification } from "~/hooks/useNotifications";
import { usePageTitle } from "~/hooks/usePageTitle";
import { RequireAuth } from "~/hooks/useRequireAuth";
import type { Booking } from "~/types";

const Bookings = () => {
  usePageTitle("RentRight - Bookings");

  const { data: bData } = useMyBookings();
  const bookings = bData?.bookings ?? [];

  const { data: uData } = useMe();
  const currentUser = uData?.user;

  const { mutate: updateBooking } = useUpdateBooking();
  const { mutate: createNotification } = useCreateNotification();

  const [isOpen, onClose] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number>();

  if (!currentUser) return null;

  const handleAccept = (booking: Booking) => {
    updateBooking({
      id: booking.id!,
      data: { status: "accepted" },
    });

    createNotification({
      userId: booking.userId,
      message: `Your booking to inspect '${booking.propertyId}' has been accepted.`,
      datetime: new Date().toISOString(),
      isRead: false,
    });
  };

  const handleCancel = (booking: Booking) => {
    updateBooking({
      id: booking.id!,
      data: { status: "cancelled" },
    });

    createNotification({
      userId: booking.userId,
      message: `Your booking to inspect '${booking.propertyId}' was cancelled.`,
      datetime: new Date().toISOString(),
      isRead: false,
    });
  };

  const filteredBookings = bookings.filter((booking: Booking) => {
    if (currentUser.role === "owner") {
      return booking.propertyId === currentUser.id;
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
                    onAccept={handleAccept}
                    onCancel={handleCancel}
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
