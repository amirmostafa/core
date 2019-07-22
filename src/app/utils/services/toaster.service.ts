/**
 * @author amostafa
 */
import {Injectable, OnInit} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import {Observable} from 'rxjs';
import 'rxjs/add/operator/do';
import {ActivatedRoute} from '@angular/router';
import {NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService} from "@nebular/theme";
import {NbToastStatus} from "@nebular/theme/components/toastr/model";
import {ToasterConfig} from "angular2-toaster";
import {TranslateService} from "@ngx-translate/core";


@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  config: ToasterConfig;
  index = 1;
  destroyByClick = true;
  duration = 2000;
  hasIcon = true;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = false;
  status: NbToastStatus = NbToastStatus.SUCCESS;

  constructor(private toaster: NbToastrService,
              private translate: TranslateService) {
  }

  showToast(type: NbToastStatus, body: string, title?: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };

    this.index += 1;
    this.toaster.show(
      body ? this.translate.instant(body): '',
      title ? this.translate.instant(title): type === NbToastStatus.SUCCESS? this.translate.instant('SUCCESS'): '',
      config);
  }
}
