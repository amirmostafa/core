import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../utils/services/user.service";
import {ToasterService} from '../../../utils/services/toaster.service';
import {NbToastStatus} from '@nebular/theme/components/toastr/model';
import {ChangePasswordModel} from "../../../utils/models/changePassword.model";

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordModel = new ChangePasswordModel();
  confirmPassword;

  constructor(private activateRoute: ActivatedRoute,
              private http: HttpClient,
              private userService: UserService,
              private toaster: ToasterService,
              private router: Router) {
  }

  ngOnInit() {
    this.changePasswordModel.id = this.userService.getCurrentUser().id;
  }

  changePassword() {
    if (this.confirmPassword !== this.changePasswordModel.newPassword) {
      this.toaster.showToast(NbToastStatus.DANGER, 'PASSWORDS_DONT_MATCHES');
      return;
    }
    this.http.post('user/changePassword', this.changePasswordModel).subscribe(() => {
      this.toaster.showToast(NbToastStatus.SUCCESS, 'DATA_SAVED_SUCCESSFULLY');
      this.router.navigate(['/']);
    });
  }
}
