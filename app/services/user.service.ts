import type { User } from "~/types";
import { api, authHeaders, handleResponse } from "./http.service";

export const userService = {
  create: async (data: Partial<User>) => {
    const res = await fetch(api("/auth/register"), {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
  
    return handleResponse(res);
  },

  getAll: async () => {
    const res = await fetch(api("/users"), {
      headers: authHeaders(),
    });
    return handleResponse(res);
  },

  getById: async (id: number) => {
    const res = await fetch(api(`/users/${id}`), {
      headers: authHeaders(),
    });
    return handleResponse(res);
  },

  update: async (id: number, data: FormData) => {
    const res = await fetch(api(`/users/${id}`), {
      method: "PUT",
      headers: authHeaders(true),
      body: data,
    });

    return handleResponse(res);
  },

  delete: async (id: number) => {
    const res = await fetch(api(`/users/${id}`), {
      method: "DELETE",
      headers: authHeaders(),
    });

    return handleResponse(res);
  },

  toggleRole: async (id: number) => {
    const res = await fetch(api(`/users/${id}/toggle-role`), {
      method: "PATCH",
      headers: authHeaders(),
    });

    return handleResponse(res);
  },
};