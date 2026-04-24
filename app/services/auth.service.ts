import type { User } from "~/types";
import { api, authHeaders, clearToken, getToken, handleResponse, setToken } from "./http.service";

export const authService = {
  create: async (data: Partial<User>) => {
    const res = await fetch(api("/auth/register"), {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
  
    return handleResponse(res);
  },
  
  login: async (data: Partial<User>) => {
    const res = await fetch(api("/auth/login"), {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    const result = await handleResponse(res);

    if (result.token) setToken(result.token);

    return result;
  },

  me: async () => {
    const token = getToken();
    if (!token) return null;

    const res = await fetch(api("/auth/me"), {
      headers: authHeaders(),
    });

    if (!res.ok) return null;
    return handleResponse(res);
  },

  logout: async () => {
    clearToken();

    const res = await fetch(api("/auth/logout"), {
      method: "POST",
      headers: authHeaders(),
    });

    return handleResponse(res);
  },

  googleLogin: () => {
    window.location.href = api("/auth/google");
  },

  facebookLogin: () => {
    window.location.href = api("/auth/facebook");
  },

  verifyEmail: async (data: { email: string; otp: string }) => { 
    const res = await fetch(api('/auth/verify-email'), { 
      method: "POST", 
      headers: authHeaders(), 
      body: JSON.stringify(data), 
    }); 
    
    return handleResponse(res); 
  }, 
  
  resendOtp: async (data: { email: string }) => { 
    const res = await fetch(api('/auth/resend-otp'), { 
      method: "POST", 
      headers: authHeaders(), 
      body: JSON.stringify(data), 
    }); 
    
    return handleResponse(res); 
  },
};