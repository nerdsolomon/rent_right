import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "~/services";
import type { Notification } from "~/types";

export const notificationKeys = {
  all: ["notifications"] as const,
};

export const useNotifications = () =>
  useQuery<Notification[]>({
    queryKey: notificationKeys.all,
    queryFn: async () => {
      const res = await notificationService.getAll();
      return res.notifications;
    },
  });

export const useCreateNotification = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: notificationService.create,
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: notificationKeys.all }),
  });
};

export const useUpdateNotification = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: any) =>
      notificationService.update(id, data),

    onSuccess: () =>
      qc.invalidateQueries({ queryKey: notificationKeys.all }),
  });
};

export const useDeleteNotification = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: notificationService.delete,
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: notificationKeys.all }),
  });
};