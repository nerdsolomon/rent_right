import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  userService,
  propertyService,
  reviewService,
  feedbackService,
  bookingService,
  authService,
} from "~/services";

import type { User, Property, Review, Feedback, Booking } from "~/types";

import { emptyUser } from "~/types";

interface DataState {
  isAuthenticated: boolean;
  isLoading: boolean;

  users: User[];
  createUser: (user: User) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;

  currentUser: User;
  login: (user: User) => Promise<boolean>;
  logout: () => void;

  properties: Property[];
  createProperty: (property: Property) => Promise<void>;
  updateProperty: (property: Property) => Promise<void>;
  deleteProperty: (id: number) => Promise<void>;

  reviews: Review[];
  createReview: (review: Review) => Promise<void>;
  updateReview: (review: Review) => Promise<void>;
  deleteReview: (id: number) => Promise<void>;

  feedbacks: Feedback[];
  createFeedback: (feedback: Feedback) => Promise<void>;
  updateFeedback: (feedback: Feedback) => Promise<void>;
  deleteFeedback: (id: number) => Promise<void>;

  bookings: Booking[];
  createBooking: (booking: Booking) => Promise<void>;
  updateBooking: (booking: Booking) => Promise<void>;
  deleteBooking: (id: number) => Promise<void>;

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

  // ================= SYNC CURRENTUSER =================
  const syncAuth = async () => {
    setIsLoading(true);
    try {
      const user = await authService.getCurrentUser();
      if (user?.id) setCurrentUser(user);
    } catch (err) {
      console.error("Failed to sync auth:", err);
      setCurrentUser(emptyUser);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    syncAuth();
    refreshAll();
  }, []);

  // ================= AUTH =================
  const login = async (loginUser: User) => {
    try {
      const user = await authService.login(loginUser);
      setCurrentUser(user);
      navigate("/home");
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(emptyUser);
    navigate("/");
  };

  // ================= USERS =================
  const createUser = async (user: User) => {
    try {
      const created = await userService.create(user);
      setUsers((prev) => [...prev, created]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateUser = async (user: User) => {
    try {
      const updated = await userService.update(user);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
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
  const createProperty = async (property: Property) => {
    try {
      const created = await propertyService.create(property);
      setProperties((prev) => [...prev, created]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateProperty = async (property: Property) => {
    try {
      const updated = await propertyService.update(property);
      setProperties((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProperty = async (id: number) => {
    try {
      await propertyService.delete(id);
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ================= REVIEWS =================
  const createReview = async (review: Review) => {
    try {
      const created = await reviewService.create(review);
      setReviews((prev) => [...prev, created]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateReview = async (review: Review) => {
    try {
      const updated = await reviewService.update(review);
      setReviews((prev) =>
        prev.map((r) => (r.id === updated.id ? updated : r)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const deleteReview = async (id: number) => {
    try {
      await reviewService.delete(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ================= FEEDBACKS =================
  const createFeedback = async (feedback: Feedback) => {
    try {
      const created = await feedbackService.create(feedback);
      setFeedbacks((prev) => [...prev, created]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateFeedback = async (feedback: Feedback) => {
    try {
      const updated = await feedbackService.update(feedback);
      setFeedbacks((prev) =>
        prev.map((f) => (f.id === updated.id ? updated : f)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const deleteFeedback = async (id: number) => {
    try {
      await feedbackService.delete(id);
      setFeedbacks((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // ================= BOOKINGS =================
  const createBooking = async (booking: Booking) => {
    try {
      const created = await bookingService.create(booking);
      setBookings((prev) => [...prev, created]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateBooking = async (booking: Booking) => {
    try {
      const updated = await bookingService.update(booking);
      setBookings((prev) =>
        prev.map((b) => (b.id === updated.id ? updated : b)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBooking = async (id: number) => {
    try {
      await bookingService.delete(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
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
        createUser,
        updateUser,
        deleteUser,

        currentUser,
        login,
        logout,

        properties,
        createProperty,
        updateProperty,
        deleteProperty,

        reviews,
        createReview,
        updateReview,
        deleteReview,

        feedbacks,
        createFeedback,
        updateFeedback,
        deleteFeedback,

        bookings,
        createBooking,
        updateBooking,
        deleteBooking,

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
