// api.services.ts

import type { User, Property, Review, Feedback, Booking } from "~/types";

const BASE_URL = "/api";

// ================= USERS =================
export const userService = {
  async getAll(): Promise<User[]> {
    const res = await fetch(`${BASE_URL}/users`);
    if (!res.ok) throw new Error("Failed to fetch users");
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
};

// ================= FEEDBACKS =================
export const feedbackService = {
  async getAll(): Promise<Feedback[]> {
    const res = await fetch(`${BASE_URL}/feedbacks`);
    if (!res.ok) throw new Error("Failed to fetch feedbacks");
    return res.json();
  },
};

// ================= BOOKINGS =================
export const bookingService = {
  async getAll(): Promise<Booking[]> {
    const res = await fetch(`${BASE_URL}/bookings`);
    if (!res.ok) throw new Error("Failed to fetch bookings");
    return res.json();
  },
};