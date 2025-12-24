import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CURRENT_USER_KEY, deleteById, getFromStorage, PROPERTIES_KEY, removeFromStorage, saveToStorage, syncCurrentUser, USERS_KEY } from "~/services";
import { emptyUser, type Property, type User } from "~/types";

interface DataState {
  users: User[];
  setUsers: (users: User[]) => void;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: number) => void;
  logout: () => void;
  properties: Property[];
  setProperties: (properties: Property[]) => void;
  deleteProperty: (id: number) => void;
}

const DataContext = createContext<DataState | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>(() =>
    getFromStorage(USERS_KEY, [])
  );

  const [currentUser, setCurrentUser] = useState<User>(() =>
    getFromStorage(CURRENT_USER_KEY, emptyUser)
  );

  const [properties, setProperties] = useState<Property[]>(() =>
    getFromStorage(PROPERTIES_KEY, [])
  );


  useEffect(() => {
    saveToStorage(USERS_KEY, users);
  }, [users]);

  useEffect(() => {
    if (currentUser.id) {
      saveToStorage(CURRENT_USER_KEY, currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    saveToStorage(PROPERTIES_KEY, properties);
  }, [properties]);


  useEffect(() => {
    setCurrentUser(syncCurrentUser(users, currentUser));
  }, [users]);


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

  const deleteProperty = (id: number) => {
    setProperties((prev) => deleteById(prev, id));
  };


  useEffect(() => {
    const handler = (event: StorageEvent) => {
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

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <DataContext.Provider
      value={{
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
