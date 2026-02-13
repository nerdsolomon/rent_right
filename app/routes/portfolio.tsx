import { useParams } from "react-router";
import { PropertyCard } from "~/components/home/propertycard";
import { useData } from "~/hooks/useData";

const Portfolio = () => {
  const { id } = useParams();
  const { users, properties } = useData();
  const user = users.find((u) => u.id === Number(id));
  if (!user) {
    return <div className="p-4 text-center">User not found</div>;
  }
  const userProperties = properties.filter(
    (p) => p.owner.id === user.id
  );

  return (
    <>
      <div className="p-4">
        <div className="flex justify-center">
          <div className="relative w-[20%] bg-gray-400 border-4 border-purple-600 rounded-full aspect-square flex capitalize items-center justify-center text-purple-600 text-[40px] lg:text-[50px] font-bold overflow-hidden">
            {user.imageUrl ? (
              <img
                src={user.imageUrl}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : user.company ? (
              user.company.charAt(0)
            ) : (
              `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
            )}
          </div>
        </div>

        <h1 className="text-lg font-bold capitalize text-center text-purple-600">
          {user.company
            ? user.company
            : `${user.firstName} ${user.lastName}`}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-2">
        {userProperties.map((property) => (
          <PropertyCard property={property} key={property.id} />
        ))}
      </div>
    </>
  );
};

export default Portfolio;
