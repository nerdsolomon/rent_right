// hooks/bookings/useBookings.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingService } from "~/services";

export const bookingKeys = {
  all: ["bookings"] as const,
  mine: ["bookings", "mine"] as const,
};

export const useBookings = () =>
  useQuery({
    queryKey: bookingKeys.all,
    queryFn: bookingService.getAll,
  });

export const useMyBookings = () =>
  useQuery({
    queryKey: bookingKeys.mine,
    queryFn: bookingService.myBookings,
  });

export const useCreateBooking = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: bookingService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: bookingKeys.all });
      qc.invalidateQueries({ queryKey: bookingKeys.mine });
    },
  });
};

export const useDeleteBooking = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: bookingService.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: bookingKeys.all });
    },
  });
};