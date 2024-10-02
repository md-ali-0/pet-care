import { user_role, user_status } from "@/constant/user.constant";

export type TUser = {
  _id?: string;
  name: string;
  role: keyof typeof user_role;
  email: string;
  password: string;
  status: keyof typeof user_status;
  passwordChangedAt?: Date;
  phone?: string;
  address?: string;
  avatar?: string;
  cover?: string;
  followers: string[];
  following: string[];
  posts: string[];
  bio?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
