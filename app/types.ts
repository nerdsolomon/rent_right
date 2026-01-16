export interface User {
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: number;
  password: string;
  role: string;
  NIN?: number;
  imageUrl?: string;
}

export const adminUser: User = {
  id: Math.random(),
  firstName: "Admin",
  lastName: "RentRight",
  company: "RentRight",
  email: "admin@rentright.com",
  phone: 9876543210,
  password: "admin123",
  role: "admin",
  imageUrl: ""
};

export const emptyUser: User = {
  id: NaN,
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: NaN,
  password: "",
  role: "",
  NIN: NaN
};

export interface Property {
  id: number;
  title: string;
  price: number;
  description: string;
  country: string;
  state: string;
  city: string;
  imageUrl?: string;
  type: string
  owner: User
  isAvailable?: boolean
}

export const emptyProperty: Property = { 
  id: NaN, 
  title: "",
  price: NaN,
  country: "", 
  state: "",
  city: "",
  description: "", 
  imageUrl: "",
  type: "",
  owner: emptyUser,
  isAvailable: true
};

export interface Review {
  id: number
  text: string
  user: User
  propertyId: number
}

export const emptyReview: Review = {
  id: NaN,
  text: "",
  user: emptyUser,
  propertyId: NaN
}

export interface Feedback {
  id: number
  text: string
  user: User
  imageUrl?: string
  isViewed: boolean
}

export const emptyFeedback: Feedback = {
  id: NaN,
  text: "",
  user: emptyUser,
  imageUrl: "",
  isViewed: false
}