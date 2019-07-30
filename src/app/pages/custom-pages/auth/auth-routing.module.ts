import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// import { NbAuthComponent } from '@nebular/auth';  // <---
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../merchant/register/register.component';
import { CustomAuthComponent } from './custom-auth/custom-auth.component';

export const routes: Routes = [
  {
    path: '',
    component: CustomAuthComponent,  // <---
    children: [
      {
        path: 'login',
        component: LoginComponent, // <---
      },
      {
        path: 'register',
        component: RegisterComponent, // <---
      },]
  },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthRoutingModule { }
