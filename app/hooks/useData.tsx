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

export interface Property {
  id?: number
  title: string
  description: string
  location: string
  imageUrl: string
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

interface DataState {
  users: User[];
  setUsers: (users: User[]) => void;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  updateUser: (updatedUser: User) => void;
  deleteUser: (userId: number) => void;
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
    if (currentUser.id !== 0) {
      localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(currentUser)
      );
    }
  }, [currentUser]);

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
