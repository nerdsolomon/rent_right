import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  CURRENT_USER_KEY,
  deleteById,
  FEEDBACKS_KEY,
  getFromStorage,
  PROPERTIES_KEY,
  removeFromStorage,
  REVIEWS_KEY,
  saveToStorage,
  syncCurrentUser,
  USERS_KEY,
  BOOKINGS_KEY,
  NOTIFICATION_KEY
} from "~/services";
import {
  adminUser,
  emptyUser,
  type Booking,
  type Feedback,
  type Property,
  type Review,
  type User,
  type Notification
} from "~/types";

interface DataState {
  isAuthenticated: boolean;
  isLoading: boolean;
  users: User[];
  setUsers: (users: User[]) => void;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: number) => void;
  login: (user: User) => boolean;
  logout: () => void;
  toggleRole: (id: number) => void;
  properties: Property[];
  setProperties: (properties: Property[]) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (id: number) => void;
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
  feedbacks: Feedback[];
  setFeedbacks: (feedbacks: Feedback[]) => void;
  clearStorage: () => void;
  bookings: Booking[];
  updateBooking: (booking: Booking) => void
  setBookings: (bookings: Booking[]) => void;
  notifications: Notification[]
  setNotifications: (notifications: Notification[]) => void
}

const DataContext = createContext<DataState | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [users, setUsers] = useState<User[]>(() =>
    getFromStorage(USERS_KEY, []),
  );

  const [currentUser, setCurrentUser] = useState<User>(() =>
    getFromStorage(CURRENT_USER_KEY, emptyUser),
  );

  const [properties, setProperties] = useState<Property[]>(() =>
    getFromStorage(PROPERTIES_KEY, []),
  );

  const [reviews, setReviews] = useState<Review[]>(() =>
    getFromStorage(REVIEWS_KEY, []),
  );

  const [feedbacks, setFeedbacks] = useState<Feedback[]>(() =>
    getFromStorage(FEEDBACKS_KEY, []),
  );

  const [bookings, setBookings] = useState<Booking[]>(() =>
    getFromStorage(BOOKINGS_KEY, []),
  );

  const [notifications, setNotifications] = useState<Notification[]>(() =>
    getFromStorage(NOTIFICATION_KEY, [])
  )

  const isAuthenticated = Boolean(currentUser?.id);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (users.length === 0) setUsers([adminUser]);
    setCurrentUser((prev) => syncCurrentUser(users, prev));

    if (currentUser?.id) saveToStorage(CURRENT_USER_KEY, currentUser);
    saveToStorage(USERS_KEY, users);
    saveToStorage(PROPERTIES_KEY, properties);
    saveToStorage(REVIEWS_KEY, reviews);
    saveToStorage(FEEDBACKS_KEY, feedbacks);
    saveToStorage(BOOKINGS_KEY, bookings);
    saveToStorage(NOTIFICATION_KEY, notifications)
  }, [users, currentUser, properties, reviews, feedbacks, bookings]);

  const clearStorage = () => {
    removeFromStorage(USERS_KEY);
    removeFromStorage(CURRENT_USER_KEY);
    removeFromStorage(PROPERTIES_KEY);
    removeFromStorage(REVIEWS_KEY);
    removeFromStorage(FEEDBACKS_KEY);
    removeFromStorage(BOOKINGS_KEY);
    removeFromStorage(NOTIFICATION_KEY)

    setUsers([]);
    setCurrentUser(emptyUser);
    setProperties([]);
    setReviews([]);
    setFeedbacks([]);
    setBookings([]);
    setNotifications([])

    navigate("/");
  };

  const login = (loginUser: User) => {
    const foundUser = users.find(
      (user) =>
        user.email === loginUser.email && user.password === loginUser.password,
    );
    if (!foundUser) return false;
    setCurrentUser(foundUser);
    navigate("/home");
    return true;
  };

  const logout = () => {
    setCurrentUser(emptyUser);
    removeFromStorage(CURRENT_USER_KEY);
    navigate("/");
  };

  const updateUser = (updatedUser: User) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
    );
  };

  const updateBooking = (updatedBooking: Booking) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === updatedBooking.id ? updatedBooking : b)),
    );
  };

  const updateProperty = (updatedProperty: Property) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === updatedProperty.id ? updatedProperty : p)),
    );
  };

  const deleteUser = (id: number) => {
    setUsers((prev) => deleteById(prev, id));
    if (currentUser.id === id) logout();
  };

  const toggleRole = (id: number) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, role: user.role === "admin" ? "user" : "admin" }
          : user,
      ),
    );
  };

  const deleteProperty = (id: number) => {
    setProperties((prev) => deleteById(prev, id));
  };

  useEffect(() => {
    const handler = (event: StorageEvent) => {
      if (event.key === USERS_KEY && event.newValue) {
        setUsers(JSON.parse(event.newValue));
      }

      if (event.key === CURRENT_USER_KEY) {
        setCurrentUser(event.newValue ? JSON.parse(event.newValue) : emptyUser);
      }

      if (event.key === PROPERTIES_KEY && event.newValue) {
        setProperties(JSON.parse(event.newValue));
      }

      if (event.key === REVIEWS_KEY && event.newValue) {
        setProperties(JSON.parse(event.newValue));
      }

      if (event.key === FEEDBACKS_KEY && event.newValue) {
        setProperties(JSON.parse(event.newValue));
      }

      if (event.key === NOTIFICATION_KEY && event.newValue) {
        setNotifications(JSON.parse(event.newValue))
      }
    };

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <DataContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        users,
        setUsers,
        currentUser,
        setCurrentUser,
        updateUser,
        deleteUser,
        login,
        logout,
        toggleRole,
        properties,
        setProperties,
        updateProperty,
        deleteProperty,
        reviews,
        setReviews,
        feedbacks,
        setFeedbacks,
        clearStorage,
        bookings,
        updateBooking,
        setBookings,
        notifications,
        setNotifications
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error("useData must be used within DataProvider");
  }
  return ctx;
};
