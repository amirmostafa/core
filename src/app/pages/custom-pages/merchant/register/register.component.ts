import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../../utils/models/user.model";
import {UserService} from "../../../../utils/services/user.service";
import {StoreModel} from "../../../../utils/models/store.model";

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private user = new UserModel();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user.storeModel = new StoreModel();
  }

  register(){
    this.userService.register(this.user, true);
  }

}
