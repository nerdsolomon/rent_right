import { useParams } from "react-router";
import { PropertyCard } from "~/components/home/propertycard";
import { useProperties } from "~/hooks/useProperties";
import { useUsers } from "~/hooks/useUsers";
import type { Property, User } from "~/types";

const Portfolio = () => {
  const { id } = useParams();
  const { data: users } = useUsers()
  const { data: properties} = useProperties()

  const userId = Number(id);
  const user = users.find((u: User) => u.id === userId);

  if (!user) {
    return (
      <div className="p-6 text-center text-gray-500">
        User not found
      </div>
    );
  }

  const userProperties = properties.filter(
    (p: Property) => p.owner?.id === user.id
  );

  const displayName = user.company
    ? user.company
    : `${user.firstName} ${user.lastName}`;

  const initials = user.company
    ? user.company.charAt(0)
    : `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`;

  return (
    <div className="space-y-8 p-4">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-purple-100 text-purple-600 flex items-center justify-center text-3xl md:text-4xl font-semibold">
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={displayName}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            initials
          )}
        </div>

        <h1 className="text-xl md:text-2xl font-bold text-purple-600 text-center capitalize">
          {displayName}
        </h1>
      </div>

      {userProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userProperties.map((property: Property) => (
            <PropertyCard property={property} key={property.id} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400">
          No properties found
        </div>
      )}
    </div>
  );
};

export default Portfolio;