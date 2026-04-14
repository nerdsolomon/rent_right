import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import {
  userService,
  propertyService,
  reviewService,
  feedbackService,
  bookingService,
  authService,
  notificationService,
} from "~/services";

import type {
  User,
  Property,
  Review,
  Feedback,
  Booking,
  Notification,
} from "~/types";

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
  deleteReview: (id: number) => Promise<void>;

  feedbacks: Feedback[];
  createFeedback: (feedback: Feedback) => Promise<void>;
  deleteFeedback: (id: number) => Promise<void>;

  bookings: Booking[];
  createBooking: (booking: Booking) => Promise<void>;
  deleteBooking: (id: number) => Promise<void>;

  notifications: Notification[];
  createNotification: (notification: Notification) => Promise<void>;
  updateNotification: (notification: Notification) => Promise<void>;
  deleteNotification: (id: number) => Promise<void>;

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
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [currentUser, setCurrentUser] = useState<User>(emptyUser);

  const isAuthenticated = Boolean(currentUser?.id);

  // ================= REFRESH ALL =================
  const refreshAll = async () => {
    try {
      setIsLoading(true);

      const [usersData, propertiesData, reviewsData, feedbacksData, bookingsData, notificationsData] =
        await Promise.all([
          userService.getAll(),
          propertyService.getAll(),
          reviewService.getAll(),
          feedbackService.getAll(),
          bookingService.getAll(),
          notificationService.getAll(),
        ]);

      setUsers(usersData);
      setProperties(propertiesData);
      setReviews(reviewsData);
      setFeedbacks(feedbacksData);
      setBookings(bookingsData);
      setNotifications(notificationsData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // ================= AUTH SYNC =================
  const syncAuth = async () => {
    try {
      const user = await authService.me();
      setCurrentUser(user?.id ? user : emptyUser);
    } catch (err) {
      console.error(err);
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
  const login = async (user: User) => {
    try {
      const res = await authService.login(user);
      setCurrentUser(res?.user || res);
      navigate("/home");
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = async () => {
    await authService.logout();
    setCurrentUser(emptyUser);
    navigate("/");
  };

  // ================= USERS =================
  const createUser = async (user: User) => {
    const created = await authService.create(user);
    setUsers((prev) => [...prev, created]);
  };

  const updateUser = async (user: User) => {
    const updated = await userService.update(user.id, user);
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  };

  const deleteUser = async (id: number) => {
    await userService.delete(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));

    if (currentUser.id === id) logout();
  };

  // ================= PROPERTIES =================
  const createProperty = async (property: Property) => {
    const created = await propertyService.create(property);
    setProperties((prev) => [...prev, created]);
  };

  const updateProperty = async (property: Property) => {
    const updated = await propertyService.update(property.id, property);
    setProperties((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const deleteProperty = async (id: number) => {
    await propertyService.delete(id);
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  // ================= REVIEWS =================
  const createReview = async (review: Review) => {
    const created = await reviewService.create(review);
    setReviews((prev) => [...prev, created]);
  };

  const deleteReview = async (id: number) => {
    await reviewService.delete(id);
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  // ================= FEEDBACK =================
  const createFeedback = async (feedback: Feedback) => {
    const created = await feedbackService.create(feedback);
    setFeedbacks((prev) => [...prev, created]);
  };

  const deleteFeedback = async (id: number) => {
    await feedbackService.delete(id);
    setFeedbacks((prev) => prev.filter((f) => f.id !== id));
  };

  // ================= BOOKINGS =================
  const createBooking = async (booking: Booking) => {
    const created = await bookingService.create(booking);
    setBookings((prev) => [...prev, created]);
  };

  const deleteBooking = async (id: number) => {
    await bookingService.delete(id);
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  // ================= NOTIFICATIONS =================
  const createNotification = async (notification: Notification) => {
    const created = await notificationService.create(notification);
    setNotifications((prev) => [...prev, created]);
  };

  const updateNotification = async (notification: Notification) => {
    const updated = await notificationService.update(notification.id, notification);
    setNotifications((prev) =>
      prev.map((n) => (n.id === updated.id ? updated : n))
    );
  };

  const deleteNotification = async (id: number) => {
    await notificationService.delete(id);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
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
        deleteReview,

        feedbacks,
        createFeedback,
        deleteFeedback,

        bookings,
        createBooking,
        deleteBooking,

        notifications,
        createNotification,
        updateNotification,
        deleteNotification,

        refreshAll,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDatabase = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useDatabase must be used within DataProvider");
  return ctx;
};