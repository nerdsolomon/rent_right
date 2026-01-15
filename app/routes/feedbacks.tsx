import { FaExclamationCircle } from "react-icons/fa";
import { useData } from "~/hooks/useData";
import { usePageTitle } from "~/hooks/usePageTitle";
import { RequireAuth } from "~/hooks/useRequireAuth";

const Feedbacks = () => {
  usePageTitle("RentRight - Feedbacks");
  const { feedbacks } = useData();

  return (
    <RequireAuth>
      <div className="space-y-2">
        {feedbacks.length > 0 ? (
          feedbacks.map((f, index) => (
            <div
              key={index}
              className="p-2 flex items-center w-full text-sm mb-2 border-b border-gray-300"
            >
              <div className="items-center">
                <span className="font-bold mr-2 capitalize">{f.user ? `${f.user.firstName}`: ""}</span>
                <p>{f.text}</p>
              </div>
            </div>
          ))
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
