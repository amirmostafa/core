// author : amostafa
import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate{
  constructor(private router: Router) {
  }

  canActivate(): boolean {
    if (!sessionStorage || !sessionStorage.getItem('user')) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }

}

