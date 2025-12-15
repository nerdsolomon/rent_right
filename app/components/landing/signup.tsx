import { useState } from "react";
import useClickOutside from "~/hooks/useClickOutside";
import {useData, emptyUser} from "~/hooks/useData";

const Signup = () => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({isOpen, onClose})
  const [alert, setAlert] = useState(false);
  const { users, setUsers } = useData()
  const [formData, setFormData] = useState(emptyUser);

  const addUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsers([
      ...users,
      {
        id: Math.random(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
      },
    ]);
    setFormData({
      ...formData,
      id: 0,
      firstName: "",
      lastName: "",
      phone: 0,
      email: "",
      password: "",
    });
    setAlert(true);
  };

  return (
    <>
      <button
        onClick={() => onClose(true)}
        className="border border-gray-400 bg-green-500 px-4 py-2 text-white hover:bg-green-800 rounded-lg"
      >
        Sign up
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-lg w-[90%] md:w-[400px] p-6 text-center animate-fadeIn"
          >
            <p className="font-bold text-xl py-2">RentRight</p>
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
                  setFormData({ ...formData, phone: parseInt(e.target.value) })
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
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
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
