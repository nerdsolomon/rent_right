import { useUsers } from "~/hooks/useUsers";
import type { Review, User } from "~/types";

interface Prop {
  userId: number;
  review: Review;
}

export const ReviewCard = ({ userId, review }: Prop) => {
  const { data: uData } = useUsers();
  const user = uData.users?.find((u: User) => u.id === userId);

  return (
    <div className="p-2 flex items-center text-sm border-t gap-4 border-gray-300">
      <span className="w-10 h-10 aspect-square flex items-center justify-center rounded-full bg-purple-100 text-purple-600 font-semibold">
        {user?.imageUrl ? (
          <img
            src={user.imageUrl}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : user.company ? (
          user.company.charAt(0)
        ) : (
          `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
        )}
      </span>
      <div className="items-center">
        <span className="font-bold mr-2 capitalize">{user.firstName}</span>
        <p>{review.text}</p>
      </div>
    </div>
  );
};
