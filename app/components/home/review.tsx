import profileImg from "~/assets/profile.png";

export const Review = () => {
  return (
    <>
      <div className="flex justify-between p-4 mt-4 border-t border-gray-300 text-gray-400">
        <p className="font-bold text-sm">Reviews</p>
        <button className="border border-gray-300 text-xs px-2 py-1 rounded-full hover:bg-gray-400 hover:text-white">
          Send Review
        </button>
      </div>
      <div className="px-4">
        <div className="p-2 flex items-center text-sm mb-2 border-gray-300">
          <img
            src={profileImg}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div className="items-center">
            <span className="font-bold mr-2">John Doe</span>
            <p>Hello</p>
          </div>
        </div>

        <div className="p-2 flex items-center text-sm mb-2 border-gray-300">
          <img
            src={profileImg}
            className="w-10 h-10 rounded-full object-cover mr-3"
          />
          <div className="items-center">
            <span className="font-bold mr-2">John Doe</span>
            <p>Hello</p>
          </div>
        </div>
      </div>
    </>
  );
};
