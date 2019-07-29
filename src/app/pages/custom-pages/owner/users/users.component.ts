import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../utils/services/user.service";
import {UserModel} from "../../../../utils/models/user.model";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {ToasterService} from "../../../../utils/services/toaster.service";
import {NbToastStatus} from "@nebular/theme/components/toastr/model";


@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  settings = {
    rowClassFunction: (row) => {
      if (row.data.active) {
        return 'hide-assign';
      }
      return 'show-assign';
    },
    actions: {
      columnTitle: this.translate.instant('ACTIONS'),
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'edit',
          title: '<i class="ion-edit" title="' + this.translate.instant('EDIT') + '"></i>'
        },
        {
          name: 'view-requests',
          title: '<i class="ion-eye" title="' + this.translate.instant('VIEW_REQUESTS') + '"></i>'
        },
        {
          name: 'approve',
          title: '<i class="ion-checkmark" title="' + this.translate.instant('APPROVE') + '"></i>'
        },
        {
          name: 'reject',
          title: '<i class="ion-close" title="' + this.translate.instant('REJECT') + '"></i>'
        },
        {
          name: 'delete',
          title: '<i class="ion-trash-a" title="' + this.translate.instant('DELETE') + '"></i>'
        }
      ],
      position: 'right',
    },
    columns: {
      id: {
        title: this.translate.instant('ID'),
        type: 'number',
        width: '8%'
      },
      name: {
        title: this.translate.instant('NAME'),
        type: 'string',
        width: '12%'
      },
      username: {
        title: this.translate.instant('USERNAME'),
        type: 'string',
        width: '12%'
      },
      email: {
        title: this.translate.instant('EMAIL'),
        type: 'string',
        width: '14%'
      },
      mobile: {
        title: this.translate.instant('MOBILE'),
        type: 'string',
        width: '12%'
      },
      typeLocalized: {
        title: this.translate.instant('TYPE'),
        type: 'string',
        width: '12%',
        filter: {
          type: 'list',
          config: {
            selectText: this.translate.instant('ALL'),
            list: [
              {value: this.translate.instant('DELEGATE'), title: this.translate.instant('DELEGATE')},
              {value: this.translate.instant('OWNER'), title: this.translate.instant('OWNER')}
            ]
          }
        }
      },
      status: {
        title: this.translate.instant('STATUS'),
        type: 'string',
        width: '10%',
        filterFunction(cell?: any, search?: string): boolean {
          return cell === search;
        },
        filter: {
          type: 'list',
          config: {
            selectText: this.translate.instant('ALL'),
            list: [
              {value: this.translate.instant('ACTIVE'), title: this.translate.instant('ACTIVE')},
              {value: this.translate.instant('IN_ACTIVE'), title: this.translate.instant('IN_ACTIVE')}
            ]
          }
        }
      },
    },
  };

  users;

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
    this.http.get('user/listNotStoresUsers').subscribe((data) => {
      for (let i = 0; i < data['userModels'].length; i++) {
        data['userModels'][i].status = data['userModels'][i].active === true ?
          this.translate.instant('ACTIVE') : this.translate.instant('IN_ACTIVE');
        data['userModels'][i].typeLocalized = this.translate.instant(data['userModels'][i].type);
      }
      this.users = data['userModels'];
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
      case 'delete':
        this.delete(event.data);
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

  delete(data) {
    this.http.get('user/delete/' + data.id).subscribe(() => {
      this.toaster.showToast(NbToastStatus.SUCCESS, this.translate.instant('USER_DELETED_SUCCESSFULLY'));
      this.init();
    });
  }
}
