import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useProperties } from "~/hooks/useProperties";
import { useUsers } from "~/hooks/useUsers";

export function Chart() {
  const { data: usersData } = useUsers()
  const users = usersData?.users ?? []

  const { data: propertiesData } = useProperties()
  const properties = propertiesData?.properties ?? []

  const data = [
    { name: "Admins", value: users.filter((u: { role: string; }) => u.role === "admin").length },
    { name: "Owners", value: users.filter((u: { role: string; }) => u.role === "owner").length },
    { name: "Users", value: users.filter((u: { role: string; }) => u.role === "user").length },
    { name: "Apartments", value: properties.filter((p: { type: string; }) => p.type === "apartment").length},
    { name: "Buildings", value: properties.filter((p: { type: string; }) => p.type === "building").length },
    { name: "Lands", value: properties.filter((p: { type: string; }) => p.type === "land").length },
  ];

  return (
    <div style={{ width: "100%", height: "40vh", minHeight: 250 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 40, right: 40, left: 0, bottom: 10 }}
        >
          <CartesianGrid stroke="#e0e0e0" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#9810fa"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
