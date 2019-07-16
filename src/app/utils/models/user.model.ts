import {AddressModel} from './address.model';
import {ContactInfoModel} from './contact-info.model';
import {FacilityModel} from './facility.model';

export class UserModel {
  id: number;
  firstName: string;
  secondName: string;
  username: string;
  type: String;
  userType: String;
  addressModel = new AddressModel();
  contactInfoModel = new ContactInfoModel();
  password: string;
  language: string;
  facilityModel = new FacilityModel();
  clientModel = new FacilityModel();
  storeModel = new FacilityModel();
}
