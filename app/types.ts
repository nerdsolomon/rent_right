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
};

export interface Property {
  id: number;
  title: string;
  description: string;
  location: string;
  imageUrl?: string;
}

export const emptyProperty: Property = { 
  id: NaN, 
  title: "", 
  location: "", 
  description: "", 
  imageUrl: "", 
};