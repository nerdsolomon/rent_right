import { emptyUser, type User } from "~/types";

export const USERS_KEY = "users";
export const CURRENT_USER_KEY = "currentUser";
export const PROPERTIES_KEY = "properties";

export const getFromStorage = <T>(key: string, fallback: T): T => {
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

export const saveToStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeFromStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const syncCurrentUser = (users: User[], currentUser: User): User => {
  if (!currentUser.id) return emptyUser;
  return users.find((u) => u.id === currentUser.id) ?? emptyUser;
};

export const deleteById = <T extends { id: number }>(
  items: T[],
  id: number
): T[] => items.filter((item) => item.id !== id);
