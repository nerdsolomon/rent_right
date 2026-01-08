import { FaExclamationCircle } from "react-icons/fa";
import { useData } from "~/hooks/useData";
import { usePageTitle } from "~/hooks/usePageTitle";
import { RequireAuth } from "~/hooks/useRequireAuth";

const Notifications = () => {
  usePageTitle("RentRight - Feedbacks");
  const { feedbacks } = useData();

  return (
    <RequireAuth>
      <div className="flex justify-center"> 
        {feedbacks.length > 0 ? (
          feedbacks.map(((f, index) => (
            <div key={index}></div>
          )))
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

export default Notifications;
