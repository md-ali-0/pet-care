import { TPost } from "./TPost";
import { TUser } from "./TUser";

export interface TComment {
  _id: string;
  author: TUser;
  post: TPost;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}
