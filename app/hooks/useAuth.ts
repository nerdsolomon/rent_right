// hooks/auth/useAuth.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authService } from "~/services";

export const authKeys = {
  me: ["auth", "me"] as const,
  all: ["auth"] as const,
};

export const useMe = () =>
  useQuery({
    queryKey: authKeys.me,
    queryFn: authService.me,
  });

export const useRegister = () => {
  return useMutation({
    mutationFn: authService.create,
  });
};

export const useLogin = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: authKeys.me });
      navigate("/home");
    },
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: authService.verifyEmail,
  });
};

export const useVerifyPhone = () => {
  return useMutation({
    mutationFn: authService.verifyPhone,
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationFn: authService.resendOtp,
  });
};

export const useLogout = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      qc.setQueryData(authKeys.me, null);
      qc.removeQueries({ queryKey: authKeys.me });
    },
  });
};

export const useGoogleLogin = () => {
  return () => authService.googleLogin();
};

export const useFacebookLogin = () => {
  return () => authService.facebookLogin();
};