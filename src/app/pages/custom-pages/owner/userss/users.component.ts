import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../utils/services/user.service";
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
          title: '<i class="ion-document-text" title="' + this.translate.instant('VIEW_REQUESTS') + '"></i>'
        },
        {
          name: 'delete',
          title: '<i class="ion-trash-a" title="' + this.translate.instant('DELETE') + '"></i>'
        },
        {
          name: 'reject',
          title: '<i class="ion-close" title="' + this.translate.instant('REJECT') + '"></i>'
        },
        {
          name: 'approve',
          title: '<i class="ion-checkmark" title="' + this.translate.instant('APPROVE') + '"></i>'
        }
      ],
      position: 'right',
    },
    columns: {
      id: {
        title: this.translate.instant('ID'),
        type: 'number',
        width: '6%'
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
        width: '9%',
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
        width: '9%',
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
    this.http.get('user/listNotStoresUsers/' + this.userService.getCurrentUser().id).subscribe((data) => {
      for (let i = 0; i < data['userModels'].length; i++) {
        data['userModels'][i].status = data['userModels'][i].active === true ?
          this.translate.instant('ACTIVE') : this.translate.instant('IN_ACTIVE');
        data['userModels'][i].typeLocalized = this.translate.instant(data['userModels'][i].type);
      }
      this.users = data['userModels'];
      if(this.users && this.users.length >0){
        setTimeout(this.hideElements, 10);
      }
    })
  }
  hideElements() {
    let checkmark = document.getElementsByClassName('ion-checkmark');//[0].parentElement;//.parentElement.parentElement.parentElement.classList.contains('hide-assign');
    for (let i = 0; i < checkmark.length; i++) {
      let parent = checkmark[i].parentElement;
      parent.hidden = parent.parentElement.parentElement.parentElement.classList.contains("hide-assign");
    }
    let close = document.getElementsByClassName('ion-close');//[0].parentElement;//.parentElement.parentElement.parentElement.classList.contains('hide-assign');

    for (let i = 0; i < close.length; i++) {
      let parent = close[i].parentElement;
      parent.hidden = parent.parentElement.parentElement.parentElement.classList.contains("show-assign");
    }
  }
  customAction(event) {
    switch (event.action) {
      case 'view-requests':
        this.viewRequests(event.data);
        return;
      case 'edit':
        this.edit(event.data);
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
    this.router.navigate(['/pages/view-profile/' + data.id + '/false']);
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

  addUser() {
    this.router.navigate(['/pages/add-user']);
  }

  edit(data) {
    this.router.navigate(['/pages/view-profile/' + data.id + '/true']);
  }

  viewRequests(data) {
    this.router.navigate(['/pages/requests/'+data.type + '/' + data.id]);
  }
}
