import type { User } from "~/data";

interface Prop {
  profile : User
  post : string
}

const Postcard = ({ profile, post } : Prop) => {
  return (
    <div className="p-4 flex items-center border mb-2 border-gray-300 rounded-lg">
      <img
        src={profile.imageUrl}
        className="w-15 h-15 rounded-full object-cover mr-3"
      />
      <div className="items-center">
        <span className="font-bold mr-2">
          {profile.firstName} {profile.lastName}
        </span>
        <p>{post}</p>
        <div className="flex items-center mt-2 space-x-6">
          <button aria-label="Like">🤍</button>
          <button aria-label="Comment">🗨</button>
        </div>
      </div>
    </div>
  );
};

export default Postcard;
