import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {NbToastStatus} from "@nebular/theme/components/toastr/model";
import {Router} from "@angular/router";
import {UserService} from "../../../../utils/services/user.service";
import {ToasterService} from "../../../../utils/services/toaster.service";
import {RequestModel} from "../../../../utils/models/request.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EventService} from "../../../../utils/services/event.service";

@Component({
  selector: 'ngx-delegate-requests',
  templateUrl: './delegate-requests.component.html',
  styleUrls: ['./delegate-requests.component.scss']
})
export class DelegateRequestsComponent implements OnInit, OnDestroy {

  requests: RequestModel[];
  status = null;

  constructor(private userService: UserService,
              private http: HttpClient,
              private translate: TranslateService,
              private router: Router,
              private toaster: ToasterService,
              private modalService: NgbModal,
              private eventService: EventService<any>) {
  }

  ngOnInit() {
    this.init();
    this.eventService.getEvent('ASSIGN_MODAL_CLOSED').subscribe(() => {
      this.init();
    });
  }


  init() {
    this.http.get('request/listRequestsForCurrentAssignedUser/' + this.userService.getCurrentUser().id).subscribe((data) => {
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
      case 'approve':
        this.approve(event.data);
        return;
      case 'deliver':
        this.deliver(event.data);
        return;
      case 'reject':
        this.reject(event.data);
        return;
    }
  }

  view(data) {
    this.router.navigate(['/pages/add-request/' + data.id]);
  }

  approve(data) {
    this.http.get('request/changeRequestStatus/ACCEPTED_BY_DELEGATE/' + data.id).subscribe(() => {
      this.toaster.showToast(NbToastStatus.SUCCESS, this.translate.instant('REQUEST_ACCEPTED_SUCCESSFULLY'));
      this.init();
    });
  }

  deliver(data) {
    this.http.get('request/changeRequestStatus/DELIVERED/' + data.id).subscribe(() => {
      this.toaster.showToast(NbToastStatus.SUCCESS, this.translate.instant('REQUEST_DELIVERED_SUCCESSFULLY'));
      this.init();
    });
  }

  reject(data) {
    this.http.get('request/changeRequestStatus/REJECTED_BY_DELEGATE/' + data.id).subscribe(() => {
      this.toaster.showToast(NbToastStatus.SUCCESS, this.translate.instant('REQUEST_REJECTED_SUCCESSFULLY'));
      this.init();
    });
  }

  ngOnDestroy(){
    this.eventService.unSubscribeEvent('ASSIGN_MODAL_CLOSED');
  }


  settings = {
    rowClassFunction: (row) => {
      if (row.data.status === 'ACCEPTED_BY_DELEGATE') {
        return 'hide-accepted';
      }
      if (row.data.status === 'REJECTED_BY_DELEGATE') {
        return 'hide-rejected';
      }
      if (row.data.status === 'DELIVERED') {
        return 'hide-delivered';
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
          name: 'deliver',
          title: '<i class="ion-paper-airplane" title="' + this.translate.instant('DELIVER') + '"></i>'
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
        width: '9%'
      },
      userName: {
        title: this.translate.instant('STORE'),
        type: 'string',
        width: '12%'
      },
      name: {
        title: this.translate.instant('PRODUCT_NAME'),
        type: 'string',
        width: '15%'
      },
      date: {
        title: this.translate.instant('DATE'),
        type: 'string',
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
            ]
          }
        }
      }
    },
  };

}
