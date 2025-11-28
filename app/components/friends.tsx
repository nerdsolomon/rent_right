import type { Friend } from "~/data";

interface Prop {
  friends: Friend[];
  setFriends: (value: any) => void;
}

const Friends = ({ friends, setFriends }: Prop) => {
  return (
    <div className="bg-white mt-2 right-3 rounded-lg border border-gray-300">
      <div className="text-lg text-blue-500 p-4 font-bold border-b border-gray-300">
        Friends
      </div>
      <div className="grid grid-cols-1 gap-2 p-4">
        {friends.map((friend, id) => (
          <label key={id} className="flex gap-2">
            <input
              type="checkbox"
              checked={friend.following}
              onChange={() => {
                setFriends((prev: any[]) =>
                  prev.map((friend, i) =>
                    i === id
                      ? { ...friend, following: !friend.following }
                      : friend
                  )
                );
              }}
            />
            {friend.firstName} {friend.lastName}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Friends;
