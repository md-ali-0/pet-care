export interface IPost {
  _id: string;
  authorId: string;
  title: string;
  content: string;
  category: "Tip" | "Story";
  imageUrls?: string[];
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
  voteCount: {
    upvotes: number;
    downvotes: number;
  };
}
