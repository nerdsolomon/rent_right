import type { Feedback } from "~/types";
import { api, authHeaders, handleResponse } from "./http.service";

export const feedbackService = {
  getAll: async () => {
    const res = await fetch(api('/feedbacks'), {
      headers: authHeaders(),
    });

    return handleResponse(res);
  },

  create: async (data: FormData) => {
    const res = await fetch(api('/feedbacks'), {
      method: "POST",
      headers: authHeaders(true),
      body: data,
    });

    return handleResponse(res);
  },

  markViewed: async (id: number) => {
    const res = await fetch(api('/feedbacks/${id}/view'), {
      method: "PATCH",
      headers: authHeaders(),
    });

    return handleResponse(res);
  },

  update: async (id: number, data: Partial<Feedback>) => {
    const res = await fetch(api('/feedbacks/${id}'), {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(data), 
    });

    return handleResponse(res);
  },

  delete: async (id: number) => {
    const res = await fetch(api('/feedbacks/${id}'), {
      method: "DELETE",
      headers: authHeaders(),
    });

    return handleResponse(res);
  },
};