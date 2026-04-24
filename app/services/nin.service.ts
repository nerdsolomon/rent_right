import { api, authHeaders, handleResponse } from "./http.service";

export const ninService = {
  submit: async (data: { nin: string; name: string; address: string }) => {
    const res = await fetch(api('/nin-verification/submit'), {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  status: async () => {
    const res = await fetch(api('/nin-verification/status'), {
      headers: authHeaders(),
    });

    return handleResponse(res);
  },

  adminGetAll: async (status?: string) => {
    const res = await fetch(
      api('/nin-verification/admin/ll${status ? `?status=${status}` : ""}'),
      { headers: authHeaders() }
    );

    return handleResponse(res);
  },

  review: async (id: number, data: { status: "approved" | "rejected" }) => {
    const res = await fetch(
      api('/nin-verification/admin/{id}/review'),
      {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify(data),
      }
    );

    return handleResponse(res);
  },
};