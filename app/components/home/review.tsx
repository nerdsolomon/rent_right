import { SendReview } from "./sendreview";
import { useData } from "~/hooks/useData";

interface Prop {
  propertyId: number;
}

export const Review = ({ propertyId }: Prop) => {
  const { reviews } = useData();
  return (
    <>
      <div className="flex justify-between p-4 mt-4 border-t border-gray-300">
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
                className="p-2 flex items-center text-sm border-t gap-4 border-gray-300"
              >
                <span className="w-10 h-10 aspect-square bg-gray-400 flex capitalize items-center justify-center border-2 border-purple-600 rounded-full font-bold text-purple-600">
                  {review.user?.imageUrl ? (
                    <img
                      src={review.user.imageUrl}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : review.user.company ? (
                    review.user.company.charAt(0)
                  ) : (
                    `${review.user.firstName.charAt(0)} ${review.user.lastName.charAt(0)}`
                  )}
                </span>
                <div className="items-center">
                  <span className="font-bold mr-2 capitalize">
                    {review.user.firstName}
                  </span>
                  <p>{review.text}</p>
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
