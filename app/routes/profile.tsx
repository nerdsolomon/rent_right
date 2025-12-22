import { Editprofile } from "~/components/profile/editprofile";
import { Logout } from "~/components/profile/logout";
import { useData } from "~/hooks/useData";
import { usePageTitle } from "~/hooks/usePageTitle";

const Profile = () => {
  const { currentUser } = useData();
  usePageTitle(
    `RentRight - Profile : ${currentUser.firstName} ${currentUser.lastName}`
  );
  return (
    <div className="p-4">
      <div className="flex justify-center">
        <div className="w-[30%] border-4 mb-2 rounded-full aspect-square bg-gray-300 flex capitalize items-center justify-center text-white text-[40px] lg:text-[50px] font-bold">
          {currentUser?.imageUrl ? (
            <img
              src={currentUser.imageUrl}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            `${currentUser.firstName.charAt(0)} ${currentUser.lastName.charAt(0)}`
          )}
        </div>
      </div>

      <div className="space-y-2">
        {currentUser.company && (
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="text-gray-400">Company</div>
            <div className="text-gray-400">{currentUser.company}</div>
          </div>
        )}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="text-gray-400">Name</div>
          <div className="text-gray-400">
            {currentUser.firstName} {currentUser.lastName}
          </div>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="text-gray-400">Email</div>
          <div className="text-gray-400">
            {currentUser.email}
          </div>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="text-gray-400">Phone</div>
          <div className="text-gray-400">
            {currentUser.phone}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-2">
        <Editprofile />
        <Logout/>
      </div>
    </div>
  );
};

export default Profile;
