import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector } from '@angular/core';
import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTPInterceptorImp } from './utils/services/interceptor';
import { NgxAuthModule } from './pages/custom-pages/auth/auth.module';
import { TranslateModule, MissingTranslationHandler, TranslateLoader } from '@ngx-translate/core';
import { CustomMissingTranslationHandler } from './utils/services/custom-missing-translation-handler.service';
import { CustomTranslateLoaderService } from './utils/services/custom-translate-loader.service';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NgxAuthModule,
    
    ToastrModule.forRoot(),
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
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPInterceptorImp,
      multi: true
    }
  ],
})
export class AppModule {
}
