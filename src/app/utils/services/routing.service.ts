import {Injectable} from '@angular/core';
import {UserModel} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  routingParameters;

  constructor() {
    this.routingParameters = {};
  }

  addParameter(field: string, value) {
    this.routingParameters[field] = value;
  }

  getParameter(field: string) {
    try {
      return this.routingParameters[field];
    } catch  (e) {
      console.error(e);
    }
  }
}
