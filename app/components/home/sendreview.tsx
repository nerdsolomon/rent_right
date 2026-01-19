import { useState } from "react";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";
import { emptyReview } from "~/types";

interface Prop {
  propertyId: number;
}

export const SendReview = ({ propertyId }: Prop) => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  const { reviews, setReviews, currentUser } = useData();
  const [formData, setFormData] = useState(emptyReview);

  const sendReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReviews([...reviews, formData]);
    setFormData(emptyReview)
    onClose(false)
  };

  return (
    <div>
      <button
        onClick={() => onClose(true)}
        className="border border-gray-300 text-xs px-2 py-1 rounded-full hover:bg-gray-400 hover:text-white"
      >
        Send Review
      </button>

      {isOpen && (
        <div className="fixed absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-gray-100 rounded-2xl shadow-lg w-[90%] md:w-[400px] p-4 animate-fadeIn"
          >
            <div className="flex justify-between mb-6">
              <p className="font-semibold">Send Review</p>
              <button
                onClick={() => onClose(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form className="space-y-2" onSubmit={sendReview}>
              <textarea
                required
                rows={3}
                className="w-full p-2 border border-gray-300 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Write your review"
                value={formData.text}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    id: Math.random(),
                    text: e.target.value,
                    user: currentUser,
                    propertyId: propertyId,
                  })
                }
              />
              <button
                type="submit"
                className="bg-purple-500 w-full hover:bg-purple-700 text-white font-bold py-2 text-sm rounded-lg"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
