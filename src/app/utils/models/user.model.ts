import {StoreModel} from "./store.model";

export class UserModel {
  id: number;
  name: string;
  username: string;
  type: string;
  email: string;
  mobile: string;
  governorate: string;
  city: string;
  area: string;
  address: string;
  language: string;
  avatar;
  storeModel = new StoreModel();
}
