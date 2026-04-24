import type { Notification } from "~/types";
import { api, authHeaders, handleResponse } from "./http.service";

export const notificationService = {
  getAll: async () => {
    const res = await fetch(api('/notifications'), {
      headers: authHeaders(),
    });

    return handleResponse(res);
  },

  create: async (data: Notification) => {
    const res = await fetch(api('/notifications'), {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  update: async (id: number, data: Notification) => {
    const res = await fetch(api('/notifications/${id}'), {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  delete: async (id: number) => {
    const res = await fetch(api('/notifications/${id}'), {
      method: "DELETE",
      headers: authHeaders(),
    });

    return handleResponse(res);
  },
};