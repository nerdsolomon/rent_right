import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "~/services";
import type { Notification } from "~/types";

export const notificationKeys = {
  all: ["notifications"] as const,
  mine: ["notifications", "mine"] as const,
};

// ================= MY NOTIFICATIONS =================
export const useNotifications = () =>
  useQuery({
    queryKey: notificationKeys.mine,
    queryFn: notificationService.getAll,
    retry: false,
    staleTime: 2 * 60 * 1000,
  });

// ================= CREATE =================
export const useCreateNotification = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: notificationService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: notificationKeys.all });
      qc.invalidateQueries({ queryKey: notificationKeys.mine });
    },
  });
};

// ================= UPDATE =================
export const useUpdateNotification = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Notification> }) =>
      notificationService.update(id, data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: notificationKeys.all });
      qc.invalidateQueries({ queryKey: notificationKeys.mine });
    },
  });
};

// ================= DELETE =================
export const useDeleteNotification = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: notificationService.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: notificationKeys.all });
      qc.invalidateQueries({ queryKey: notificationKeys.mine });
    },
  });
};