import {StoreModel} from "./store.model";

export class UserModel {
  id: number;
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  type: string;
  email: string;
  mobile: string;
  governorate: string;
  city: string;
  area: string;
  address: string;
  language: string;
  avatar;
  commercialRegister: string;
  active: boolean;
}
