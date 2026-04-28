import { FaExclamationCircle } from "react-icons/fa";
import FeedbackItem from "~/components/feedback/feedbackitem";
import { useFeedbacks } from "~/hooks/useFeedbacks";
import { usePageTitle } from "~/hooks/usePageTitle";
import { RequireAuth } from "~/hooks/useRequireAuth";
import type { Feedback } from "~/types";

const Feedbacks = () => {
  usePageTitle("Axterra- Feedbacks");

  const { data } = useFeedbacks()
  const feedbacks = data?.feedbacks ?? []

  return (
    <RequireAuth>
      <div className="w-full mt-4">
        {feedbacks.length > 0 ? (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {feedbacks.map((f: Feedback, index: number) => (
              <FeedbackItem feedback={feedbacks} key={index} />
            ))}
          </div>
        ) : (
          <div className="mt-40">
            <div className="flex justify-center">
              <FaExclamationCircle size={40} className="text-gray-300 mb-5" />
            </div>
            <p className="text-center font-bold text-[22px] text-gray-300">
              No feedbacks
            </p>
          </div>
        )}
      </div>
    </RequireAuth>
  );
};

export default Feedbacks;
