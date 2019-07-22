// author : amostafa
import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {ToasterService} from "./toaster.service";
import {NbToastStatus} from "@nebular/theme/components/toastr/model";

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate{
  constructor(private router: Router,
              private toaster: ToasterService) {
  }

  canActivate(): boolean {
    if (!sessionStorage || !sessionStorage.getItem('user')) {
      this.toaster.showToast(NbToastStatus.DANGER, 'UNAUTHORIZED', 'ERROR');
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }

}

