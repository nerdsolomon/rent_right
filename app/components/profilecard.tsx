import type { User } from "~/data"

interface Prop {
  user : User
  setUser : (value: any) => void
}

const Profilecard = ({user, setUser} : Prop) => {
  return (
    <div className="bg-white absolute right-3 w-100 rounded-lg border border-gray-300">
      <div className="p-4 border-b border-gray-300">
        <h5 className="text-lg text-blue-500 font-bold">Profile Information</h5>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <input
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
          placeholder="First Name"
        />
        <input
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
          placeholder="Last Name"
        />
        <select
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setUser({ ...user, relationshipStatus: e.target.value })}
          value={user.relationshipStatus}
        >
          <option className="text-green-600 font-bold">
            {user.relationshipStatus}
          </option>
          <option value="Teen (under 18)">Teen (under 18)</option>
          <option value="Single and looking">Single and looking</option>
          <option value="Single and not looking">Single and not looking</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
          <option value="In a relationship">In a relationship</option>
          <option value="Other">Other</option>
        </select>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={user.city}
          onChange={(e) => setUser({ ...user, city: e.target.value })}
          placeholder="City"
        />
        <input
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={user.state}
          onChange={(e) => setUser({ ...user, state: e.target.value })}
          placeholder="State"
        />
        <input
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={user.country}
          onChange={(e) => setUser({ ...user, country: e.target.value })}
          placeholder="Country"
        />
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={user.bio}
          rows={1}
          onChange={(e) => setUser({ ...user, bio: e.target.value })}
          placeholder="Bio"
        />
      </div>
    </div>
  )
}

export default Profilecard