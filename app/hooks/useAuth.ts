// hooks/auth/useAuth.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authService } from "~/services";

export const authKeys = {
  me: ["auth", "me"] as const,
  all: ["auth"] as const,
};

// ================= ME =================
export const useMe = () =>
  useQuery({
    queryKey: authKeys.me,
    queryFn: authService.me,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

// ================= LOGIN =================
export const useLogin = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.login,

    onSuccess: async () => {
      // force refetch user BEFORE navigation
      await qc.invalidateQueries({ queryKey: authKeys.me });

      navigate("/home", { replace: true });
    },

    onError: (err) => {
      console.error("LOGIN ERROR:", err);
    },
  });
};

// ================= REQUEST OTP =================
export const useRequestOtp = () =>
  useMutation({
    mutationFn: authService.requestOtp,
    onError: (err) => console.error("REQUEST OTP ERROR:", err),
  });

// ================= VERIFY EMAIL =================
export const useVerifyEmail = () =>
  useMutation({
    mutationFn: authService.verifyEmail,
    onError: (err) => console.error("VERIFY EMAIL ERROR:", err),
  });

// ================= RESEND OTP =================
export const useResendOtp = () =>
  useMutation({
    mutationFn: authService.resendOtp,
    onError: (err) => console.error("RESEND OTP ERROR:", err),
  });

// ================= LOGOUT =================
export const useLogout = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.logout,

    onSuccess: async () => {
      // 🔥 HARD RESET ALL AUTH STATE
      await qc.cancelQueries();
      qc.removeQueries(); // clears everything (important for security)

      navigate("/", { replace: true });
    },

    onError: (err) => {
      console.error("LOGOUT ERROR:", err);

      // still force logout locally even if API fails
      qc.removeQueries();
      navigate("/", { replace: true });
    },
  });
};

// ================= SOCIAL LOGIN =================
export const useGoogleLogin = () => {
  return () => authService.googleLogin();
};

export const useFacebookLogin = () => {
  return () => authService.facebookLogin();
};