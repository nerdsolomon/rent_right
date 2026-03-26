import { FaExclamationCircle } from "react-icons/fa";
import { useData } from "~/hooks/useData";
import { usePageTitle } from "~/hooks/usePageTitle";
import { RequireAuth } from "~/hooks/useRequireAuth";

const Feedbacks = () => {
  usePageTitle("RentRight - Feedbacks");
  const { feedbacks } = useData();

  return (
    <RequireAuth>
      <div className="w-full mt-4">
        {feedbacks.length > 0 ? (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {feedbacks.map((f, index) => (
              <div
                key={index}
                className={`flex gap-3 p-4 items-start transition ${
                  !f.isViewed ? "bg-blue-50" : "bg-white"
                } hover:bg-gray-50`}
              >
                {/* Avatar */}
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-sm font-bold uppercase">
                  {f.user?.firstName?.charAt(0)}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold capitalize text-sm">
                      {f.user ? f.user.firstName : "Anonymous"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {f.text}
                  </p>

                  {/* Image preview */}
                  {f.imageUrl && (
                    <img
                      src={f.imageUrl}
                      alt="feedback"
                      className="mt-2 w-20 h-20 object-cover rounded-md border"
                    />
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  {/* Status */}
                  {!f.isViewed && (
                    <span className="text-xs text-blue-600 font-medium">
                      New
                    </span>
                  )}
                  <button className="text-xs px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                    Delete
                  </button>
                </div>
              </div>
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
