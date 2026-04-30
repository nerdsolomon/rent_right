import type { Booking } from "~/types";
import { api, authHeaders, handleResponse } from "./http.service";

export const bookingService = {
  getAll: async () => {
    const res = await fetch(api("/bookings"), {
      headers: authHeaders(),
    });

    return handleResponse(res);
  },

  create: async (data: Partial<Booking>) => {
    const res = await fetch(api('/bookings'), {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  update: async (id: number, data: Partial<Booking>) => {
    const res = await fetch(api(`/bookings/${id}`), {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(data), 
    });

    return handleResponse(res);
  },

  delete: async (id: number) => {
    const res = await fetch(api(`/bookings/${id}`), {
      method: "DELETE",
      headers: authHeaders(),
    });

    return handleResponse(res);
  },
};