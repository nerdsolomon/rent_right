import profileImg from "~/assets/profile.png";
import { SendReview } from "./sendreview";
import { useData } from "~/hooks/useData";

interface Prop {
  propertyId: number;
}

export const Review = ({ propertyId }: Prop) => {
  const { reviews } = useData();
  return (
    <>
      <div className="flex justify-between p-4 mt-4 border-t border-gray-300 text-gray-400">
        <p className="font-bold text-sm">Reviews</p>
        <SendReview propertyId={propertyId} />
      </div>
      <div className="px-4">
        {reviews.length > 0 ? (
          reviews
            .filter((r) => r.propertyId === propertyId)
            .map((review, index) => (
              <div
                key={index}
                className="p-2 flex items-center text-sm mt-2 border-t border-gray-300"
              >
                <img
                  src={profileImg}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div className="items-center">
                  <span className="font-bold mr-2 capitalize">{review.user.firstName}</span>
                  <p>{review.text}</p>
                  <span className="text-xs text-gray-400">Delete</span>
                </div>
              </div>
            ))
        ) : (
          <div className="mt-5 mb-10">
            <p className="text-center font-semibold text-[18px] text-gray-300">
              No reviews
            </p>
          </div>
        )}
      </div>
    </>
  );
};
