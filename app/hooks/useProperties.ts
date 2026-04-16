import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { propertyService } from "~/services";

export const propertyKeys = {
  all: ["properties"] as const,
};

// ================= GET ALL =================
export const useProperties = () =>
  useQuery({
    queryKey: propertyKeys.all,
    queryFn: propertyService.getAll,
    retry: false,
    staleTime: 2 * 60 * 1000,
  });

// ================= CREATE =================
export const useCreateProperty = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: propertyService.create,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: propertyKeys.all });
    },
  });
};

// ================= UPDATE =================
export const useUpdateProperty = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (params: { id: number; data: FormData }) =>
      propertyService.update(params.id, params.data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: propertyKeys.all });
    },
  });
};

// ================= DELETE =================
export const useDeleteProperty = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => propertyService.delete(id),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: propertyKeys.all });
    },
  });
};