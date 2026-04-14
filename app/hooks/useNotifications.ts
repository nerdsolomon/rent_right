import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "~/services";

export const notificationKeys = {
  all: ["notifications"] as const,
};

export const useNotifications = () =>
  useQuery({
    queryKey: notificationKeys.all,
    queryFn: notificationService.getAll,
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