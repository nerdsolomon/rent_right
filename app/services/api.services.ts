// api.services.ts

import { type User, type Property, type Review, type Feedback, type Booking, emptyUser, type Notification } from "~/types";

const BASE_URL = "/api";

const TOKEN_KEY = "auth_token";

// ================= AUTH =================
export const authService = {
  async login(loginUser: User): Promise<User> {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginUser),
    });
    if (!res.ok) throw new Error("Login failed");
    const data = await res.json();
    if (data.token) localStorage.setItem(TOKEN_KEY, data.token);
    return data;
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  async getCurrentUser(): Promise<User> {
    const token = this.getToken();
    if (!token) return emptyUser;
    const res = await fetch(`${BASE_URL}/auth/currentUser`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return emptyUser;
    return res.json();
  },
};

// ================= USERS =================
export const userService = {
  async getAll(): Promise<User[]> {
    const res = await fetch(`${BASE_URL}/users`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  },

  create: async (data: User) => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async update(user: User): Promise<User> {
    const res = await fetch(`${BASE_URL}/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!res.ok) throw new Error("Failed to update user");
    return res.json();
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete user");
  },
};

// ================= PROPERTIES =================
export const propertyService = {
  async getAll(): Promise<Property[]> {
    const res = await fetch(`${BASE_URL}/properties`);
    if (!res.ok) throw new Error("Failed to fetch properties");
    return res.json();
  },

  create: async (data: Property) => {
    const res = await fetch("/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async update(property: Property): Promise<Property> {
    const res = await fetch(`${BASE_URL}/properties/${property.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(property),
    });

    if (!res.ok) throw new Error("Failed to update property");
    return res.json();
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/properties/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete property");
  },
};

// ================= REVIEWS =================
export const reviewService = {
  async getAll(): Promise<Review[]> {
    const res = await fetch(`${BASE_URL}/reviews`);
    if (!res.ok) throw new Error("Failed to fetch reviews");
    return res.json();
  },

  create: async (data: Review) => {
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async update(review: Review): Promise<Review> {
    const res = await fetch(`${BASE_URL}/reviews/${review.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    });

    if (!res.ok) throw new Error("Failed to update review");
    return res.json();
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/reviews/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete review");
  },
};

// ================= FEEDBACKS =================
export const feedbackService = {
  async getAll(): Promise<Feedback[]> {
    const res = await fetch(`${BASE_URL}/feedbacks`);
    if (!res.ok) throw new Error("Failed to fetch feedbacks");
    return res.json();
  },

  create: async (data: Feedback) => {
    const res = await fetch("/api/feedbacks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async update(feedback: Feedback): Promise<Feedback> {
    const res = await fetch(`${BASE_URL}/feedbacks/${feedback.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedback),
    });

    if (!res.ok) throw new Error("Failed to update feedback");
    return res.json();
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/feedbacks/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete feedback");
  },
};

// ================= BOOKINGS =================
export const bookingService = {
  async getAll(): Promise<Booking[]> {
    const res = await fetch(`${BASE_URL}/bookings`);
    if (!res.ok) throw new Error("Failed to fetch bookings");
    return res.json();
  },

  create: async (data: Booking) => {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async update(booking: Booking): Promise<Booking> {
    const res = await fetch(`${BASE_URL}/bookings/${booking.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    });

    if (!res.ok) throw new Error("Failed to update booking");
    return res.json();
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/bookings/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete booking");
  },
};


// ================= NOTIFICATIONS =================
export const notificationService = {
  async getAll(): Promise<Notification[]> {
    const res = await fetch(`${BASE_URL}/notifications`);
    if (!res.ok) throw new Error("Failed to fetch notifications");
    return res.json();
  },

  create: async (data: Notification) => {
    const res = await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async update(notification: Notification): Promise<Notification> {
    const res = await fetch(`${BASE_URL}/notifications/${notification.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notification),
    });

    if (!res.ok) throw new Error("Failed to update notification");
    return res.json();
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/notifications/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete notification");
  },
};