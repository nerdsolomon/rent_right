import { useData } from "~/hooks/useData";
import { usePageTitle } from "~/hooks/usePageTitle";

const Profile = () => {
  const { currentUser, logout } = useData();
  usePageTitle(`RentRight - Profile : ${currentUser.firstName} ${currentUser.lastName}`);
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

      <div className="items-center text-center">
        <p className="text-[30px] font-bold text-gray-500">
          {currentUser?.firstName?.trim() || ""}{" "}
          {currentUser?.lastName?.trim() || ""}
        </p>
      </div>

      <div className="flex justify-center">
        <button className="p-2 bg-gray-400 mt-2 text-xs hover:bg-gray-500 text-white rounded-lg font-semibold">Edit Profile</button>
      </div>

      <div className="flex justify-center">
        <button onClick={() => logout()} className="p-2 bg-red-400 mt-2 text-xs hover:bg-red-500 text-white rounded-lg font-semibold">Logout</button>
      </div>
    </div>
  );
};

export default Profile;
