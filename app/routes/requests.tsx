import { useState } from "react";
import { FaUserCheck } from "react-icons/fa";
import { VerifyInfo } from "~/components/requests/verifyinfo";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";
import { usePageTitle } from "~/hooks/usePageTitle";
import { RequireAuth } from "~/hooks/useRequireAuth";
import type { User } from "~/types";

const Requests = () => {
  usePageTitle("RentRight - Requests");
  const { users, updateUser } = useData();
  const [isOpen, onClose] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const filterUsers = users.filter((u) => u.verifyOwner != null);

  const handleApprove = (user: User) => {
    updateUser({
      ...user,
      role: "owner",
      verifyOwner: user.verifyOwner
        ? {
            ...user.verifyOwner,
            verifiedAt: new Date().toISOString(),
            status: "approved",
          }
        : undefined,
    });
  };

  const handleCancel = (user: User) => {
    updateUser({
      ...user,
      role: "owner",
      verifyOwner: user.verifyOwner
        ? { ...user.verifyOwner, status: "cancelled" }
        : undefined,
    });
  };

  return (
    <RequireAuth>
      <div className="w-full mt-4">
        {filterUsers.length > 0 ? (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <div className="min-w-[650px]">
                {/* Header */}
                <div className="grid grid-cols-4 bg-gray-100 text-gray-600 text-xs font-semibold uppercase p-3">
                  <span>Name</span>
                  <span>Email</span>
                  <span className="text-center">Status</span>
                  <span className="text-right">Actions</span>
                </div>

                {/* Rows */}
                {filterUsers.map((u, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-4 items-center p-3 text-sm hover:bg-gray-50 transition"
                  >
                    <span
                      className="font-medium capitalize cursor-pointer hover:underline text-purple-500"
                      onClick={() => {
                        setSelectedUser(u);
                        onClose(true);
                      }}
                    >
                      {u.firstName} {u.lastName}
                    </span>
                    <span>{u.email}</span>

                    {/* Status Tag */}
                    <span className="flex justify-center">
                      {u.verifyOwner?.status === "approved" && (
                        <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                          Approved
                        </span>
                      )}
                      {u.verifyOwner?.status === "cancelled" && (
                        <span className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                          Cancelled
                        </span>
                      )}
                      {!u.verifyOwner?.status && (
                        <span className="px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">
                          Pending
                        </span>
                      )}
                    </span>

                    {/* Actions */}
                    <div className="flex justify-end gap-2">
                      {u.verifyOwner?.status === "approved" ? (
                        <span className="italic text-gray-400">
                          verified at {u.verifyOwner?.verifiedAt}
                        </span>
                      ) : (
                        <>
                          <button
                            onClick={() => handleApprove(u)}
                            className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700 whitespace-nowrap"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleCancel(u)}
                            className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-700 whitespace-nowrap"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-40">
            <div className="flex justify-center">
              <FaUserCheck size={40} className="text-gray-300 mb-5" />
            </div>
            <p className="text-center font-bold text-[22px] text-gray-300">
              No verification requests
            </p>
          </div>
        )}
      </div>

      {isOpen && selectedUser && (
        <VerifyInfo isOpen={isOpen} onClose={onClose} user={selectedUser} />
      )}
    </RequireAuth>
  );
};

export default Requests;
