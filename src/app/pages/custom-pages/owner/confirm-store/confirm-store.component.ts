import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../utils/services/user.service";
import {UserModel} from "../../../../utils/models/user.model";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {ToasterService} from "../../../../utils/services/toaster.service";
import {NbToastStatus} from "@nebular/theme/components/toastr/model";


@Component({
  selector: 'ngx-confirm-store',
  templateUrl: './confirm-store.component.html',
  styleUrls: ['./confirm-store.component.scss']
})
export class ConfirmStoreComponent implements OnInit {

  settings = {
    hideSubHeader: true,
    actions: {
      columnTitle: this.translate.instant('ACTIONS'),
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'view',
          title: '<i class="ion-eye" title="' + this.translate.instant('VIEW') + '"></i>'
        },
        {
          name: 'approve',
          title: '<i class="ion-checkmark" title="' + this.translate.instant('APPROVE') + '"></i>'
        },
        {
          name: 'reject',
          title: '<i class="ion-close" title="' + this.translate.instant('REJECT') + '"></i>'
        }
      ],
      position: 'right',
    },
    columns: {
      id: {
        title: this.translate.instant('ID'),
        type: 'number',
      },
      name: {
        title: this.translate.instant('NAME'),
        type: 'string',
      },
      username: {
        title: this.translate.instant('USERNAME'),
        type: 'string',
      },
      email: {
        title: this.translate.instant('EMAIL'),
        type: 'string',
      },
      mobile: {
        title: this.translate.instant('MOBILE'),
        type: 'string',
      },
      commercialRegister: {
        title: this.translate.instant('COMMERCIAL_REGISTER'),
        type: 'string',
      },
    },
  };

  stores;

  constructor(private userService: UserService,
              private http: HttpClient,
              private translate: TranslateService,
              private router: Router,
              private toaster: ToasterService) {
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.http.get('user/listInActiveUsers').subscribe((data: UserModel[]) => {
      this.stores = data['userModels'];
    })
  }

  customAction(event) {
    switch (event.action) {
      case 'view':
        this.view(event.data);
        return;
      case 'approve':
        this.approve(event.data);
        return;
      case 'reject':
        this.reject(event.data);
        return;
    }
  }

  view(data) {
    this.router.navigate(['/pages/view-profile/' + data.id]);
  }

  approve(data) {
    this.http.get('user/activateBlockUser/' + data.id + '/' + true).subscribe(() => {
      this.toaster.showToast(NbToastStatus.SUCCESS, this.translate.instant('USER_APPROVED_SUCCESSFULLY'));
      this.init();
    });
  }

  reject(data) {
    this.http.get('user/activateBlockUser/' + data.id + '/' + false).subscribe(() => {
      this.toaster.showToast(NbToastStatus.SUCCESS, this.translate.instant('USER_REJECTED_SUCCESSFULLY'));
      this.init();
    });
  }
}
