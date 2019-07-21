import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../utils/services/user.service";
import {UserModel} from "../../../../utils/models/user.model";
import {HttpClient} from "@angular/common/http";
import {LocalDataSource} from "ng2-smart-table";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'ngx-confirm-store',
  templateUrl: './confirm-store.component.html',
  styleUrls: ['./confirm-store.component.scss']
})
export class ConfirmStoreComponent implements OnInit {
  view = 'VIEW';
  approve='APPROVE';
  reject='REJECT';
  settings = {
    hideSubHeader: true,
    actions: {
      columnTitle: 'Actions',
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'view',
          title: '<i class="ion-eye" title="{{view|translate}}"></i>'
        },
        {
          name: 'approve',
          title: '<i class="ion-checkmark" title="{{approve|translate}}"></i>'
        },
        {
          name: 'reject',
          title: '<i class="ion-edit" title="{{reject|translate}}"></i>'
        }
      ],
      position: 'right',
    },
    custom: {
      inputClass: '',
      editButtonContent: 'Edit',
      saveButtonContent: 'Update',
      cancelButtonContent: 'Cancel',
      confirmSave: false,
    },
    columns: {
      logo: {
        title: this.translate.instant('LOGO'),
        type: 'string',
      },
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
      commercialRegister: {
        title: this.translate.instant('COMMERCIAL_REGISTER'),
        type: 'string',
      },
    },
  };

  stores;

  constructor(private userService: UserService,
              private http: HttpClient,
              private translate: TranslateService) { }

  ngOnInit() {
    this.http.get('user/listInActiveUsers').subscribe((data: UserModel[]) => {
      this.stores = data['userModels'];
    })
  }

}
