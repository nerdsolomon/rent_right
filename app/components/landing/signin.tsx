import { useState } from "react";
import { useNavigate } from "react-router";
import useClickOutside from "~/hooks/useClickOutside";
import {useData} from "~/data";

const Signin = () => {
  const [isOpen, onClose] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const modalRef = useClickOutside({ isOpen, onClose });
  const { users, currentUser, setCurrentUser } = useData();

  const authenticate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isFound = false;
    users.map((user) => {
      if (user.email == formData.email && user.password == formData.password) {
        setCurrentUser({
          ...currentUser,
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          email: user.email,
          password: user.password,
          role: "user"
        });
        isFound = true;
        navigate("/home");
      }
    });
    if (isFound == false) setAlert(true);
    setFormData({ ...formData, email: "", password: "" });
  };

  return (
    <>
      <button
        onClick={() => onClose(true)}
        className="border border-gray-400 bg-blue-500 px-4 py-2 text-white hover:bg-blue-800 rounded-lg"
      >
        Sign In
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-lg w-[90%] md:w-[400px] p-6 text-center animate-fadeIn"
          >
            <p className="font-bold text-xl py-5 mb-5">RentRight</p>
            <form className="space-y-4" onSubmit={authenticate}>
              {alert && (
                <div className="bg-yellow-100 rounded-lg text-sm text-gray-500 p-2">
                  Invalid credentials
                </div>
              )}
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
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <div className="items-center px-2 flex gap-2">
                <input
                  id="show-password"
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="show-password" className="text-xs">
                  Show password
                </label>
              </div>
              <button
                className="border border-gray-400 bg-blue-500 px-4 py-2 text-white hover:bg-blue-800 rounded-lg"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Signin;
