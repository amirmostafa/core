import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {NotFoundComponent} from './miscellaneous/not-found/not-found.component';
import {AddUserComponent} from './custom-pages/owner/add-user/add-user.component';
import {ConfirmStoreComponent} from "./custom-pages/owner/confirm-store/confirm-store.component";
import {AuthGaurdOwnerService} from "./auth-gaurd-owner.service";
import {ViewProfileComponent} from "./custom-pages/view-profile/view-profile.component";
import {StoreRequestsComponent} from "./custom-pages/merchant/store-requests/store-requests.component";
import {AuthGaurdStoreService} from "./auth-gaurd-store.service";
import {AddRequestComponent} from "./custom-pages/merchant/add-request/add-request.component";
import {OwnerRequestsComponent} from "./custom-pages/owner/requests/owner-requests.component";
import {AuthGaurdDelegateService} from "./auth-gaurd-delegate.service";
import {DelegateRequestsComponent} from "./custom-pages/delegate/requests/delegate-requests.component";
import {RedirectorComponent} from "./custom-pages/redirector/redirector.component";
import {StoresComponent} from "./custom-pages/owner/storess/stores.component";
import {UsersComponent} from "./custom-pages/owner/userss/users.component";
import {ReportsComponent} from "./custom-pages/owner/reports/reports.component";
import {ChangePasswordComponent} from "./custom-pages/change-password/change-password.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'add-user',
      component: AddUserComponent,
      canActivate: [AuthGaurdOwnerService]
    },
    {
      path: 'reports',
      component: ReportsComponent,
      canActivate: [AuthGaurdOwnerService]
    },
    {
      path: 'confirm-stores',
      component: ConfirmStoreComponent,
      canActivate: [AuthGaurdOwnerService]
    },
    {
      path: 'view-profile',
      component: ViewProfileComponent
    },
    {
      path: 'change-password',
      component: ChangePasswordComponent
    },
    {
      path: 'view-profile/:id/:edit',
      component: ViewProfileComponent
    },
    {
      path: 'store-requests',
      component: StoreRequestsComponent,
      canActivate: [AuthGaurdStoreService]
    },
    {
      path: 'requests',
      component: OwnerRequestsComponent,
      canActivate: [AuthGaurdOwnerService]
    },
    {
      path: 'requests/:type/:id',
      component: OwnerRequestsComponent,
      canActivate: [AuthGaurdOwnerService]
    },
    {
      path: 'add-request',
      component: AddRequestComponent,
      canActivate: [AuthGaurdStoreService]
    },
    {
      path: 'add-request/:id/:disable',
      component: AddRequestComponent
    },
    {
      path: 'delegate-requests',
      component: DelegateRequestsComponent,
      canActivate: [AuthGaurdDelegateService]
    },
    {
      path: 'stores',
      component: StoresComponent,
      canActivate: [AuthGaurdOwnerService]
    },
    {
      path: 'users',
      component: UsersComponent,
      canActivate: [AuthGaurdOwnerService]
    },
    {
      path: '',
      component: RedirectorComponent
    }, {
      path: '**',
      component: NotFoundComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
