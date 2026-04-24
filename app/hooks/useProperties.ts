import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { propertyService } from "~/services";

export const propertyKeys = {
  all: ["properties"] as const,
  detail: (id: number | string) => ["properties", "detail", id] as const,
  owner: (userId: number | string) =>
    ["properties", "owner", userId] as const,
};

// ================= GET ALL =================
export const useProperties = () =>
  useQuery({
    queryKey: propertyKeys.all,
    queryFn: propertyService.getAll,
    retry: false,
    staleTime: 2 * 60 * 1000,
  });

// ================= GET BY ID =================
export const useProperty = (id: number) =>
  useQuery({
    queryKey: propertyKeys.detail(id),
    queryFn: () => propertyService.getById(id),
    enabled: !!id,
    retry: false,
    staleTime: 2 * 60 * 1000,
  });

// ================= GET BY OWNER =================
export const usePropertiesByOwner = (userId: number) =>
  useQuery({
    queryKey: propertyKeys.owner(userId),
    queryFn: () => propertyService.getByOwner(userId),
    enabled: !!userId,
    retry: false,
    staleTime: 2 * 60 * 1000,
  });

// ================= CREATE =================
export const useCreateProperty = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: propertyService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["properties"] });
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
      qc.invalidateQueries({ queryKey: ["properties"] });
    },
  });
};

// ================= DELETE =================
export const useDeleteProperty = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => propertyService.delete(id),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["properties"] });
    },
  });
};