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
  NbInputModule
} from '@nebular/theme';
import { TranslateModule, MissingTranslationHandler, TranslateLoader } from '@ngx-translate/core';


import { LoginComponent } from '../login/login.component'; // <---
import { RegisterComponent } from '../merchant/register/register.component';


import { AppModule } from '../../../app.module';
import { CustomMissingTranslationHandler } from '../../../utils/services/custom-missing-translation-handler.service';
import { CustomTranslateLoaderService } from '../../../utils/services/custom-translate-loader.service';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    AuthRoutingModule,
    NbAuthModule,
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
  exports: [LoginComponent,RegisterComponent],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class NgxAuthModule {
}