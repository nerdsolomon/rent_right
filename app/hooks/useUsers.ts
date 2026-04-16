import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "~/services";
import type { User } from "~/types";

export const userKeys = {
  all: ["users"] as const,
};

// ================= GET USERS =================
export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: userService.getAll,
    retry: false,
    staleTime: 2 * 60 * 1000,
  });
};

// ================= CREATE USER (ADMIN) =================
export const useCreateUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: userService.create,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};

// ================= UPDATE USER =================
export const useUpdateUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: number; data: Partial<User> }) =>
      userService.update(params.id, params.data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};

// ================= DELETE USER =================
export const useDeleteUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: userService.delete,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: userKeys.all });
    },
  });
};