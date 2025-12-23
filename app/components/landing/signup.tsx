import { useEffect, useState } from "react";
import useClickOutside from "~/hooks/useClickOutside";
import { useData, emptyUser } from "~/hooks/useData";

const Signup = () => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });
  const [alert, setAlert] = useState(false);
  const { users, setUsers } = useData();
  const [formData, setFormData] = useState(emptyUser);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notMatch, setNotMatch] = useState(false);

  const addUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (notMatch === false) {
      setUsers([
        ...users,
        {
          id: Math.random(),
          firstName: formData.firstName,
          lastName: formData.lastName,
          company: formData.company,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        },
      ]);
      setFormData({
        ...formData,
        id: NaN,
        firstName: "",
        lastName: "",
        phone: NaN,
        email: "",
        password: "",
        company: ""
      });
      setConfirmPassword("")
      setAlert(true);
    }
  };

  useEffect(() => {
    if (confirmPassword !== formData.password) setNotMatch(true);
    else setNotMatch(false);
  }, [confirmPassword]);

  return (
    <>
      <button
        onClick={() => onClose(true)}
        className="border border-gray-400 text-sm bg-green-500 p-2 text-white hover:bg-green-800 rounded-lg"
      >
        Sign Up
      </button>
      {isOpen && (
        <div className="fixed absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-lg w-[90%] md:w-[400px] p-6 text-center animate-fadeIn"
          >
            <div className="flex justify-between mb-8">
              <p className="font-bold">RentRight</p>
              <button
                onClick={() => onClose(false)}
                className="text-gray-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4" onSubmit={addUser}>
              {alert && (
                <div className="bg-yellow-100 rounded-lg text-sm text-gray-500 p-2">
                  Registration successful
                </div>
              )}
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="First Name"
                required
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Last Name"
                required
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Company (Optional)"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
              />
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: Number(e.target.value) })
                }
              />
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <input
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {notMatch && (
                <p className="text-sm text-red-500 text-start">
                  Passwords don't match...
                </p>
              )}
              <button
                className="border border-gray-400 bg-blue-500 px-4 py-2 text-white hover:bg-blue-800 rounded-lg"
                type="submit"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
