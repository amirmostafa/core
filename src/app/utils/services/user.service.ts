import {Injectable} from '@angular/core';
import {UserModel} from '../models/user.model';
import {HttpClient, HttpEvent, HttpRequest, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {EventService} from './event.service';
import {NbToastStatus} from "@nebular/theme/components/toastr/model";
import {ToasterService} from "./toaster.service";
import { NbLayoutDirectionService, NbLayoutDirection } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser = new UserModel();

  constructor(private http: HttpClient,
              private router: Router,
              private translate: TranslateService,
              private eventService: EventService<any>,
              private toaster: ToasterService,
              private directionService: NbLayoutDirectionService) {
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
      // document.body.classList.add('rtl');
      this.directionService.setDirection(NbLayoutDirection.RTL);
    } else {
      // document.body.classList.remove('rtl');
      this.directionService.setDirection(NbLayoutDirection.LTR);
    }
    this.eventService.broadcastEvent('language', this.currentUser.language);
    this.http.get('user/changeLanguage/'+ this.currentUser.id+'/'+this.currentUser.language).subscribe();
    window.location.reload();
  }

  switchLanguageWithoutSave(lang) {
    this.translate.setDefaultLang(lang);
    if (lang === 'ar') {
      // document.body.classList.add('rtl');
      this.directionService.setDirection(NbLayoutDirection.RTL);
    } else {
      // document.body.classList.remove('rtl');
      this.directionService.setDirection(NbLayoutDirection.LTR);
    }
  }

  pushFileToStorage(file: File) {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', 'storage/uploadImage', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  register(user: UserModel, fileUpload: File, redirectToLogin?: boolean) {
    if (user.password !== user.confirmPassword) {
      this.toaster.showToast(NbToastStatus.DANGER, 'PASSWORDS_DONT_MATCHES');
      return;
    }
    if (!fileUpload) {
      this.doRegister(redirectToLogin, user)
    } else {
      this.pushFileToStorage(fileUpload).subscribe((event) => {
        if (event instanceof HttpResponse) {
          user.avatar = event.body['payload'];
          this.doRegister(redirectToLogin, user);
        }
      });
    }
  }

  doRegister(redirectToLogin, user) {
    this.http.post('user/register', user).subscribe(() => {
      this.toaster.showToast(NbToastStatus.SUCCESS, 'DATA_SAVED_SUCCESSFULLY');
      if (redirectToLogin) {
        this.router.navigate(['/auth/login']);
      }
    });
  }
}
