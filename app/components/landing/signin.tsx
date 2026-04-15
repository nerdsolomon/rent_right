import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import useClickOutside from "~/hooks/useClickOutside";
import { emptyUser } from "~/types";
import { images } from "~/services/asset.services";
import { useLogin, useGoogleLogin } from "~/hooks/useAuth";

const Signin = () => {
  const [isOpen, onClose] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(emptyUser);
  const modalRef = useClickOutside({ isOpen, onClose });

  const { mutate: loginUser, isPending, error, isSuccess } = useLogin();
  const googleLogin = useGoogleLogin();

  const authenticate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginUser({
      email: formData.email,
      password: formData.password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setFormData(emptyUser);
      onClose(false);
    }
  }, [isSuccess]);

  return (
    <>
      <button
        onClick={() => onClose(true)}
        className="text-gray-700 border border-purple-600 text-purple-600 px-3 py-2 rounded-full text-sm font-medium hover:bg-purple-500 hover:text-white transition flex items-center gap-2"
      >
        Sign In
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-lg w-full max-w-5xl h-[90vh] flex overflow-hidden animate-fadeIn"
          >
            {/* LEFT SIDE */}
            <div className="w-full md:w-1/2 flex items-center justify-center px-6 overflow-y-auto scrollbar-hidden">
              <div className="w-full max-w-md">
                <div className="lg:hidden flex justify-between">
                  <div></div>
                  <button
                    onClick={() => onClose(false)}
                    className="text-gray-400 hover:text-black"
                  >
                    ✕
                  </button>
                </div>
                <div className="relative flex items-center justify-center">
                  {/* Logo */}
                  <div className="flex flex-col items-center m-4">
                    <div className="bg-purple-600 text-white w-12 h-12 rounded-xl flex items-center justify-center mb-2">
                      <FaHome size={22} />
                    </div>
                    <span className="text-lg font-bold text-purple-600">
                      RentRight
                    </span>
                  </div>
                </div>

                {/* Heading */}
                <h2 className="text-2xl font-bold mb-2 text-center">
                  Welcome back
                </h2>
                <p className="text-gray-500 text-sm mb-6 text-center">
                  Sign in to access your account and find your perfect rental.
                </p>

                {/* Google Button */}
                <button
                  onClick={googleLogin}
                  className="w-full border border-purple-600 text-purple-600 py-3 rounded-full font-medium hover:bg-purple-50 transition"
                >
                  Continue with Google
                </button>

                {/* Divider */}
                <div className="flex items-center my-4 text-gray-400 text-sm">
                  <hr className="flex-1" />
                  <span className="px-2">or</span>
                  <hr className="flex-1" />
                </div>

                {/* Form */}
                <form className="space-y-4" onSubmit={authenticate}>
                  {error && (
                    <div className="bg-red-100 rounded-lg text-sm text-red-600 p-2">
                      {(error as Error).message}
                    </div>
                  )}

                  <input
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    type="email"
                    placeholder="Enter your email"
                    required
                    disabled={isPending}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />

                  <div className="relative">
                    <input
                      className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      required
                      disabled={isPending}
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />

                    {/* Eye Icon */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                      <input
                        className="accent-purple-600 w-4 h-4 cursor-pointer"
                        type="checkbox"
                      />
                      Remember me
                    </label>

                    <button
                      type="button"
                      className="text-purple-600 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Submit */}
                  <button
                    className="w-full bg-purple-600 text-white py-3 rounded-full font-semibold hover:bg-purple-700 transition"
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending ? "Signing in..." : "Sign In"}
                  </button>
                </form>

                {/* Footer */}
                <p className="text-sm text-gray-500 mt-6 text-center">
                  Don't have an account?{" "}
                  <a
                    onClick={() => onClose(false)}
                    href="#get-started"
                    className="text-purple-600 cursor-pointer hover:underline"
                  >
                    Sign up
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

export default Signin;
