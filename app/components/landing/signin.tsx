import { useState } from "react";
import { useNavigate } from "react-router";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";
import { emptyUser } from "~/types";

const Signin = () => {
  const [isOpen, onClose] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(emptyUser);
  const [alert, setAlert] = useState(false);

  const navigate = useNavigate();
  const modalRef = useClickOutside({ isOpen, onClose });

  const { users, setCurrentUser } = useData();

  const authenticate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const foundUser = users.find(
      (user) =>
        user.email === formData.email &&
        user.password === formData.password
    );

    if (!foundUser) {
      setAlert(true);
      return;
    }

    setCurrentUser(foundUser);
    navigate("/home");

    setFormData(emptyUser);
    setAlert(false);
    onClose(false);
  };

  return (
    <>
      <button
        onClick={() => onClose(true)}
        className="border border-gray-400 bg-blue-500 p-2 text-sm text-white hover:bg-blue-800 rounded-lg"
      >
        Sign In
      </button>

      {isOpen && (
        <div className="fixed absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-lg w-[90%] md:w-[400px] p-6 text-center"
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

              <div className="flex items-center gap-2 text-xs">
                <input
                  id="show-password"
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="show-password">Show password</label>
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
