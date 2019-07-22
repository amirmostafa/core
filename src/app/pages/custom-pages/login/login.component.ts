import {Component, ChangeDetectorRef, Inject} from '@angular/core';
import { NbAuthService, NB_AUTH_OPTIONS, NbAuthSocialLink, NbAuthResult} from '@nebular/auth';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {getDeepFromObject} from "ng2-smart-table/lib/helpers";
import {UserService} from "../../../utils/services/user.service";
import {UserModel} from "../../../utils/models/user.model";
import {NbToastStatus} from "@nebular/theme/components/toastr/model";
import {ToasterService} from "../../../utils/services/toaster.service";

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  socialLinks: NbAuthSocialLink[] = [];
  rememberMe = false;

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              protected router: Router,
              private http: HttpClient,
              private userService: UserService,
              private toaster: ToasterService) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
    this.socialLinks = this.getConfigValue('forms.login.socialLinks');
    this.rememberMe = this.getConfigValue('forms.login.rememberMe');
    if (sessionStorage) {
      sessionStorage.removeItem('user');
    }
    this.userService.switchLanguageWithoutSave('en');
    this.userService.currentUser = undefined;
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.http.post('user/login', this.user).subscribe((data: UserModel) => {
      sessionStorage.setItem('user', JSON.stringify(data));
      this.userService.setCurrentUser(data);
      this.userService.switchLanguageWithoutSave(data.language);
      this.toaster.showToast(NbToastStatus.SUCCESS, 'LOGGED_IN_SUCCESSFULLY');
      this.router.navigate(['/']);
    }, (error) => {
      this.submitted = false;
    });

    // this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
    //   this.submitted = false;
    //
    //   if (result.isSuccess()) {
    //     this.messages = result.getMessages();
    //   } else {
    //     this.errors = result.getErrors();
    //   }
    //
    //   const redirect = result.getRedirect();
    //   if (redirect) {
    //     setTimeout(() => {
    //       return this.router.navigateByUrl(redirect);
    //     }, this.redirectDelay);
    //   }
    //   this.cd.detectChanges();
    // });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
