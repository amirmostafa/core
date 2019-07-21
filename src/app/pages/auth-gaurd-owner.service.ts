// author : amostafa
import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from "../utils/services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdOwnerService implements CanActivate{
  constructor(private router: Router,
              private userService: UserService) {
  }

  canActivate(): boolean {
    const user = this.userService.getCurrentUser();
    if (user == null || user.type !== 'OWNER') {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }

}

