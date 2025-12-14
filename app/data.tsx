import { createContext, useContext, useState } from "react";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role?: string;
  NIN?: string;
  imageUrl?: string;
}

export const user = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  role: "",
  NIN: "",
  imageUrl: "",
};

interface DataState {
  users: User[];
  setUsers: (users: User[]) => void;
  currentUser: User;
  setCurrentUser: (currentUser: User) => void;
}

const DataContext = createContext<DataState | null>(null);

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>(user);

  const state = { users, setUsers, currentUser, setCurrentUser };

  return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
};

const useData = () => {
  const state = useContext(DataContext);
  if (!state) throw new Error("useData must be used within a DataProvider");
  return state;
};

export { DataProvider, useData };
