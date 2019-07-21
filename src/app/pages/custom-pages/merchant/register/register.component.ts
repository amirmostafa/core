import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../../utils/models/user.model";
import {UserService} from "../../../../utils/services/user.service";

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

 user = new UserModel();

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  register(){
    this.user.type = 'STORE';
    this.userService.register(this.user, true);
  }

}
