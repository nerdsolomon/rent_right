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
  owner: number
  rating?: number
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
  owner: NaN,
  rating: NaN
};

export interface Review {
  id: number
  text: string
  user: string
  propertyId: number
}

export const emptyReview: Review = {
  id: NaN,
  text: "",
  user: "",
  propertyId: NaN
}

export interface Feedback {
  id: number
  text: string
  userId: number
  imageUrl?: string
  isViewed: boolean
}

export const emptyFeedback: Feedback = {
  id: NaN,
  text: "",
  userId: NaN,
  imageUrl: "",
  isViewed: false
}