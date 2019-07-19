import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {AuthGaurdService} from "./utils/services/auth-gaurd.service";


const routes: Routes = [
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule', canActivate: [AuthGaurdService] },
  {
    path: 'auth',
    loadChildren: 'app/pages/custom-pages/auth/auth.module#NgxAuthModule',
  },
  { path: '**', redirectTo: 'pages', canActivate: [AuthGaurdService]  },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
