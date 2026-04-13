import {
  FaEnvelope,
  FaFileContract,
  FaPhoneAlt,
  FaQuestionCircle,
  FaSuitcase,
  FaUser,
} from "react-icons/fa";
import { ChangePassword } from "~/components/profile/changepassword";
import { Delete } from "~/components/profile/delete";
import { Edit } from "~/components/profile/edit";
import { Logout } from "~/components/profile/logout";
import { Qrcode } from "~/components/profile/qrcode";
import { Feedback } from "~/components/profile/feedback";
import { useData } from "~/hooks/useData";
import { usePageTitle } from "~/hooks/usePageTitle";
import { RequireAuth } from "~/hooks/useRequireAuth";
import { Owner } from "~/components/profile/owner";
import { termAndPolicy } from "~/services/asset.services";

const Profile = () => {
  const { currentUser } = useData();
  usePageTitle(`RentRight - ${currentUser.firstName} ${currentUser.lastName}`);

  const displayName = currentUser.company
    ? currentUser.company
    : `${currentUser.firstName} ${currentUser.lastName}`;

  const initials = currentUser.company
    ? currentUser.company.charAt(0)
    : `${currentUser.firstName?.[0] ?? ""}${currentUser.lastName?.[0] ?? ""}`;
  return (
    <RequireAuth>
      <div className="py-4 px-6 space-y-4">
        <div className="flex flex-col items-center gap-4">
        <div className="relative w-30 h-30 md:w-40 md:h-40 rounded-full overflow-hidden bg-purple-100 text-purple-600 flex items-center justify-center text-3xl md:text-4xl font-semibold">
          {currentUser.imageUrl ? (
            <img
              src={currentUser.imageUrl}
              alt={displayName}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            initials
          )}
        </div>
      </div>

        <Edit />

        <div className="space-y-2 text-gray-400 border-b border-gray-300 pb-2 mb-4">
          {currentUser.company && (
            <div className="flex items-center gap-5 mb-2">
              <FaSuitcase size={18} />
              <div className="items-center">
                <span className="font-bold text-xs">Company</span>
                <p>{currentUser.company}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-5 mb-2">
            <FaUser size={18} />
            <div className="items-center">
              <span className="font-bold text-xs">Name</span>
              <p className="capitalize">
                {currentUser.firstName} {currentUser.lastName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 mb-2">
            <FaEnvelope size={18} />
            <div className="items-center">
              <span className="font-bold text-xs">Email</span>
              <p>{currentUser.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 mb-2">
            <FaPhoneAlt size={18} />
            <div className="items-center">
              <span className="font-bold text-xs">Phone</span>
              <p>{currentUser.phone}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 border-b border-gray-300 pb-4 mb-4">
          {currentUser.role === "user" && <Owner />}
          {currentUser.role === "owner" && <Qrcode />}
          <ChangePassword />
          <Logout />
          {currentUser.role !== "admin" && <Delete />}
        </div>

        <div className="space-y-4">
          {currentUser.role !== "admin" && <Feedback />}
          <div className="flex items-center gap-5 text-gray-400 hover:text-gray-600 cursor-pointer">
            <FaQuestionCircle size={18} />
            <p>Help center</p>
          </div>
          <a href={termAndPolicy} className="flex items-center gap-5 text-gray-400 hover:text-gray-600 cursor-pointer">
            <FaFileContract size={18} />
            <p>Terms of Service and Privacy Policy</p>
          </a>
        </div>
      </div>
    </RequireAuth>
  );
};

export default Profile;
