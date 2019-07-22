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
      },
      name: {
        title: this.translate.instant('NAME'),
        type: 'string',
      },
      date: {
        title: this.translate.instant('DATE'),
        type: 'string',
      },
      totalAmount: {
        title: this.translate.instant('TOTAL_AMOUNT'),
        type: 'number',
      },
      deliveryAddress: {
        title: this.translate.instant('DELIVERY_ADDRESS'),
        type: 'string',
      },
      status: {
        title: this.translate.instant('STATUS'),
        type: 'string',
      },
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
    }

  }

  delete(id){
    this.http.post('request/delete/' + id, {}).subscribe(() => {
      this.toaster.showToast(NbToastStatus.SUCCESS, 'REQUEST_DELETED_SUCCESSFULLY');
      this.init();
    });
  }

  view(data){
    this.router.navigate(['/pages/add-request/' + data.id]);
  }
  addRequest() {
    this.router.navigate(['/pages/add-request']);
  }

}
