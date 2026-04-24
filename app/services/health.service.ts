import { api, handleResponse } from "./http.service";

export const healthService = {
  check: async () => {
    const res = await fetch(api('/health'));
    return handleResponse(res);
  },
};