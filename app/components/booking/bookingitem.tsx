import { useUpdateBooking } from "~/hooks/useBookings";
import { useCreateNotification } from "~/hooks/useNotifications";
import { useProperties } from "~/hooks/useProperties";
import type { Booking, Property } from "~/types";

type Props = {
  booking: Booking;
  currentUser: any;
  onSelect: (propertyId: number) => void;
};

const BookingItem = ({ booking, currentUser, onSelect }: Props) => {
  const { data: pData } = useProperties();
  const properties = pData?.properties;
  const property = properties.filter(
    (p: Property) => p.id === booking.propertyId,
  )[0];

  const { mutate: updateBooking } = useUpdateBooking();
  const { mutate: createNotification } = useCreateNotification();

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

  return (
    <div
      className={`grid items-center p-3 text-sm hover:bg-gray-50 transition ${
        currentUser.role === "owner" ? "grid-cols-6" : "grid-cols-5"
      }`}
    >
      <span
        className="font-medium capitalize cursor-pointer hover:underline text-purple-500"
        onClick={() => onSelect(booking.propertyId)}
      >
        {property ? property.title : "Loading..."}
      </span>

      <span>{booking.day}</span>
      <span>{booking.time}</span>

      {currentUser.role === "owner" && (
        <span className="capitalize">{booking.userId}</span>
      )}

      <span>
        {booking.status === "accepted" && (
          <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
            Accepted
          </span>
        )}
        {booking.status === "cancelled" && (
          <span className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
            Cancelled
          </span>
        )}
        {booking.status !== "accepted" && booking.status !== "cancelled" && (
          <span className="px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">
            Pending
          </span>
        )}
      </span>

      <div className="flex justify-end gap-2">
        {booking.status !== "accepted" && booking.status !== "cancelled" && (
          <>
            {currentUser.role === "owner" && (
              <button
                onClick={() => handleAccept(booking)}
                className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                Accept
              </button>
            )}

            <button
              onClick={() => handleCancel(booking)}
              className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingItem;
