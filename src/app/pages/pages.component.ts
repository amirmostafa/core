import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { UserService } from "../utils/services/user.service";
import { STORE_ITEMS } from "./store-menu";
import { DELEGATE_ITEMS } from "./delegate-menu";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu;

  constructor(private userService: UserService, private translate: TranslateService) {
    // MENU_ITEMS.forEach((item) => {
    //   if (item.title) {
    //     item.title = this.translate.instant(item.title);
    //   }
    // });

  }

  ngOnInit() {
    this.userService.switchLanguageWithoutSave(this.userService.getCurrentUser().language);

    const menu = this.userService.getCurrentUser().type === 'STORE' ? STORE_ITEMS :
      this.userService.getCurrentUser().type === 'DELEGATE' ? DELEGATE_ITEMS : MENU_ITEMS;

    menu.forEach((item) => {
      if (item.title) {
        item.title = this.translate.instant(item.title);
      }
    });

    this.menu = menu;

  }
}
