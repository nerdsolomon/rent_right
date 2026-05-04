import { useState } from "react";
import { useMe } from "~/hooks/useAuth";
import useClickOutside from "~/hooks/useClickOutside";
import { useCreateReview } from "~/hooks/useReviews";
import { emptyReview } from "~/types";

interface Prop {
  propertyId: number;
}

export const SendReview = ({ propertyId }: Prop) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useClickOutside({ isOpen, setIsOpen });

  const { data } = useMe();
  const currentUser = data?.user;

  const [formData, setFormData] = useState(emptyReview);
  
  const { mutate: createReview } = useCreateReview()

  const sendReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createReview( formData );
    setFormData(emptyReview);
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="border border-purple-600 text-xs text-purple-600 px-2 py-1 rounded-full hover:bg-purple-600 hover:text-white"
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
                onClick={() => setIsOpen(false)}
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
                    userId: currentUser.id,
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
