import { useState } from "react";
import useClickOutside from "~/hooks/useClickOutside";

export const Booking = () => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const workHours = [
    "9:00 am",
    "10:00 am",
    "11:00 am",
    "12:00 pm",
    "1:00 pm",
    "2:00 pm",
    "3:00 pm",
    "4:00 pm",
    "5:00 pm",
  ];

  return (
    <>
      <button
        onClick={() => onClose(true)}
        className="p-2 border border-purple-600 mt-2 text-sm hover:bg-purple-600 hover:text-white text-purple-600 rounded-xl font-semibold"
      >
        Apply to inspect
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto">
          <div
            ref={modalRef}
            className="relative bg-gray-100 rounded-2xl shadow-lg w-[98%] lg:w-[500px] max-h-[90vh] overflow-y-auto scrollbar-hidden animate-fadeIn"
          >
            <div className="flex px-4 pt-4 pb-2 justify-between sticky top-0 bg-gray-100 z-10 border-b border-gray-300">
              <p className="font-bold text-lg">Book day and time</p>
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
                    className="m-2 w-20 h-10 text-sm text-center rounded-lg bg-gray-200 hover:bg-purple-600 hover:text-white"
                  >
                    {day}
                  </button>
                ))}
              </div>

              <p className="text-gray-400 p-2">Time</p>

              <div className="grid grid-cols-3">
                {workHours.map((hour, index) => (
                  <button
                    key={index}
                    className="m-2 text-sm w-20 h-10 text-center rounded-lg bg-gray-200 hover:bg-purple-600 hover:text-white"
                  >
                    {hour}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center items-center mt-4 p-2">
              <button className="p-2 border border-purple-600 text-sm bg-purple-600 text-white hover:bg-purple-800 rounded-lg font-semibold">
                Submit application
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
