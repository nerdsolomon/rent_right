import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { feedbackService } from "~/services";
import type { Feedback } from "~/types";

// ================= KEYS =================
export const feedbackKeys = {
  all: ["feedbacks"] as const,
  single: (id: number) => ["feedbacks", id] as const,
};

// ================= ALL FEEDBACK =================
export const useFeedbacks = () =>
  useQuery({
    queryKey: feedbackKeys.all,
    queryFn: feedbackService.getAll,
    retry: false,
    staleTime: 2 * 60 * 1000,
  });

// ================= CREATE FEEDBACK =================
export const useCreateFeedback = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: feedbackService.create,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: feedbackKeys.all });
    },
  });
};

// ================= MARK AS VIEWED =================
export const useMarkFeedbackViewed = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => feedbackService.markViewed(id),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: feedbackKeys.all });
    },
  });
};

// ================= UPDATE FEEDBACK =================
type UpdateFeedbackParams = {
  id: number;
  data: Partial<Feedback>;
};

export const useUpdateFeedback = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateFeedbackParams) =>
      feedbackService.update(id, data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: feedbackKeys.all });
    },
  });
};

export const useFeedback = (id: number) =>
  useQuery({
    queryKey: feedbackKeys.single(id),
    queryFn: () => feedbackService.getAll(), // replace if you add getById
    enabled: !!id,
  });

// ================= DELETE FEEDBACK =================
export const useDeleteFeedback = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: feedbackService.delete,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: feedbackKeys.all });

      qc.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "feedbacks",
      });
    },
  });
};