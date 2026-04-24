import { api, authHeaders, handleResponse } from "./http.service";

export const propertyService = {
  getAll: async () => {
    const res = await fetch(api('/properties'));
    return handleResponse(res);
  },

  getById: async (id: number) => {
    const res = await fetch(api('/properties/${id}'));
    return handleResponse(res);
  },

  getByOwner: async (userId: number) => {
    const res = await fetch(api('/properties/owner/${userId}'));
    return handleResponse(res);
  },

  create: async (data: FormData) => {
    const res = await fetch(api('/properties'), {
      method: "POST",
      headers: authHeaders(true),
      body: data,
    });

    return handleResponse(res);
  },

  update: async (id: number, data: FormData) => {
    const res = await fetch(api('/properties/${id}'), {
      method: "PUT",
      headers: authHeaders(true),
      body: data,
    });

    return handleResponse(res);
  },

  delete: async (id: number) => {
    const res = await fetch(api('/properties/${id}'), {
      method: "DELETE",
      headers: authHeaders(),
    });

    return handleResponse(res);
  },
};