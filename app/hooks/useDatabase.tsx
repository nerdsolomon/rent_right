import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  userService,
  propertyService,
  reviewService,
  feedbackService,
  bookingService,
} from "~/services";

import type {
  User,
  Property,
  Review,
  Feedback,
  Booking,
} from "~/types";

import { emptyUser } from "~/types";

interface DataState {
  isAuthenticated: boolean;
  isLoading: boolean;

  users: User[];
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;

  currentUser: User;
  login: (user: User) => Promise<boolean>;
  logout: () => void;

  properties: Property[];
  updateProperty: (property: Property) => Promise<void>;
  deleteProperty: (id: number) => Promise<void>;

  reviews: Review[];
  feedbacks: Feedback[];
  bookings: Booking[];

  refreshAll: () => Promise<void>;
}

const DataContext = createContext<DataState | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [users, setUsers] = useState<User[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [currentUser, setCurrentUser] = useState<User>(emptyUser);

  const isAuthenticated = Boolean(currentUser?.id);

  // ================= FETCH ALL =================
  const refreshAll = async () => {
    try {
      setIsLoading(true);

      const [
        usersData,
        propertiesData,
        reviewsData,
        feedbacksData,
        bookingsData,
      ] = await Promise.all([
        userService.getAll(),
        propertyService.getAll(),
        reviewService.getAll(),
        feedbackService.getAll(),
        bookingService.getAll(),
      ]);

      setUsers(usersData);
      setProperties(propertiesData);
      setReviews(reviewsData);
      setFeedbacks(feedbacksData);
      setBookings(bookingsData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshAll();
  }, []);

  // ================= AUTH =================
  const login = async (loginUser: User) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginUser),
      });

      if (!res.ok) return false;

      const data = await res.json();
      setCurrentUser(data.user);

      navigate("/home");
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(emptyUser);
    navigate("/");
  };

  // ================= USERS =================
  const updateUser = async (user: User) => {
    try {
      const updated = await userService.update(user);

      setUsers((prev) =>
        prev.map((u) => (u.id === updated.id ? updated : u))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await userService.delete(id);

      setUsers((prev) => prev.filter((u) => u.id !== id));

      if (currentUser.id === id) logout();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= PROPERTIES =================
  const updateProperty = async (property: Property) => {
    try {
      const updated = await propertyService.update(property);

      setProperties((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProperty = async (id: number) => {
    try {
      await propertyService.delete(id);

      setProperties((prev) =>
        prev.filter((p) => p.id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DataContext.Provider
      value={{
        isAuthenticated,
        isLoading,

        users,
        updateUser,
        deleteUser,

        currentUser,
        login,
        logout,

        properties,
        updateProperty,
        deleteProperty,

        reviews,
        feedbacks,
        bookings,

        refreshAll,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDatabase = () => {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error("useDatabase must be used within DataProvider");
  }
  return ctx;
};