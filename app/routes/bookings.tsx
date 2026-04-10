import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { Details } from "~/components/home/details";
import { useData } from "~/hooks/useData";
import { usePageTitle } from "~/hooks/usePageTitle";
import { RequireAuth } from "~/hooks/useRequireAuth";
import type { Booking, Property } from "~/types";

const Bookings = () => {
  usePageTitle("RentRight - Bookings");
  const {
    bookings,
    currentUser,
    updateBooking,
    setNotifications,
    notifications,
  } = useData();
  const [isOpen, onClose] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property>();

  const handleAccept = (booking: Booking) => {
    updateBooking({ ...booking, status: "accepted" });

    setNotifications([
      ...notifications,
      {
        id: Math.random(),
        datetime: new Date().toISOString(),
        isRead: false,
        userId: booking.user.id,
        message: `Your booking to inspect '${booking.property.title}' have been accepted. Go to Bookings for more details.`,
      },
    ]);
  };

  const handleCancel = (booking: Booking) => {
    updateBooking({ ...booking, status: "cancelled" });

    setNotifications([
      ...notifications,
      {
        id: Math.random(),
        datetime: new Date().toISOString(),
        isRead: false,
        userId: booking.user.id,
        message: `Your booking to inspect '${booking.property.title}' was cancelled. Go to Bookings for more details.`,
      },
    ]);
  };

  const filteredBookings = bookings.filter((booking) => {
    const isUser = currentUser.role === "user";
    const isOwner = currentUser.role === "owner";
    if (isOwner) return booking.property.owner.id === currentUser.id;
    if (isUser) return booking.user.id === currentUser.id;
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
                {bookings.map((b, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-6 items-center p-3 text-sm hover:bg-gray-50 transition"
                  >
                    <span
                      className="font-medium capitalize cursor-pointer hover:underline text-purple-500"
                      onClick={() => {
                        setSelectedProperty(b.property);
                        onClose(true);
                      }}
                    >
                      {b.property.title}
                    </span>
                    <span>{b.day}</span>
                    <span>{b.time}</span>
                    {currentUser.role === "owner" && (
                      <span className="capitalize">{b.user.firstName}</span>
                    )}

                    {/* Status Tag */}
                    <span>
                      {b.status === "accepted" && (
                        <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                          Accepted
                        </span>
                      )}
                      {b.status === "cancelled" && (
                        <span className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                          Cancelled
                        </span>
                      )}
                      {!b.status && (
                        <span className="px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">
                          Pending
                        </span>
                      )}
                    </span>

                    {/* Actions */}
                    <div className="flex justify-end gap-2">
                      {!b.status && (
                        <>
                          {currentUser.role === "owner" && (
                            <button
                              onClick={() => handleAccept(b)}
                              className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700 whitespace-nowrap"
                            >
                              Accept
                            </button>
                          )}
                          <button
                            onClick={() => handleCancel(b)}
                            className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700 whitespace-nowrap"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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

      {isOpen && selectedProperty && (
        <Details
          isOpen={isOpen}
          onClose={() => onClose(false)}
          property={selectedProperty}
        />
      )}
    </RequireAuth>
  );
};

export default Bookings;
