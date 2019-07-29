import {Component, OnInit} from '@angular/core';
import {RequestModel} from "../../../../utils/models/request.model";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {ToasterService} from "../../../../utils/services/toaster.service";
import {NbToastStatus} from "@nebular/theme/components/toastr/model";
import {UserService} from "../../../../utils/services/user.service";
@Component({
  selector: 'ngx-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss']
})
export class AddRequestComponent implements OnInit {
  request = new RequestModel();
  disabled = false;
  edit = false;
  constructor(private http: HttpClient,
              private router: Router,
              private toaster: ToasterService,
              private activateRoute: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit() {
    const id = this.activateRoute.snapshot.params['id'];
    if (id) {
      this.http.get('request/getRequest/' + id).subscribe((data: RequestModel) => {
        this.request = data;
        this.disabled = this.activateRoute.snapshot.params['disable'] === "true";
        this.edit = !this.disabled;
      })
    } else {
      this.request.status = 'NEW';
    }
  }

  addRequest() {
    const request = JSON.parse(JSON.stringify(this.request));
    request.userModel = this.userService.getCurrentUser();
    request.date = this.getFormattedDate(new Date(this.request.date));
    this.http.post(this.edit? 'request/edit' : 'request/create', request).subscribe(() => {
      this.toaster.showToast(NbToastStatus.SUCCESS, 'DATA_SAVED_SUCCESSFULLY');
      this.router.navigate(['/pages/store-requests']);
    });
  }

  cancel() {
    history.back();
  }

  getFormattedDate(date) {
    let year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return day + '/' + month + '/' + year;
  }
}
