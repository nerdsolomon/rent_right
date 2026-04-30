import { useState } from "react";
import { useMe } from "~/hooks/useAuth";
import { useBookings, useCreateBooking } from "~/hooks/useBookings";
import useClickOutside from "~/hooks/useClickOutside";
import { useCreateNotification } from "~/hooks/useNotifications";
import { emptyBooking, type Booking, type Property } from "~/types";

interface Props {
  property: Property;
}

export const Book = ({ property }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useClickOutside({ isOpen, setIsOpen });

  const [formData, setFormData] = useState(emptyBooking);

  const { data } = useMe();
  const currentUser = data.user;

  const { data: bData } = useBookings();
  const bookings = bData?.bookings ?? [];

  const { mutate: createNotification } = useCreateNotification();
  const { mutateAsync: createBooking } = useCreateBooking();

  const getCurrentWeekDays = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();

    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek);

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(sunday);
      date.setDate(sunday.getDate() + i);

      return {
        label: date.toLocaleDateString("en-US", { weekday: "short" }),
        formatted: date.toISOString().split("T")[0],
        dayNumber: date.getDate(),
      };
    });
  };

  const daysOfWeek = getCurrentWeekDays();

  const workHours = [
    "9:00 am",
    "10:00 am",
    "11:00 am",
    "12:00 pm",
    "1:00 pm",
    "2:00 pm",
    "3:00 pm",
    "4:00 pm",
  ];

  const handleSubmit = async () => {
    try {
      if (!formData.day || !formData.time) {
        alert("Please select both day and time");
        return;
      }

      if (isTimeBooked(formData.day, formData.time)) {
        alert("This time is already booked");
        return;
      }

      const bookingData = {
        ...formData,
        propertyId: property.id,
        userId: currentUser.id,
      };

      await createBooking(bookingData);

      await createNotification({
        datetime: new Date().toISOString(),
        isRead: false,
        userId: property.userId,
        message: `${currentUser.firstName} just booked a date and time for property inspection.`,
      });

      alert("Booking successful");
      setFormData(emptyBooking);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const isPastDay = (date: string) => {
    return date < today;
  };

  const isTimeBooked = (day: string, time: string) => {
    return bookings.some(
      (booking: Booking) =>
        booking.propertyId === property.id &&
        booking.day === day &&
        booking.time === time,
    );
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 border border-purple-600 mt-2 text-xs cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 rounded-xl font-semibold"
      >
        Apply to inspect
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto">
          <div
            ref={modalRef}
            className="relative bg-gray-100 rounded-2xl shadow-lg w-[98%] lg:w-[500px] max-h-[90vh] overflow-y-auto"
          >
            <div className="flex px-4 pt-4 pb-2 justify-between border-b border-gray-300">
              <p className="font-bold text-lg">Book inspection for this week</p>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="p-2">
              <p className="text-gray-400 p-2">Day</p>

              <div className="grid grid-cols-3">
                {daysOfWeek.map((day, index) => {
                  const disabled = isPastDay(day.formatted);

                  return (
                    <div className="flex justify-center" key={index}>
                      <button
                        disabled={disabled}
                        onClick={() =>
                          !disabled &&
                          setFormData((prev) => ({
                            ...prev,
                            day: day.formatted,
                          }))
                        }
                        className={`m-2 w-20 h-10 text-sm rounded-lg
                        ${
                          disabled
                            ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                            : formData.day === day.formatted
                              ? "bg-purple-600 text-white"
                              : "bg-gray-200 hover:bg-purple-600 hover:text-white"
                        }
                      `}
                      >
                        {day.label} - {day.dayNumber}
                      </button>
                    </div>
                  );
                })}
              </div>

              <p className="text-gray-400 p-2">Time</p>

              <div className="grid grid-cols-3">
                {workHours.map((hour, index) => {
                  const disabled =
                    !formData.day || isTimeBooked(formData.day, hour);

                  return (
                    <div className="flex justify-center" key={index}>
                      <button
                        disabled={disabled}
                        onClick={() =>
                          !disabled &&
                          setFormData((prev) => ({
                            ...prev,
                            time: hour,
                          }))
                        }
                        className={`m-2 w-20 h-10 text-sm rounded-lg
                        ${
                          disabled
                            ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                            : formData.time === hour
                              ? "bg-purple-600 text-white"
                              : "bg-gray-200 hover:bg-purple-600 hover:text-white"
                        }
                      `}
                      >
                        {hour}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center items-center mt-4 p-2">
              <button
                onClick={handleSubmit}
                className="p-2 border border-purple-600 text-sm bg-purple-600 text-white hover:bg-purple-800 rounded-lg font-semibold"
              >
                Submit application
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
