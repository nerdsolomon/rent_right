import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "~/services";

export const userKeys = {
  all: ["users"] as const,
  detail: (id: number) => ["users", "detail", id] as const,
};

// ================= GET USERS =================
export const useUsers = () =>
  useQuery({
    queryKey: userKeys.all,
    queryFn: userService.getAll,
    retry: false,
    staleTime: 2 * 60 * 1000,
  });

// ================= GET SINGLE USER =================
export const useUser = (id: number) =>
  useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userService.getById(id),
    enabled: !!id,
    retry: false,
    staleTime: 2 * 60 * 1000,
  });

// ================= CREATE USER =================
export const useCreateUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: userService.create,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// ================= UPDATE USER =================
export const useUpdateUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: number; data: FormData }) =>
      userService.update(params.id, params.data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// ================= DELETE USER =================
export const useDeleteUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: userService.delete,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// ================= TOGGLE ROLE =================
export const useToggleUserRole = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => userService.toggleRole(id),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
};