// author : amostafa
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './user.service';


@Injectable({
  providedIn: 'root'
})
export class RoutingDataResolverService implements Resolve<any> {

  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const user = sessionStorage.getItem('user');
    // if (user !== null) {
    //   this.userService.setCurrentUser(JSON.parse(user));
    // } else {
    //   this.userService.setCurrentUser(undefined);
    // }
    // return;
  }
}

