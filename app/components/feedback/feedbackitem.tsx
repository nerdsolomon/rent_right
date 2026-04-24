import { useUser } from "~/hooks/useUsers";
import type { Feedback } from "~/types";

const FeedbackItem = ({ feedback }: { feedback: Feedback }) => {
  const { data } = useUser(feedback.userId);
  const user = data?.user;

  return (
    <div
      className={`flex gap-3 p-4 items-start transition ${
        !feedback.isViewed ? "bg-blue-50" : "bg-white"
      } hover:bg-gray-50`}
    >
      {/* Avatar */}
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-sm font-bold uppercase">
        {user?.firstName?.charAt(0) || "A"}
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <span className="font-semibold capitalize text-sm">
            {user ? user.firstName : "Anonymous"}
          </span>
        </div>

        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {feedback.text}
        </p>

        {feedback.imageUrl && (
          <img
            src={feedback.imageUrl}
            alt="feedback"
            className="mt-2 w-20 h-20 object-cover rounded-md border"
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        {!feedback.isViewed && (
          <span className="text-xs text-blue-600 font-medium">New</span>
        )}
        <button className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700">
          Delete
        </button>
      </div>
    </div>
  );
};

export default FeedbackItem;