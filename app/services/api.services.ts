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

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});


// ================= AUTH =================
export const authService = {
  create: async (data: Partial<User>) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("REGISTER ERROR:", result);
      throw new Error(result?.message || "Registration failed");
    }

    return result;
  },

  login: async (data: Partial<User>) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("LOGIN ERROR:", result);
      throw new Error(result?.message || "Login failed");
    }

    if (result.token) {
      localStorage.setItem(TOKEN_KEY, result.token);
    }

    return result;
  },

  verifyEmail: async (data: { email: string; otp: string }) => {
    const res = await fetch(`${BASE_URL}/auth/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  verifyPhone: async (data: { phone: string; otp: string }) => {
    const res = await fetch(`${BASE_URL}/auth/verify-phone`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  resendOtp: async (data: { email?: string; phone?: string }) => {
    const res = await fetch(`${BASE_URL}/auth/resend-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  me: async (): Promise<User> => {
    const token = getToken();
    if (!token) return emptyUser;

    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return emptyUser;
    return res.json();
  },

  logout: async () => {
    const token = getToken();
    localStorage.removeItem(TOKEN_KEY);

    if (!token) return;

    await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
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
    return res.json();
  },

  getById: async (id: number) => {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
      headers: authHeaders(),
    });
    return res.json();
  },

  update: async (id: number, data: Partial<User>) => {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  delete: async (id: number) => {
    await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
  },

  toggleRole: async (id: number) => {
    const res = await fetch(`${BASE_URL}/users/${id}/toggle-role`, {
      method: "PATCH",
      headers: authHeaders(),
    });
    return res.json();
  },
};

// ================= NIN VERIFICATION =================
export const ninService = {
  submit: async (data: {
    nin: string;
    name: string;
    address: string;
  }) => {
    const res = await fetch(`${BASE_URL}/nin-verification/submit`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  status: async () => {
    const res = await fetch(`${BASE_URL}/nin-verification/status`, {
      headers: authHeaders(),
    });
    return res.json();
  },

  adminGetAll: async (status?: string) => {
    const res = await fetch(
      `${BASE_URL}/nin-verification/admin/all${
        status ? `?status=${status}` : ""
      }`,
      { headers: authHeaders() }
    );
    return res.json();
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
    return res.json();
  },
};

// ================= PROPERTIES =================
export const propertyService = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/properties`);
    return res.json();
  },

  getById: async (id: number) => {
    const res = await fetch(`${BASE_URL}/properties/${id}`);
    return res.json();
  },

  getByOwner: async (userId: number) => {
    const res = await fetch(`${BASE_URL}/properties/owner/${userId}`);
    return res.json();
  },

  create: async (data: Property) => {
    const res = await fetch(`${BASE_URL}/properties`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  update: async (id: number, data: Property) => {
    const res = await fetch(`${BASE_URL}/properties/${id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  delete: async (id: number) => {
    await fetch(`${BASE_URL}/properties/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
  },
};

// ================= REVIEWS =================
export const reviewService = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/reviews`);
    return res.json();
  },

  getByProperty: async (propertyId: number) => {
    const res = await fetch(
      `${BASE_URL}/reviews/property/${propertyId}`
    );
    return res.json();
  },

  create: async (data: Review) => {
    const res = await fetch(`${BASE_URL}/reviews`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  delete: async (id: number) => {
    await fetch(`${BASE_URL}/reviews/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
  },
};

// ================= FEEDBACK =================
export const feedbackService = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/feedbacks`, {
      headers: authHeaders(),
    });
    return res.json();
  },

  create: async (data: Feedback) => {
    const res = await fetch(`${BASE_URL}/feedbacks`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  markViewed: async (id: number) => {
    const res = await fetch(`${BASE_URL}/feedbacks/${id}/view`, {
      method: "PATCH",
      headers: authHeaders(),
    });
    return res.json();
  },

  delete: async (id: number) => {
    await fetch(`${BASE_URL}/feedbacks/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
  },
};

// ================= BOOKINGS =================
export const bookingService = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/bookings`, {
      headers: authHeaders(),
    });
    return res.json();
  },

  myBookings: async () => {
    const res = await fetch(`${BASE_URL}/bookings/my-bookings`, {
      headers: authHeaders(),
    });
    return res.json();
  },

  create: async (data: Booking) => {
    const res = await fetch(`${BASE_URL}/bookings`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  delete: async (id: number) => {
    await fetch(`${BASE_URL}/bookings/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
  },
};

// ================= NOTIFICATIONS =================
export const notificationService = {
  getAll: async () => {
    const res = await fetch(`${BASE_URL}/notifications`, {
      headers: authHeaders(),
    });
    return res.json();
  },

  create: async (data: Notification) => {
    const res = await fetch(`${BASE_URL}/notifications`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  update: async (id: number, data: Notification) => {
    const res = await fetch(`${BASE_URL}/notifications/${id}`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  delete: async (id: number) => {
    await fetch(`${BASE_URL}/notifications/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });
  },
};

// ================= HEALTH CHECK =================
export const healthService = {
  check: async () => {
    const res = await fetch(`${BASE_URL}/health`);
    return res.json();
  },
};