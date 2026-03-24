import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import useClickOutside from "~/hooks/useClickOutside";
import { useData } from "~/hooks/useData";
import { emptyUser } from "~/types";
import { images } from "~/services/asset.services";

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
          role: "user",
        },
      ]);
      setFormData(emptyUser);
      setConfirmPassword("");
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
        className="px-6 py-2 rounded-full text-sm font-semibold bg-white text-purple-700 hover:bg-purple-600 hover:text-white shadow"
      >
        Sign Up
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-lg w-full max-w-5xl h-[90vh] flex overflow-hidden animate-fadeIn"
          >
            {/* LEFT SIDE */}
            <div className="w-full md:w-1/2 overflow-y-auto px-6 py-4 scrollbar-hidden">
              <div className="w-full max-w-md">
                {/* Heading */}
                <h2 className="text-2xl font-bold mb-2">Create your account</h2>
                <p className="text-gray-500 text-sm mb-6">
                  Get started for free. No credit card required.
                </p>

                {/* Google Button */}
                <button className="w-full border border-purple-600 text-purple-600 py-2 rounded-full font-medium hover:bg-purple-50 transition">
                  Continue with Google
                </button>

                {/* Divider */}
                <div className="flex items-center my-4 text-gray-400 text-sm">
                  <hr className="flex-1" />
                  <span className="px-2">or continue with email</span>
                  <hr className="flex-1" />
                </div>

                {/* Form */}
                <form className="space-y-4" onSubmit={addUser}>
                  {alert && (
                    <div className="bg-yellow-100 rounded-lg text-sm text-gray-600 p-2">
                      Invalid credentials
                    </div>
                  )}

                  <input
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="text"
                    placeholder="First Name"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                  <input
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="text"
                    placeholder="Last Name"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                  <input
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="text"
                    placeholder="Company (Optional)"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                  <input
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                  <input
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="number"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: Number(e.target.value),
                      })
                    }
                  />
                  <input
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <input
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
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

                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" />I agree to the
                    <a className="text-purple-600" href="">
                      Terms of Service and Privacy Policy
                    </a>
                  </label>

                  {/* Submit */}
                  <button
                    className="w-full bg-purple-600 text-white py-2 rounded-full font-semibold hover:bg-purple-700 transition"
                    type="submit"
                  >
                    Create account
                  </button>
                </form>

                {/* Footer */}
                <p className="text-sm text-gray-500 mt-6 text-center">
                  Already have an account?{" "}
                  <a
                    onClick={() => onClose(false)}
                    href="#navbar"
                    className="text-purple-600 cursor-pointer hover:underline"
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="hidden md:flex w-1/2 relative">
              <img
                src={images[0]}
                alt="home"
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-purple-600/60"></div>

              <div className="absolute inset-0 flex items-center justify-center px-8">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 text-center max-w-sm">
                  {/* Logo */}
                  <div className="flex flex-col items-center mb-4">
                    <div className="bg-purple-600 text-white w-12 h-12 rounded-xl flex items-center justify-center mb-2">
                      <FaHome size={22} />
                    </div>
                    <span className="text-lg font-bold text-purple-600">
                      RentRight
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold mb-2">
                    Find Your Dream Home
                  </h3>
                  <p className="text-sm text-gray-600">
                    Join thousands of happy tenants who found their perfect
                    rental through RentRight.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
