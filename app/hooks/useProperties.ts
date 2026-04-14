// hooks/properties/useProperties.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { propertyService } from "~/services";

export const propertyKeys = {
  all: ["properties"] as const,
};

export const useProperties = () =>
  useQuery({
    queryKey: propertyKeys.all,
    queryFn: propertyService.getAll,
  });

export const useCreateProperty = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: propertyService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: propertyKeys.all });
    },
  });
};

export const useUpdateProperty = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: any) =>
      propertyService.update(id, data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: propertyKeys.all });
    },
  });
};

export const useDeleteProperty = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: propertyService.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: propertyKeys.all });
    },
  });
};