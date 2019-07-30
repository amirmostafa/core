import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../../../../utils/models/user.model";
import {TranslateService} from "@ngx-translate/core";
import {NbToastStatus} from "@nebular/theme/components/toastr/model";
import {Router} from "@angular/router";
import {UserService} from "../../../../utils/services/user.service";
import {ToasterService} from "../../../../utils/services/toaster.service";
import {RequestModel} from "../../../../utils/models/request.model";

@Component({
  selector: 'ngx-store-requests',
  templateUrl: './store-requests.component.html',
  styleUrls: ['./store-requests.component.scss']
})
export class StoreRequestsComponent implements OnInit {

  settings = {
    rowClassFunction: (row) => {
      if (row.data.status !== 'NEW') {
        return 'hide-edit';
      }
      return '';
    },
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
          name: 'delete',
          title: '<i class="ion-trash-a" title="' + this.translate.instant('DELETE') + '"></i>'
        },
        {
          name: 'edit',
          title: '<i class="ion-edit" title="' + this.translate.instant('EDIT') + '"></i>'
        }
      ],
      position: 'right',
    },
    columns: {
      id: {
        title: this.translate.instant('ID'),
        type: 'number',
        width: '9%'
      },
      name: {
        title: this.translate.instant('NAME'),
        type: 'string',
        width: '12%'
      },
      date: {
        title: this.translate.instant('DATE'),
        type: 'string',
        width: '12%'
      },
      totalAmount: {
        title: this.translate.instant('TOTAL_AMOUNT'),
        type: 'number',
        width: '12%'
      },
      deliveryAddress: {
        title: this.translate.instant('DELIVERY_ADDRESS'),
        type: 'string',
        width: '15%'
      },
      statusLocalized: {
        title: this.translate.instant('STATUS'),
        type: 'string',
        width: '15%',
        filterFunction(cell?: any, search?: string): boolean {
          return cell === search;
        },
        filter: {
          type: 'list',
          config: {
            selectText: this.translate.instant('ALL'),
            list: [
              { value: this.translate.instant('NEW'), title: this.translate.instant('NEW') },
              { value: this.translate.instant('REJECTED'), title: this.translate.instant('REJECTED') },
              { value: this.translate.instant('ASSIGNED_TO_DELEGATE'), title: this.translate.instant('ASSIGNED_TO_DELEGATE') },
              { value: this.translate.instant('ACCEPTED_BY_DELEGATE'), title: this.translate.instant('ACCEPTED_BY_DELEGATE') },
              { value: this.translate.instant('REJECTED_BY_DELEGATE'), title: this.translate.instant('REJECTED_BY_DELEGATE') },
              { value: this.translate.instant('DELIVERED'), title: this.translate.instant('DELIVERED') },
              { value: this.translate.instant('REJECTED_BY_CLIENT'), title: this.translate.instant('REJECTED_BY_CLIENT') },
            ]
          }
        }
      },
      assignedtoName: {
        title: this.translate.instant('DELEGATE'),
        type: 'string',
        width: '12%'
      }
    },
  };

  requests:  RequestModel[];

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
    this.http.get('request/listRequestsForCurrentUser/' + this.userService.getCurrentUser().id).subscribe((data: RequestModel[]) => {
      for(let i=0;i< data['requestModels'].length;i++){
        data['requestModels'][i].statusLocalized = this.translate.instant(data['requestModels'][i].status);
      }
      this.requests = data['requestModels'];
    })
  }

  customAction(event) {
    switch (event.action) {
      case 'view':
        this.view(event.data);
        return;
      case 'delete':
        this.delete(event.data.id);
        return;
      case 'edit':
        this.edit(event.data);
        return;
    }

  }

  delete(id){
    this.http.post('request/delete/' + id, {}).subscribe(() => {
      this.toaster.showToast(NbToastStatus.SUCCESS, 'REQUEST_DELETED_SUCCESSFULLY');
      this.init();
    });
  }

  view(data){
    this.router.navigate(['/pages/add-request/' + data.id + '/true']);
  }
  edit(data){
    this.router.navigate(['/pages/add-request/' + data.id + '/false']);
  }
  addRequest() {
    this.router.navigate(['/pages/add-request']);
  }

}
