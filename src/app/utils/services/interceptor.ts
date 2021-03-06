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
import {ToasterService} from "./toaster.service";


@Injectable()
export class HTTPInterceptorImp implements HttpInterceptor, OnInit {


  private currentRoute;
  baseURL = 'http://AMIR-ASHOUR:8090/Core/';
  // baseURL = 'http://ec2-54-162-230-117.compute-1.amazonaws.com:8090/Core/';

  config: ToasterConfig;

  index = 1;
  duration = 2000;
  position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  status: NbToastStatus = NbToastStatus.SUCCESS;

  constructor(private activeRoute: ActivatedRoute,
              private toaster: ToasterService) {
  }

  ngOnInit() {
    this.currentRoute = this.activeRoute.snapshot['_routerState'].url;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    try {
      if (request.params.get('ignoreEditingURL') === 'true') {
        request.params.delete('ignoreEditingURL');
      } else {
        const httpNewRequest = new HttpRequest(<any>request.method, this.baseURL + request.url, request.body);
        request = Object.assign(request, httpNewRequest);
      }
      return next.handle(request).do(() => {
      }, (err: any) => {
        this.toaster.showToast(NbToastStatus.DANGER,  err.error.replyMessage|| 'error', 'ERROR');
      });
    } catch (e) {
      console.error(e);
    }
  }
}
