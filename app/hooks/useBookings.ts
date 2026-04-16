import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bookingService } from "~/services";

export const bookingKeys = {
  all: ["bookings"] as const,
  mine: ["bookings", "mine"] as const,
};

// ================= ALL BOOKINGS =================
export const useBookings = () =>
  useQuery({
    queryKey: bookingKeys.all,
    queryFn: bookingService.getAll,
    retry: false,
    staleTime: 2 * 60 * 1000,
  });

// ================= MY BOOKINGS =================
export const useMyBookings = () =>
  useQuery({
    queryKey: bookingKeys.mine,
    queryFn: bookingService.myBookings,
    retry: false,
    staleTime: 2 * 60 * 1000,
  });

// ================= CREATE BOOKING =================
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

// ================= DELETE BOOKING =================
export const useDeleteBooking = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: bookingService.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: bookingKeys.all });
      qc.invalidateQueries({ queryKey: bookingKeys.mine });
    },
  });
};