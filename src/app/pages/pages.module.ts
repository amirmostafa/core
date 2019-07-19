import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import {ToasterModule} from "angular2-toaster";
import {SharedModule} from "../shared.module";

const PAGES_COMPONENTS = [
  PagesComponent,
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
  ],
  declarations: [
    ...PAGES_COMPONENTS
  ],
})
export class PagesModule {
}
