import { useEffect, useRef, useState } from "react";
import { FaEnvelope, FaRedo } from "react-icons/fa";
import useClickOutside from "~/hooks/useClickOutside";
import { useVerifyEmail, useResendOtp } from "~/hooks/useAuth";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  email: string;
};

export const OtpModal = ({ isOpen, onClose, email }: Props) => {
  const modalRef = useClickOutside({ isOpen, onClose });

  const { mutate: verifyEmail, isPending: verifying } = useVerifyEmail();
  const { mutate: resendOtp, isPending: resending } = useResendOtp();

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);

  const isComplete = otp.every((v) => v !== "");

  // ================= TIMER =================
  useEffect(() => {
    if (!isOpen) return;

    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, isOpen]);

  // ================= VERIFY =================
  const handleVerify = (code?: string) => {
    const finalOtp = code ?? otp.join("");

    if (finalOtp.length !== 6) {
      setError("Enter full OTP code");
      return;
    }

    verifyEmail(
      { email, otp: finalOtp },
      {
        onSuccess: () => {
          setOtp(["", "", "", "", "", ""]);
          onClose();
        },
        onError: () => {
          setError("Invalid OTP");
        },
      },
    );
  };

  // ================= INPUT CHANGE =================
  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newOtp.every((v) => v !== "")) {
      handleVerify(newOtp.join(""));
    }
  };

  // ================= BACKSPACE =================
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // ================= PASTE =================
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(paste)) return;

    const newOtp = paste.split("").slice(0, 6);
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]);

    newOtp.forEach((_, i) => {
      inputsRef.current[i]?.focus();
    });

    handleVerify(paste);
  };

  // ================= RESEND =================
  const handleResend = () => {
    resendOtp({ email });
    setTimer(60);
    setOtp(["", "", "", "", "", ""]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="lg:w-[420px] w-[92%] rounded-2xl bg-white p-6 shadow-xl animate-[fadeIn_.2s_ease]"
      >
        {/* HEADER */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
            <FaEnvelope size={18} />
          </div>

          <div>
            <p className="text-lg font-semibold text-gray-800">
              Verify your email
            </p>
            <p className="text-sm text-gray-500">
              Enter the 6-digit code sent to your email
            </p>
          </div>
        </div>

        {/* OTP INPUTS */}
        <div className="mt-6 flex justify-between gap-2">
          {otp.map((value, i) => (
            <input
              key={i}
              ref={(el) => { inputsRef.current[i] = el }}
              value={value}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
              maxLength={1}
              className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-xs mt-2 text-center">{error}</p>
        )}

        {/* ACTIONS */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => handleVerify()}
            disabled={!isComplete || verifying}
            className="w-full px-4 py-2 text-sm rounded-lg bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50"
          >
            {verifying ? "Verifying..." : "Verify"}
          </button>

          <button
            onClick={handleResend}
            disabled={timer > 0 || resending}
            className="flex items-center justify-center gap-2 text-sm text-purple-600 hover:underline disabled:opacity-50"
          >
            <FaRedo size={14} />
            {timer > 0
              ? `Resend in ${timer}s`
              : resending
                ? "Resending..."
                : "Resend OTP"}
          </button>

          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
