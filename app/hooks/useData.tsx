import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  CURRENT_USER_KEY,
  deleteById,
  getFromStorage,
  PROPERTIES_KEY,
  removeFromStorage,
  saveToStorage,
  syncCurrentUser,
  USERS_KEY,
} from "~/services";
import { emptyUser, type Property, type User } from "~/types";

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
  makeOwner: (id: number) => void;
  properties: Property[];
  setProperties: (properties: Property[]) => void;
  deleteProperty: (id: number) => void;
}

const DataContext = createContext<DataState | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [users, setUsers] = useState<User[]>(() =>
    getFromStorage(USERS_KEY, [])
  );

  const [currentUser, setCurrentUser] = useState<User>(() =>
    getFromStorage(CURRENT_USER_KEY, emptyUser)
  );

  const [properties, setProperties] = useState<Property[]>(() =>
    getFromStorage(PROPERTIES_KEY, [])
  );

  const isAuthenticated = Boolean(currentUser?.id);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    saveToStorage(USERS_KEY, users);
  }, [users]);

  useEffect(() => {
    if (currentUser?.id) {
      saveToStorage(CURRENT_USER_KEY, currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    saveToStorage(PROPERTIES_KEY, properties);
  }, [properties]);

  useEffect(() => {
    setCurrentUser((prev) => syncCurrentUser(users, prev));
  }, [users]);

  const login = (loginUser: User) => {
    const foundUser = users.find(
      (user) =>
        user.email === loginUser.email && user.password === loginUser.password
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
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
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
          : user
      )
    );
  };

  const makeOwner = (id: number) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, role: "owner" } : user))
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
        makeOwner,
        properties,
        setProperties,
        deleteProperty,
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
