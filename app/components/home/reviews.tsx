import type { Property, Review } from "~/types";
import { SendReview } from "./sendreview";
import { useMe } from "~/hooks/useAuth";
import { useReviews } from "~/hooks/useReviews";

interface Prop {
  property: Property;
}

export const Reviews = ({ property }: Prop) => {
  const { data } = useMe();
  const currentUser = data?.user
  const { data: rData} = useReviews()
  const reviews = rData?.reviews ?? []
  return (
    <>
      <div className="flex justify-between p-4 mt-4 border-t border-gray-300">
        <p className="font-bold text-sm">Reviews</p>
        {currentUser?.id !== property.owner.id && currentUser.role !== 'admin' && <SendReview propertyId={property.id} />}
      </div>
      <div className="px-4">
        {reviews.length > 0 ? (
          reviews
            .filter((r: Review) => r.propertyId === property.id)
            .map((review: Review, index: number) => (
              <div
                key={index}
                className="p-2 flex items-center text-sm border-t gap-4 border-gray-300"
              >
                <span className="w-10 h-10 aspect-square flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-semibold">
                  {review.user?.imageUrl ? (
                    <img
                      src={review.user.imageUrl}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : review.user.company ? (
                    review.user.company.charAt(0)
                  ) : (
                    `${review.user.firstName.charAt(0)}${review.user.lastName.charAt(0)}`
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
