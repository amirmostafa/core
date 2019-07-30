import { CommonModule } from '@angular/common';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth-routing.module';
import { NbAuthModule } from '@nebular/auth';

import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbActionsModule
} from '@nebular/theme';
import { LoginComponent } from '../login/login.component'; // <---
import { RegisterComponent } from '../merchant/register/register.component';
import {SharedModule} from "../../../shared.module";
import { ThemeModule } from '../../../@theme/theme.module';
import { CustomAuthComponent } from './custom-auth/custom-auth.component';
import { UiFeaturesModule } from '../../ui-features/ui-features.module';




@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    AuthRoutingModule,
    NbAuthModule,
    ThemeModule,
    UiFeaturesModule,
    NbActionsModule,
    
  ],
  exports: [LoginComponent,RegisterComponent],
  declarations: [
    LoginComponent,
    RegisterComponent,
    CustomAuthComponent
  ]
})
export class NgxAuthModule {
}
