import { Admins } from "~/components/dashboard/admins"
import { Apartments } from "~/components/dashboard/apartments"
import { Lands } from "~/components/dashboard/lands"
import { Owners } from "~/components/dashboard/owners"
import { Users } from "~/components/dashboard/users"

const Dashboard = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <Admins/>
        <Owners/>
        <Users/>
        <Lands/>
        <Apartments/>
    </div>
  )
}

export default Dashboard