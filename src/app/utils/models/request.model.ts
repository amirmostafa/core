import {UserModel} from "./user.model";

export class RequestModel {
  id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  deliveryAddress: string;
  totalAmount: number;
  status: string;
  statusLocalized: string;
  userModel: UserModel
}
