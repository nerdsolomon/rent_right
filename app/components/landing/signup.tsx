import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import useClickOutside from "~/hooks/useClickOutside";
import { emptyUser } from "~/types";
import { images, termAndPolicy } from "~/services/asset.services";
import { useGoogleLogin } from "~/hooks/useAuth";
import { useCreateUser } from "~/hooks/useUsers";
import { EmailModal } from "./emailmodal";
import { OtpModal } from "./otp";

const Signup = () => {
  const [isOpen, onClose] = useState(false);
  const modalRef = useClickOutside({ isOpen, onClose });

  const [alert, setAlert] = useState(false);
  const [formData, setFormData] = useState(emptyUser);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notMatch, setNotMatch] = useState(false);

  const { mutate: register, isPending, isSuccess, error } = useCreateUser();
  const googleLogin = useGoogleLogin();

  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");

  const addUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (notMatch) return;

    register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      company: formData.company || "",
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setFormData(emptyUser);
      setConfirmPassword("");
      setAlert(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    setNotMatch(confirmPassword !== formData.password);
  }, [confirmPassword, formData.password]);

  return (
    <>
      <button
        onClick={() => setEmailModalOpen(true)}
        className="px-6 py-2 rounded-full text-sm font-semibold bg-white text-purple-700 hover:bg-purple-600 hover:text-white shadow"
      >
        Sign Up
      </button>

      <EmailModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        onSuccess={(email) => {
          setVerifiedEmail(email);
          setEmailModalOpen(false);
          setOtpModalOpen(true);
        }}
      />

      <OtpModal
        isOpen={otpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        email={verifiedEmail}
        onVerified={() => {
          setOtpModalOpen(false);
          onClose(true); // open signup modal
          setFormData((prev) => ({
            ...prev,
            email: verifiedEmail, // ✅ inject verified email
          }));
        }}
      />

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-lg w-full max-w-5xl h-[90vh] flex overflow-hidden animate-fadeIn"
          >
            {/* LEFT SIDE */}
            <div className="w-full md:w-1/2 overflow-y-auto px-6 py-4">
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
                <div className="text-purple-600 flex items-center mb-4">
                  <FaHome size={25} />
                  <span className="text-[25px] font-bold sm:inline">
                    xterra
                  </span>
                </div>

                <h2 className="text-2xl font-bold mb-2">Create your account</h2>

                <p className="text-gray-500 text-sm mb-6">
                  Get started for free. No credit card required.
                </p>

                <button
                  onClick={googleLogin}
                  className="w-full border border-purple-600 text-purple-600 py-2 rounded-full font-medium hover:bg-purple-50 transition"
                >
                  Continue with Google
                </button>

                <div className="flex items-center my-4 text-gray-400 text-sm">
                  <hr className="flex-1" />
                  <span className="px-2">or</span>
                  <hr className="flex-1" />
                </div>

                <form className="space-y-4" onSubmit={addUser}>
                  {error && (
                    <div className="bg-red-100 text-red-600 text-sm p-2 rounded">
                      {(error as Error).message}
                    </div>
                  )}

                  {alert && (
                    <div className="bg-yellow-100 rounded-lg text-sm text-gray-600 p-2">
                      Account created successfully...
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
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600
"
                    type="text"
                    placeholder="Last Name"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />

                  <input
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600
"
                    type="text"
                    placeholder="Company (Optional)"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />

                  <input
                    className="w-full p-2 border border-gray-300 disabled rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600
"
                    type="email"
                    placeholder="Email"
                    required
                    disabled
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />

                  <div className="flex gap-2">
                    {/* Fixed Country Code */}
                    <div className="w-1/5 p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
                      +234
                    </div>

                    {/* Phone Number */}
                    <input
                      className="w-2/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      type="tel"
                      placeholder="Phone Number"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        })
                      }
                    />
                  </div>

                  <input
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600
"
                    type="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />

                  <input
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600
"
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  {notMatch && (
                    <p className="text-sm text-red-500 text-left">
                      Passwords don't match
                    </p>
                  )}

                  <label className="flex items-center gap-1 text-xs">
                    <input
                      className="accent-purple-600 w-4 h-4 cursor-pointer"
                      type="checkbox"
                      required
                    />
                    I agree to the{" "}
                    <a className="text-purple-600" href={termAndPolicy}>
                      Terms of Service and Privacy Policy
                    </a>
                  </label>

                  <button
                    className="w-full bg-purple-600 text-white py-2 rounded-full font-semibold"
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending ? "Creating..." : "Create account"}
                  </button>
                </form>

                <p className="text-sm text-gray-500 mt-6 text-center">
                  Already have an account?{" "}
                  <a
                    onClick={() => onClose(false)}
                    href="#sign-in"
                    className="text-purple-600 cursor-pointer"
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
