// hooks/reviews/useReviews.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewService } from "~/services";

export const reviewKeys = {
  all: ["reviews"] as const,
  byProperty: (id: number) => ["reviews", id] as const,
};

export const useReviews = () =>
  useQuery({
    queryKey: reviewKeys.all,
    queryFn: reviewService.getAll,
  });

export const useReviewsByProperty = (propertyId: number) =>
  useQuery({
    queryKey: reviewKeys.byProperty(propertyId),
    queryFn: () => reviewService.getByProperty(propertyId),
    enabled: !!propertyId,
  });

export const useCreateReview = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: reviewService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: reviewKeys.all });
    },
  });
};

export const useDeleteReview = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: reviewService.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: reviewKeys.all });
    },
  });
};