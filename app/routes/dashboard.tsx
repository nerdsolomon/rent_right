import { Properties } from "~/components/dashboard/properties";
import { Users } from "~/components/dashboard/users";

const Dashboard = () => {
  const usersFilter = [
    { label: "Admins", role: "admin" },
    { label: "Owners", role: "owner" },
    { label: "Users", role: "user" },
  ];
  const propertiesFilter = [
    { label: "Apartments", type: "apartment" },
    { label: "Lands", type: "land" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {usersFilter.map((user, index) => (
        <Users key={index} role={user.role} label={user.label} />
      ))}
      {propertiesFilter.map((property, index) => (
        <Properties key={index} label={property.label} type={property.type} />
      ))}
    </div>
  );
};

export default Dashboard;
