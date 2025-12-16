import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

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
  id: 0,
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: 0,
  password: "",
  role: "",
  NIN: "",
  imageUrl: "",
};

interface DataState {
  users: User[];
  setUsers: (users: User[]) => void;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  logout: () => void;
}

const DataContext = createContext<DataState | null>(null);

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

const getFromStorage = <T,>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
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

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
  }, [currentUser]);

  const logout = () => {
    setCurrentUser(emptyUser);
    localStorage.removeItem(CURRENT_USER_KEY);
    navigate("/");
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === USERS_KEY && event.newValue) {
        setUsers(JSON.parse(event.newValue));
      }

      if (event.key === CURRENT_USER_KEY) {
        setCurrentUser(event.newValue ? JSON.parse(event.newValue) : emptyUser);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const state: DataState = {
    users,
    setUsers,
    currentUser,
    setCurrentUser,
    logout,
  };

  return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
};

const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export { DataProvider, useData };
