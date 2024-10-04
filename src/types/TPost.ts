import { TUser } from "./TUser";

export interface TPost {
  _id: string;
  author: TUser;
  title: string;
  content: string;
  category: "Tip" | "Story";
  imageUrls?: string[];
  isPremium: boolean;
  comments: any;
  voteCount: {
    upvotes: number;
    downvotes: number;
  };
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
}
