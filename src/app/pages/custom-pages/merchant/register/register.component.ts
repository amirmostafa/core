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
  fileUpload;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user.language = 'en';
  }

  selectFile(event) {
    const file = event.target.files.item(0);
    if (file.type.match('image.*')) {
      this.fileUpload = file;
    } else {
      alert('invalid format!');
    }
  }

  switchLanguage() {
    this.user.language = this.user.language === 'en' ? 'ar' : 'en';
    this.userService.switchLanguageWithoutSave(this.user.language);
  }

  register(){
    this.user.type = 'STORE';
    this.userService.register(this.user, this.fileUpload, true);
  }

}
