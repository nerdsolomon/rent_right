import type { Property, Review } from "~/types";
import { SendReview } from "./sendreview";
import { useMe } from "~/hooks/useAuth";
import { useReviews } from "~/hooks/useReviews";
import { ReviewCard } from "./reviewcard";

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
        {currentUser?.id !== property.userId && currentUser.role !== 'admin' && <SendReview propertyId={property.id!} />}
      </div>
      <div className="px-4">
        {reviews.length > 0 ? (
          reviews
            .filter((r: Review) => r.propertyId === property.id)
            .map((review: Review, index: number) => (
              <ReviewCard userId={review.userId} review={review} />
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
