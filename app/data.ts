import profilePic from "./assets/nerd.png"

export const profile = {
  firstName: "Jason",
  lastName: "Bourne",
  gender: "Male",
  relationshipStatus: "Single and looking",
  city: "Apapa",
  state: "Lagos",
  country: "Nigeria",
  bio: "nerd",
  imageUrl : profilePic
};

export const users = [
  {
    following: false,
    firstName: "Jessica",
    lastName: "Dream",
    bio: "Relationship Coach",
    city: "Queens",
    state: "New York",
    country: "USA",
  },
  {
    following: false,
    firstName: "Michael",
    lastName: " Cole",
    bio: "Mental Therapy",
    city: "Ibadan",
    state: "Ogun",
    country: "Nigeria",
  },
  {
    following: false,
    firstName: "Joyce",
    lastName: " Kim",
    bio: "Dating Influencer",
    city: "Ikeja",
    state: "Lagos",
    country: "Nigeria",
  },
  {
    following: false,
    firstName: "Mark",
    lastName: " Zuck",
    bio: "Marriage Coach",
    city: "Lekki",
    state: "Lagos",
    country: "Nigeria",
  },
  {
    following: false,
    firstName: "Beyonce",
    lastName: " Zeal",
    bio: "Marriage Counselor",
    city: "Owerri",
    state: "Imo",
    country: "Nigeria",
  },
  {
    following: false,
    firstName: "Harry",
    lastName: " Gringo",
    bio: "Personality Psycology",
    city: "Kumasi",
    state: "Accra",
    country: "Ghana",
  },
];

export interface Friend {
  firstName: string;
  lastName: string;
  email?: string;
  dateOfBirth?: string;
  gender?: string;
  relationshipStatus?: string;
  city?: string;
  state?: string;
  country?: string;
  bio?: string;
  following: boolean
}

export interface User {
  firstName: string;
  lastName: string;
  email?: string;
  dateOfBirth?: string;
  gender?: string;
  relationshipStatus: string;
  city?: string;
  state?: string;
  country?: string;
  bio?: string;
  imageUrl?: string
}
