import { useState } from "react";
import { useRequestOtp } from "~/hooks/useAuth";
import useClickOutside from "~/hooks/useClickOutside";

type EmailModalProps = {
  isOpen: boolean;
  setIsOpen: () => void;
  onSuccess: (email: string) => void;
};

export const EmailModal = ({ isOpen, setIsOpen, onSuccess }: EmailModalProps) => {
  const modalRef = useClickOutside({ isOpen, setIsOpen });
  const [email, setEmail] = useState("");

  const { mutate: requestOtp, isPending, error } = useRequestOtp();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    requestOtp(
      { email },
      {
        onSuccess: () => {
          setIsOpen();
          onSuccess(email);
        },
      },
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-xl p-6 w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-2">Enter your email</h2>
        <p className="text-sm text-gray-500 mb-4">
          We'll send you a verification code
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 rounded-lg text-sm text-red-600 p-2">
              {(error as Error).message}
            </div>
          )}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Email address"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg"
          >
            {isPending ? "Sending..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};
