import { TUser } from "./TUser";

export interface IPayment {
  _id: string;
  user: TUser;
  transectionId: string;
  currency: string;
  payment_method: string
  createdAt: Date;
  updatedAt: Date;
}
