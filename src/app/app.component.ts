/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { TranslateService } from '@ngx-translate/core';
import {UserService} from "./utils/services/user.service";
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService,
              private translate: TranslateService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
    return false;
    };

    this.router.events.subscribe((evt) => {
        if (evt instanceof NavigationEnd ) {
            this.router.navigated = false;
            window.scrollTo(0, 0);
        }
    });
    this.analytics.trackPageViews();
    const user = sessionStorage.getItem('user');
    if (user !== null) {
      this.userService.setCurrentUser(JSON.parse(user));
      this.userService.switchLanguageWithoutSave(this.userService.getCurrentUser().language);
    } else {
      this.userService.switchLanguageWithoutSave('en');
    }

  }
}
