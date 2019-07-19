import {Injectable} from '@angular/core';
import {UserModel} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {EventService} from './event.service';
import {NbToastStatus} from "@nebular/theme/components/toastr/model";
import {ToasterService} from "./toaster.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser = new UserModel();

  constructor(private http: HttpClient,
              private router: Router,
              private translate: TranslateService,
              private eventService: EventService<any>,
              private toaster: ToasterService) {
  }

  getCurrentUser() {
    if (this.currentUser && this.currentUser.id) {
      return this.currentUser;
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  setCurrentUser(user: UserModel) {
    if (!this.currentUser) {
      this.currentUser = new UserModel();
    }
    Object.assign(this.currentUser, user);
  }

  switchLanguage() {
    this.currentUser.language = this.currentUser.language === 'ar' ? 'en' : 'ar';
    sessionStorage.setItem('user', JSON.stringify(this.currentUser));
    this.translate.setDefaultLang(this.currentUser.language);

    if (this.currentUser.language === 'ar') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
    this.eventService.broadcastEvent('language', this.currentUser.language);
    this.http.post('user/update', this.currentUser).subscribe();
  }

  switchLanguageWithoutSave(lang) {
    this.translate.setDefaultLang(lang);
    if (lang === 'ar') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }

  register(user: UserModel, redirectToLogin?: boolean) {
    if(user.password !== user.confirmPassword){
      this.toaster.showToast(NbToastStatus.DANGER, 'PASSWORDS_DONT_MATCHES');
    }
    this.http.post('/user/register', user).subscribe(() => {
      this.toaster.showToast(NbToastStatus.SUCCESS, 'DATA_SAVED_SUCCESSFULLY');
      if(redirectToLogin){
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
