import { useState } from "react";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";
import { emptyBooking, type Property } from "~/types";

interface Props {
  property: Property;
}

export const Booking = ({ property }: Props) => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  const [formData, setFormData] = useState(emptyBooking);
  const { currentUser, bookings, setBookings } = useData();

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

  const handleSubmit = () => {
    if (!formData.day || !formData.time) {
      alert("Please select both day and time");
      return;
    }

    const bookingData = {
      ...formData,
      id: Math.random(),
      property: property,
      user: currentUser,
    };

    setBookings([...bookings, bookingData]);
    alert("Booking successful");
    setFormData(emptyBooking);
    onClose(false);
  };

  return (
    <>
      <button
        onClick={() => onClose(true)}
        className="p-2 border border-purple-600 mt-2 text-xs hover:bg-purple-600 hover:text-white text-purple-600 rounded-xl font-semibold"
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
                onClick={() => onClose(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <div className="p-2">
              <p className="text-gray-400 p-2">Day</p>

              <div className="grid grid-cols-3">
                {daysOfWeek.map((day, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        day: day.formatted,
                      }))
                    }
                    className={`m-2 w-20 h-10 text-sm rounded-lg ${
                      formData.day === day.formatted
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 hover:bg-purple-600 hover:text-white"
                    }`}
                  >
                    <div>
                      {day.label} - {day.dayNumber}
                    </div>
                  </button>
                ))}
              </div>

              <p className="text-gray-400 p-2">Time</p>

              <div className="grid grid-cols-3">
                {workHours.map((hour, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        time: hour,
                      }))
                    }
                    className={`m-2 w-20 h-10 text-sm rounded-lg ${
                      formData.time === hour
                        ? "bg-purple-600 text-white"
                        : "bg-gray-200 hover:bg-purple-600 hover:text-white"
                    }`}
                  >
                    {hour}
                  </button>
                ))}
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
