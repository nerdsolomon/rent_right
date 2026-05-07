import type { User } from "~/types";
import { api, authHeaders,  handleResponse,  } from "./http.service";

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
      credentials: "include",
    });

    const result = await handleResponse(res);

    // if (result.token) setToken(result.token);

    return result;
  },

  me: async () => {
  const res = await fetch(api("/auth/me"), {
    credentials: "include", 
    headers: authHeaders(),
  });

  if (!res.ok) return null;
  return handleResponse(res);
},

  logout: async () => {
    // clearToken();

    const res = await fetch(api("/auth/logout"), {
      method: "POST",
      headers: authHeaders(),
      credentials: "include",
    });

    return handleResponse(res);
  },

  googleLogin: () => {
    window.location.href = api("/auth/google");
  },

  facebookLogin: () => {
    window.location.href = api("/auth/facebook");
  },

  requestOtp: async (data: { email: string }) => { 
    const res = await fetch(api('/auth/request-email-otp'), { 
      method: "POST", 
      headers: authHeaders(), 
      body: JSON.stringify(data), 
    }); 
    
    return handleResponse(res); 
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