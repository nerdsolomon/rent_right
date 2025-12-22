export const Team = () => {
  let members = [
    { imageUrl: "", firstName: "John", lastName: "Doe", role: "Lead Engineer" },
    { imageUrl: "", firstName: "Jane", lastName: "Martin", role: "Project Manager" },
    { imageUrl: "", firstName: "James", lastName: "Philip", role: "Lead Designer UI/UX" },
    { imageUrl: "", firstName: "Sarah", lastName: "West", role: "Marketer" },
  ];

  return (
    <>
    {members.map((member, index) => (
      <div key={index} className="w-48 bg-white rounded-lg shadow hover:shadow-md transition p-3 flex-shrink-0">
        <div className="relative w-full h-44 rounded-md bg-gray-300 flex items-center justify-center text-white text-[40px] font-bold capitalize overflow-hidden">
          {member.imageUrl ? (
            <img
              src={member.imageUrl}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <span>
              {member.firstName.charAt(0)}
              {member.lastName.charAt(0)}
            </span>
          )}
        </div>
        <div className="mt-2">
          <p className="font-semibold text-gray-800 text-sm truncate">
            {`${member.firstName} ${member.lastName}`}
          </p>
          <p className="text-xs text-gray-500 mt-1 capitalize">{member.role}</p>
        </div>
      </div>
    ))}
    </>
  );
};
