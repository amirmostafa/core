import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../utils/services/user.service";
import {UserModel} from "../../../../utils/models/user.model";


@Component({
  selector: 'ngx-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  private user = new UserModel();

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  register(){
    this.user.active = true;
    this.userService.register(this.user, true);
  }


  // getConfigValue(key: string): any{};

}
