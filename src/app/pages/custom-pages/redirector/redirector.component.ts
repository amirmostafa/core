import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../utils/services/user.service";
import {STORE_ITEMS} from "../../store-menu";
import {DELEGATE_ITEMS} from "../../delegate-menu";
import {MENU_ITEMS} from "../../pages-menu";

@Component({
  selector: 'ngx-redirector',
  templateUrl: './redirector.component.html',
  styleUrls: ['./redirector.component.scss']
})
export class RedirectorComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    const menu =  this.userService.getCurrentUser().type === 'STORE' ? STORE_ITEMS :
      this.userService.getCurrentUser().type === 'DELEGATE' ? DELEGATE_ITEMS : MENU_ITEMS;
    this.router.navigate([menu[0].link]);
  }

}
