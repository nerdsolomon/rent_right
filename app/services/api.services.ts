import {
  type User,
  type Property,
  type Review,
  type Feedback,
  type Booking,
  type Notification,
  emptyUser,
} from "~/types";

const BASE_URL = "https://rental-app-backend-b4lj.onrender.com/api";
const TOKEN_KEY = "auth_token";

// ================= HELPERS =================
const getToken = () => localStorage.getItem(TOKEN_KEY);

const handleResponse = async (res: Response) => {
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
};

export const authHeaders = (isFormData = false) => {
  const token = getToken();

  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };
};

// ================= AUTH =================
export const authService = {
  create: async (data: Partial<User>) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  login: async (data: Partial<User>) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    const result = await handleResponse(res);

    if (result.token) {
      localStorage.setItem(TOKEN_KEY, result.token);
    }

    return result;
  },

  verifyEmail: async (data: { email: string; otp: string }) => {
    const res = await fetch(`${BASE_URL}/auth/verify-email`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  verifyPhone: async (data: { phone: string; otp: string }) => {
    const res = await fetch(`${BASE_URL}/auth/verify-phone`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  resendOtp: async (data: { email?: string; phone?: string }) => {
    const res = await fetch(`${BASE_URL}/auth/resend-otp`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  me: async (): Promise<User | null> => {
    const token = getToken();
    if (!token) return null;

    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: authHeaders(),
    });

    if (!res.ok) return null;

    return handleResponse(res);
  },

  logout: async () => {
    const token = getToken();
    localStorage.removeItem(TOKEN_KEY);

    if (!token) return;

    const res = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: authHeaders(),
    });

    return handleResponse(res);
  },

  googleLogin: () => {
    window.location.href = `${BASE_URL}/auth/google`;
  },

  facebookLogin: () => {
    window.location.href = `${BASE_URL}/auth/facebook`;
  },
};

// ================= USERS =================
export const userService = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/users`, {
      headers: authHeaders(),
    });
    return handleResponse(res);
  },

  create: async (data: Partial<User>) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  getById: async (id: number) => {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
      headers: authHeaders(),
    });
    return handleResponse(res);
  },

  update: async (id: number, data: Partial<User>) => {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  delete: async (id: number) => {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    return handleResponse(res);
  },

  toggleRole: async (id: number) => {
    const res = await fetch(`${BASE_URL}/users/${id}/toggle-role`, {
      method: "PATCH",
      headers: authHeaders(),
    });

    return handleResponse(res);
  },
};

// ================= NIN =================
export const ninService = {
  submit: async (data: { nin: string; name: string; address: string }) => {
    const res = await fetch(`${BASE_URL}/nin-verification/submit`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  status: async () => {
    const res = await fetch(`${BASE_URL}/nin-verification/status`, {
      headers: authHeaders(),
    });

    return handleResponse(res);
  },

  adminGetAll: async (status?: string) => {
    const res = await fetch(
      `${BASE_URL}/nin-verification/admin/all${status ? `?status=${status}` : ""}`,
      { headers: authHeaders() }
    );

    return handleResponse(res);
  },

  review: async (id: number, data: { status: "approved" | "rejected" }) => {
    const res = await fetch(
      `${BASE_URL}/nin-verification/admin/${id}/review`,
      {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify(data),
      }
    );

    return handleResponse(res);
  },
};

// ================= PROPERTIES =================
export const propertyService = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/properties`);
    return handleResponse(res);
  },

  getById: async (id: number) => {
    const res = await fetch(`${BASE_URL}/properties/${id}`);
    return handleResponse(res);
  },

  getByOwner: async (userId: number) => {
    const res = await fetch(`${BASE_URL}/properties/owner/${userId}`);
    return handleResponse(res);
  },

  create: async (data: Property) => {
    const res = await fetch(`${BASE_URL}/properties`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  update: async (id: number, data: FormData) => {
    const res = await fetch(`${BASE_URL}/properties/${id}`, {
      method: "PUT",
      headers: authHeaders(true),
      body: data,
    });

    return handleResponse(res);
  },

  delete: async (id: number) => {
    const res = await fetch(`${BASE_URL}/properties/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    return handleResponse(res);
  },
};

// ================= REVIEWS =================
export const reviewService = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/reviews`);
    return handleResponse(res);
  },

  getByProperty: async (propertyId: number) => {
    const res = await fetch(`${BASE_URL}/reviews/property/${propertyId}`);
    return handleResponse(res);
  },

  create: async (data: Review) => {
    const res = await fetch(`${BASE_URL}/reviews`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  delete: async (id: number) => {
    const res = await fetch(`${BASE_URL}/reviews/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    return handleResponse(res);
  },
};

// ================= FEEDBACK =================
export const feedbackService = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/feedbacks`, {
      headers: authHeaders(),
    });

    return handleResponse(res);
  },

  create: async (data: Feedback) => {
    const res = await fetch(`${BASE_URL}/feedbacks`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  markViewed: async (id: number) => {
    const res = await fetch(`${BASE_URL}/feedbacks/${id}/view`, {
      method: "PATCH",
      headers: authHeaders(),
    });

    return handleResponse(res);
  },

  delete: async (id: number) => {
    const res = await fetch(`${BASE_URL}/feedbacks/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    return handleResponse(res);
  },
};

// ================= BOOKINGS =================
export const bookingService = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/bookings`, {
      headers: authHeaders(),
    });

    return handleResponse(res);
  },

  myBookings: async () => {
    const res = await fetch(`${BASE_URL}/bookings/my-bookings`, {
      headers: authHeaders(),
    });

    return handleResponse(res);
  },

  create: async (data: Booking) => {
    const res = await fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  update: async (id: number, data: Partial<Booking>) => {
    const res = await fetch(`${BASE_URL}/bookings/${id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(data), 
    });

    return handleResponse(res);
  },

  delete: async (id: number) => {
    const res = await fetch(`${BASE_URL}/bookings/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    return handleResponse(res);
  },
};

// ================= NOTIFICATIONS =================
export const notificationService = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/notifications`, {
      headers: authHeaders(),
    });

    return handleResponse(res);
  },

  create: async (data: Notification) => {
    const res = await fetch(`${BASE_URL}/notifications`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  update: async (id: number, data: Notification) => {
    const res = await fetch(`${BASE_URL}/notifications/${id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });

    return handleResponse(res);
  },

  delete: async (id: number) => {
    const res = await fetch(`${BASE_URL}/notifications/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    return handleResponse(res);
  },
};

// ================= HEALTH =================
export const healthService = {
  check: async () => {
    const res = await fetch(`${BASE_URL}/health`);
    return handleResponse(res);
  },
};