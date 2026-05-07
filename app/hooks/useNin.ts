import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ninService } from "~/services";

export const ninKeys = {
  all: ["nin"] as const,
  status: ["nin", "status"] as const,
  admin: (status?: string) => ["nin", "admin", status] as const,
};

// ================= SUBMIT NIN =================
export const useSubmitNin = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ninService.submit,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ninKeys.status });
      qc.invalidateQueries({ queryKey: ninKeys.all });
    },
  });
};

// ================= GET STATUS =================
export const useNinStatus = () =>
  useQuery({
    queryKey: ninKeys.status,
    queryFn: ninService.status,
    retry: false,
    staleTime: 2 * 60 * 1000,
  });

// ================= ADMIN GET ALL =================
export const useAdminNins = (status?: string) =>
  useQuery({
    queryKey: ninKeys.admin(status),
    queryFn: () => ninService.adminGetAll(status),
    retry: false,
    staleTime: 2 * 60 * 1000,
  });

// ================= REVIEW NIN =================
export const useOwnerRequest = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      id: number;
      status: "approved" | "rejected";
    }) => ninService.review(params.id, { status: params.status }),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["nin", "admin"] });
      qc.invalidateQueries({ queryKey: ninKeys.status });
    },
  });
};