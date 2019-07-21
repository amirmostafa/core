import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {ToasterModule} from "angular2-toaster";
import {SharedModule} from "../shared.module";
import { AddUserComponent } from './custom-pages/owner/add-user/add-user.component';
import {ConfirmStoreComponent} from "./custom-pages/owner/confirm-store/confirm-store.component";
import {Ng2SmartTableModule} from "ng2-smart-table";
import {HTTPInterceptorImp} from "../utils/services/interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {APP_BASE_HREF} from "@angular/common";
import {UiFeaturesModule} from "./ui-features/ui-features.module";

const PAGES_COMPONENTS = [
  PagesComponent,
  AddUserComponent,
  ConfirmStoreComponent
];

@NgModule({
  imports: [
    SharedModule,
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    ToasterModule.forRoot(),
    Ng2SmartTableModule,
    UiFeaturesModule
  ],
  declarations: [
    ...PAGES_COMPONENTS ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPInterceptorImp,
      multi: true
    }
  ]
})
export class PagesModule {
}
