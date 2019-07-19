import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { AddUserComponent } from './custom-pages/owner/add-user/add-user.component';
import { TranslateModule, MissingTranslationHandler, TranslateLoader } from '@ngx-translate/core';
import { CustomMissingTranslationHandler } from '../utils/services/custom-missing-translation-handler.service';
import { CustomTranslateLoaderService } from '../utils/services/custom-translate-loader.service';


const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    TranslateModule.forRoot({
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: CustomMissingTranslationHandler
      },
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoaderService
      }
    }),
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    AddUserComponent  ],
})
export class PagesModule {
}
