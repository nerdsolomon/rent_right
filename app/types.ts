export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  verifyOwner?: VerifyOwner
  imageUrl?: string;
}

export interface VerifyOwner {
  NIN: number;
  firstName: string;
  lastName: string;
  DoB: string;
  address: string
  status: string
  verifiedAt: string
}

export interface Property {
  id?: number;
  title: string;
  price: number;
  description: string;
  country: string;
  state: string;
  city: string;
  imageUrls: string[];
  type: string
  listingType: string
  duration?: string
  isAvailable?: boolean
  userId: number
}

export interface Review {
  id?: number
  text: string
  userId: number
  propertyId: number
}

export interface Feedback {
  id?: number
  text: string
  imageUrl?: string
  isViewed: boolean
  userId: number
}

export interface Booking {
  id?: number
  day: string
  time: string
  status: string
  propertyId: number
  userId: number
};

export interface Notification {
  id?: number
  userId: number
  datetime: string
  message: string
  isRead: boolean
}

export const emptyVerifyOwner: VerifyOwner = {
  NIN: NaN,
  firstName: "",
  lastName: "",
  DoB: "",
  address: "",
  status: "",
  verifiedAt: ""
}

export const emptyUser: User = {
  id: NaN,
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  password: "",
  role: "",
  verifyOwner: undefined
};

export const emptyProperty: Property = { 
  id: NaN, 
  title: "",
  price: NaN,
  country: "", 
  state: "",
  city: "",
  description: "", 
  imageUrls: [],
  type: "",
  listingType: "",
  duration: "",
  userId: NaN,
  isAvailable: true
};

export const emptyReview: Review = {
  id: NaN,
  text: "",
  userId: NaN,
  propertyId: NaN
}

export const emptyFeedback: Feedback = {
  id: NaN,
  text: "",
  userId: NaN,
  imageUrl: "",
  isViewed: false
}

export const emptyBooking: Booking = {
  id: NaN,
  day: "",
  time: "",
  propertyId: NaN,
  userId: NaN,
  status: ""
};

export const emptyNotification: Notification = {
  id: NaN,
  userId: NaN,
  datetime: "",
  message: "",
  isRead: false
}