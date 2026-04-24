import type { Review } from "~/types";
import { api, authHeaders, handleResponse } from "./http.service";

export const reviewService = {
  getAll: async () => {
    const res = await fetch(api('/reviews'));
    return handleResponse(res);
  },

  getByProperty: async (propertyId: number) => {
    const res = await fetch(api('/reviews/property/${propertyId}'));
    return handleResponse(res);
  },

  create: async (data: Review) => {
    const res = await fetch(api('/reviews'), {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  update: async (id: number, data: Partial<Review>) => {
    const res = await fetch(api('/reviews/${id}'), {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(data), 
    });

    return handleResponse(res);
  },

  delete: async (id: number) => {
    const res = await fetch(api('/reviews/${id}'), {
      method: "DELETE",
      headers: authHeaders(),
    });

    return handleResponse(res);
  },
};