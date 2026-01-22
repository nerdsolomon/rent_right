import { FaComments } from "react-icons/fa";
import { usePageTitle } from "~/hooks/usePageTitle";
import { RequireAuth } from "~/hooks/useRequireAuth";

const Messages = () => {
  usePageTitle("RentRight - Messages");

  return (
    <RequireAuth>
      <div className="flex justify-center">
        <div className="mt-40 text-green-300">
          <div className="flex justify-center">
            <FaComments size={40} className="mb-5" />
          </div>
          <p className="text-center font-bold text-[22px]">
            Coming soon!
          </p>
        </div>
      </div>
    </RequireAuth>
  );
};

export default Messages;
