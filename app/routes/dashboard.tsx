import { FaUsers, FaUserShield, FaUserTie } from "react-icons/fa";
import { MdApartment, MdLandscape } from "react-icons/md";
import { Chart } from "~/components/dashboard/chart";
import { ClearStorage } from "~/components/dashboard/clearstorage";
import { Properties } from "~/components/dashboard/properties";
import { Users } from "~/components/dashboard/users";
import { RequireAuth } from "~/hooks/useRequireAuth";

const Dashboard = () => {
  const usersFilter = [
    { label: "Admins", role: "admin", icon: FaUserShield },
    { label: "Owners", role: "owner", icon: FaUserTie },
    { label: "Users", role: "user", icon: FaUsers },
  ];
  const propertiesFilter = [
    { label: "Apartments", type: "apartment", icon: MdApartment },
    { label: "Lands", type: "land", icon: MdLandscape },
  ];

  return (
    <RequireAuth>
      <Chart />
      <div className="grid grid-cols-2 gap-4 p-4">
        {usersFilter.map((user, index) => (
          <Users key={index} role={user.role} label={user.label} icon={user.icon} />
        ))}
        {propertiesFilter.map((property, index) => (
          <Properties key={index} label={property.label} type={property.type} icon={property.icon} />
        ))}
      </div>
      <div className="p-4">
        <ClearStorage />
      </div>
    </RequireAuth>
  );
};

export default Dashboard;
