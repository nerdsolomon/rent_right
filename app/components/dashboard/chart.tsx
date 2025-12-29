import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useData } from "~/hooks/useData";

export function Chart() {
  const { users, properties } = useData();

  const data = [
    { name: "Admins", value: users.filter(u => u.role === "admin").length },
    { name: "Owners", value: users.filter(u => u.role === "owner").length },
    { name: "Users", value: users.filter(u => u.role === "user").length },
    { name: "Apartments", value: properties.filter(p => p.type === "apartment").length},
    { name: "Lands", value: properties.filter(p => p.type === "land").length },
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
            stroke="#4f46e5"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
