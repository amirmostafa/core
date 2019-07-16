import {AddressModel} from './address.model';
import {ContactInfoModel} from './contact-info.model';

export class FacilityModel {
  id: number;
  primaryName: string;
  secondaryName: string;
  addressModel = new AddressModel();
  contactInfoModel = new ContactInfoModel();
}
