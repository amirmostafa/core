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
import {ToastrService} from 'ngx-toastr';


@Injectable()
export class HTTPInterceptorImp implements HttpInterceptor, OnInit {


  private currentRoute;
  baseURL = 'http://localhost:8090/Core/';

  constructor(private activeRoute: ActivatedRoute,
              private toaster: ToastrService) {
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
        this.toaster.error(err.error.message ? err.error.message : 'error');
      });
    } catch (e) {
      console.error(e);
    }
  }
}
