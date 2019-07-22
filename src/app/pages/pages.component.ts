import {Component, OnInit} from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import {UserService} from "../utils/services/user.service";
import {STORE_ITEMS} from "./store-menu";
import {DELEGATE_ITEMS} from "./delegate-menu";

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
export class PagesComponent implements OnInit{

  menu;

  constructor(private userService: UserService){}

  ngOnInit(){
    this.menu =  this.userService.getCurrentUser().type === 'STORE' ? STORE_ITEMS :
      this.userService.getCurrentUser().type === 'DELEGATE' ? DELEGATE_ITEMS : MENU_ITEMS;

  }
}
