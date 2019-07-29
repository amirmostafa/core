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
import { ViewProfileComponent } from './custom-pages/view-profile/view-profile.component';
import { StoreRequestsComponent } from './custom-pages/merchant/store-requests/store-requests.component';
import { AddRequestComponent } from './custom-pages/merchant/add-request/add-request.component';
import {ButtonsModule} from "./forms/buttons/buttons.module";
import {OwnerRequestsComponent} from "./custom-pages/owner/requests/owner-requests.component";
import {BootstrapModule} from "./bootstrap/bootstrap.module";
import { AssignRequestComponent } from './custom-pages/owner/assign-request/assign-request.component';
import {DelegateRequestsComponent} from "./custom-pages/delegate/requests/delegate-requests.component";
import { RedirectorComponent } from './custom-pages/redirector/redirector.component';
import {StoresComponent} from "./custom-pages/owner/storess/stores.component";
import {UsersComponent} from "./custom-pages/owner/userss/users.component";

const PAGES_COMPONENTS = [
  PagesComponent,
  AddUserComponent,
  ConfirmStoreComponent,
  ViewProfileComponent
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
    UiFeaturesModule,
    ButtonsModule,
    BootstrapModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    ViewProfileComponent,
    StoreRequestsComponent,
    AddRequestComponent,
    OwnerRequestsComponent,
    AssignRequestComponent,
    DelegateRequestsComponent,
    RedirectorComponent,
    StoresComponent,
    UsersComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPInterceptorImp,
      multi: true
    }
  ],
  entryComponents: [
    AssignRequestComponent,
  ]
})
export class PagesModule {
}
