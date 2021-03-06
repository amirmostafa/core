import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "../../../utils/services/user.service";

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: this.translate.instant('PROFILE'), link: '/pages/view-profile' },
    { title: this.translate.instant('CHANGE_PASSWORD'), link: '/pages/change-password' },
    { title: this.translate.instant('LOG_OUT'), link: '/auth/login' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    // console.log(this.translate.instant('ADD_USER'));

  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
  switchLanguage() {
    // this.user.language = this.user.language === 'en' ? 'ar' : 'en';
    this.userService.switchLanguage();
  }
}
