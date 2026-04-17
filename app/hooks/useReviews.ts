import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewService } from "~/services";
import type { Review } from "~/types";

export const reviewKeys = {
  all: ["reviews"] as const,
  byProperty: (id: number) => ["reviews", id] as const,
};

// ================= ALL REVIEWS =================
export const useReviews = () =>
  useQuery({
    queryKey: reviewKeys.all,
    queryFn: reviewService.getAll,
    retry: false,
    staleTime: 2 * 60 * 1000,
  });

// ================= REVIEWS BY PROPERTY =================
export const useReviewsByProperty = (propertyId: number) =>
  useQuery({
    queryKey: reviewKeys.byProperty(propertyId),
    queryFn: () => reviewService.getByProperty(propertyId),
    enabled: !!propertyId,
    retry: false,
    staleTime: 2 * 60 * 1000,
  });

// ================= CREATE REVIEW =================
export const useCreateReview = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: reviewService.create,

    onSuccess: (_, variables: any) => {
      qc.invalidateQueries({ queryKey: reviewKeys.all });

      if (variables?.propertyId) {
        qc.invalidateQueries({
          queryKey: reviewKeys.byProperty(variables.propertyId),
        });
      }
    },
  });
};

type UpdateReviewParams = {
  id: number;
  data: Partial<Review>;
};

export const useUpdateReview = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateReviewParams) =>
      reviewService.update(id, data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: reviewKeys.all });
    },
  });
};

// ================= DELETE REVIEW =================
export const useDeleteReview = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: reviewService.delete,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: reviewKeys.all });

      qc.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "reviews",
      });
    },
  });
};