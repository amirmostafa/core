// author : amostafa
import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from "../utils/services/user.service";
import {NbToastStatus} from "@nebular/theme/components/toastr/model";
import {ToasterService} from "../utils/services/toaster.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdStoreService implements CanActivate{
  constructor(private router: Router,
              private userService: UserService,
              private toaster: ToasterService) {
  }

  canActivate(): boolean {
    const user = this.userService.getCurrentUser();
    if (user == null || user.type !== 'STORE') {
      this.toaster.showToast(NbToastStatus.DANGER, 'UNAUTHORIZED', 'ERROR');
      return false;
    }
    return true;
  }

}

