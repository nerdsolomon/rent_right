import useClickOutside from "~/hooks/useClickOutside";
import type { User } from "~/types";

interface Props {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  user: User;
}

export const VerifyInfo = ({ isOpen, onClose, user }: Props) => {
  const modalRef = useClickOutside({ isOpen, onClose });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-lg w-[95%] md:w-[700px] p-4 animate-fadeIn max-h-[90vh] overflow-y-auto scrollbar-hidden"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="font-bold text-lg text-purple-600">
              Verification Details
            </p>
            <p className="text-xs text-gray-400">
              Review user details for verification
            </p>
          </div>

          <button
            onClick={() => onClose(false)}
            className="text-gray-400 hover:text-black"
          >
            ✕
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">NIN</p>
            <p className="font-medium">{user.verifyOwner?.NIN}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">First Name</p>
            <p className="font-medium">{user.verifyOwner?.firstName}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Last Name</p>
            <p className="font-medium">{user.verifyOwner?.lastName}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Date of Birth</p>
            <p className="font-medium">{user.verifyOwner?.DoB}</p>
          </div>

          <div className="col-span-2">
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">{user.verifyOwner?.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
