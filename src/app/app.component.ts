/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { TranslateService } from '@ngx-translate/core';
import {UserService} from "./utils/services/user.service";

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService,
              private translate: TranslateService,
              private userService: UserService) {
  }

  ngOnInit(): void {
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
