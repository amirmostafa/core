import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../../utils/models/user.model";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../utils/services/user.service";

@Component({
  selector: 'ngx-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  user: UserModel;
  disabled = false;
  constructor(private activateRoute: ActivatedRoute,
              private http: HttpClient,
              private userService: UserService) { }

  ngOnInit() {
    const id = this.activateRoute.snapshot.params['id'];
    if(id){
      this.http.get('user/getUser/' + id).subscribe((data: UserModel)=>{
        this.user = data;
        this.disabled = true;
      })
    } else {
        this.user = this.userService.getCurrentUser();
    }
  }
}