import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import apartment_1 from "~/assets/apartment_001.jpg";
import apartment_2 from "~/assets/apartment_002.jpg";

export const images = [apartment_1, apartment_2];

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: number;
  password: string;
  role?: string;
  NIN?: string;
  imageUrl?: string;
}

export const emptyUser: User = {
  id: NaN,
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: NaN,
  password: "",
  role: "",
  NIN: "",
  imageUrl: "",
};

export interface Property {
  id: number
  title: string
  description: string
  location: string
  imageUrl?: string
}

export const emptyProperty: Property = {
    id: NaN,
    title: "",
    location: "",
    description: "",
    imageUrl: ""
};

interface DataState {
  users: User[];
  setUsers: (users: User[]) => void;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  updateUser: (updatedUser: User) => void;
  deleteUser: (userId: number) => void;
  logout: () => void;
  properties: Property[];
  setProperties: (properties: Property[]) => void;
  deleteProperty: (propertyId: number) => void
}

const DataContext = createContext<DataState | null>(null);

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";
const PROPERTIES_KEY = "properties";

const getFromStorage = <T,>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    const parsed = JSON.parse(item);
    if (Array.isArray(fallback) && !Array.isArray(parsed)) {
      return fallback;
    }
    return parsed;
  } catch {
    return fallback;
  }
};

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>(() =>
    getFromStorage<User[]>(USERS_KEY, [])
  );

  const [currentUser, setCurrentUser] = useState<User>(() =>
    getFromStorage<User>(CURRENT_USER_KEY, emptyUser)
  );

  const [properties, setProperties] = useState<Property[]>(() =>
    getFromStorage<Property[]>(PROPERTIES_KEY, [])
  );

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser.id !== 0) {
      localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(currentUser)
      );
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(PROPERTIES_KEY, JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    if (!currentUser.id) return;

    const freshUser = users.find((u) => u.id === currentUser.id);
    if (freshUser) {
      setCurrentUser(freshUser);
    }
  }, [users]);

  const logout = () => {
    setCurrentUser(emptyUser);
    localStorage.removeItem(CURRENT_USER_KEY);
    navigate("/");
  };

  const updateUser = (updatedUser: User) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };

  const deleteUser = (userId: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    if (currentUser.id === userId) logout();
  };

  const deleteProperty = (propertyId: number) => {
    setProperties((prev) => prev.filter((p) => p.id !== propertyId));
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === USERS_KEY && event.newValue) {
        setUsers(JSON.parse(event.newValue));
      }

      if (event.key === CURRENT_USER_KEY) {
        setCurrentUser(
          event.newValue ? JSON.parse(event.newValue) : emptyUser
        );
      }

      if (event.key === PROPERTIES_KEY && event.newValue) {
        setProperties(JSON.parse(event.newValue));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () =>
      window.removeEventListener("storage", handleStorageChange);
  }, []);

  const state: DataState = {
    users,
    setUsers,
    currentUser,
    setCurrentUser,
    updateUser,
    deleteUser,
    logout,
    properties,
    setProperties,
    deleteProperty,
  };

  return (
    <DataContext.Provider value={state}>
      {children}
    </DataContext.Provider>
  );
};

const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export { DataProvider, useData };
