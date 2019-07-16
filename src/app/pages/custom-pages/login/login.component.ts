import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NbLoginComponent, NbAuthService } from '@nebular/auth';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppModule } from '../../../app.module';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent {

  // private http = AppModule.injector.get(HttpClient);
  // constructor(public service: NbAuthService,public options: {},public cd: ChangeDetectorRef,public router: Router){
  //   super(service,options,cd,router);
  // this.showMessages = super.


  // }
  // login1(){
  //   this.http.post("login", {username: 'admin', password:'P@ssw0rd'}).subscribe();
  // }
  // constructor(private translate: TranslateService) {
  //   super();
  // }
  // ngOnInit(): void {
  //   this.translate.setDefaultLang('en');

  // }
}
