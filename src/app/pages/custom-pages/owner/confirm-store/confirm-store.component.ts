import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../utils/services/user.service";
import {UserModel} from "../../../../utils/models/user.model";


@Component({
  selector: 'ngx-confirm-store',
  templateUrl: './confirm-store.component.html',
  styleUrls: ['./confirm-store.component.scss']
})
export class ConfirmStoreComponent implements OnInit {

  private user = new UserModel();

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}
