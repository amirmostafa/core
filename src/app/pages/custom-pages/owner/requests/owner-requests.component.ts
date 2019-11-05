import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {NbToastStatus} from "@nebular/theme/components/toastr/model";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../utils/services/user.service";
import {ToasterService} from "../../../../utils/services/toaster.service";
import {RequestModel} from "../../../../utils/models/request.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AssignRequestComponent} from "../assign-request/assign-request.component";
import {EventService} from "../../../../utils/services/event.service";
import {UserModel} from "../../../../utils/models/user.model";
import {ValueTitlePairModel} from "../../../../utils/models/Value-Title-Pair.model";

@Component({
  selector: 'ngx-owner-requests',
  templateUrl: './owner-requests.component.html',
  styleUrls: ['./owner-requests.component.scss']
})
export class OwnerRequestsComponent implements OnInit, OnDestroy {

  stores: ValueTitlePairModel[];
  delegates: ValueTitlePairModel[];
  requests: RequestModel[];
  status = null;
  url= null;

  constructor(private userService: UserService,
              private http: HttpClient,
              private translate: TranslateService,
              private router: Router,
              private toaster: ToasterService,
              private modalService: NgbModal,
              private eventService: EventService<any>,
              private activateRoute: ActivatedRoute) {
  }

  showLargeModal(id) {
    const activeModal = this.modalService.open(AssignRequestComponent, {size: 'lg', container: 'nb-layout'});
    activeModal.componentInstance.requestId = id;
  }

  ngOnInit() {
    // this.listStores();
    // this.listDelegates();
    const type = this.activateRoute.snapshot.params['type'];
    if(type){
      this.url = 'request/listRequestsByType/' + type+'/' + this.activateRoute.snapshot.params['id'];
    }

    this.init();
    this.eventService.getEvent('ASSIGN_MODAL_CLOSED').subscribe(() => {
      this.init();
    });
  }

  listStores() {
    this.http.get('user/listStoresUsers').subscribe((data) => {
      this.stores = this.prepareData(data['userModels']);
    });
  }

  listDelegates() {
    this.http.get('user/listDelegateUsers').subscribe((data) => {
      this.delegates = this.prepareData(data['userModels']);
    });
  }

  prepareData(data: UserModel[]){
    const arr: ValueTitlePairModel[] = [];
    for(const user of data){
      arr.push({value: user.name, title: user.name});
    }
    return arr;
  }


  init() {
    this.http.get(this.url || 'request/listRequestsByStatus/' + this.status).subscribe((data) => {
      for(let i=0;i< data['requestModels'].length;i++){
        data['requestModels'][i].statusLocalized = this.translate.instant(data['requestModels'][i].status);
      }
      this.requests = data['requestModels'];
      if(this.requests && this.requests.length >0){
        setTimeout(this.hideElements, 10);
      }
    })
  }
  hideElements() {
    let checkmark = document.getElementsByClassName('ion-person-add');//[0].parentElement;//.parentElement.parentElement.parentElement.classList.contains('hide-assign');
    for (let i = 0; i < checkmark.length; i++) {
      let parent = checkmark[i].parentElement;
      parent.hidden = parent.parentElement.parentElement.parentElement.classList.contains("hide-assign");
    }
    let close = document.getElementsByClassName('ion-close');//[0].parentElement;//.parentElement.parentElement.parentElement.classList.contains('hide-assign');

    for (let i = 0; i < close.length; i++) {
      let parent = close[i].parentElement;
      parent.hidden = parent.parentElement.parentElement.parentElement.classList.contains("hide-assign");
    }
  }

  customAction(event) {
    switch (event.action) {
      case 'view':
        this.view(event.data);
        return;
      case 'assign':
        this.assign(event.data);
        return;
      case 'reject':
        this.reject(event.data);
        return;
    }
  }

  view(data) {
    this.router.navigate(['/pages/add-request/' + data.id + '/true']);
  }

  assign(data) {
    this.showLargeModal(data.id);
  }

  reject(data) {
    this.http.get('request/changeRequestStatus/REJECTED/' + data.id).subscribe(() => {
      this.toaster.showToast(NbToastStatus.SUCCESS, this.translate.instant('REQUEST_REJECTED_SUCCESSFULLY'));
      this.init();
    });
  }

  ngOnDestroy(){
    this.eventService.unSubscribeEvent('ASSIGN_MODAL_CLOSED');
  }


  settings = {
    rowClassFunction: (row) => {
      if (row.data.status !== 'NEW' && row.data.status !== 'REJECTED_BY_DELEGATE') {
        return 'hide-assign';
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
          name: 'assign',
          title: '<i class="ion-person-add" title="' + this.translate.instant('ASSIGN') + '"></i>'
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
        width: '5%'
      },
      userName: {
        title: this.translate.instant('STORE'),
        type: 'string',
        width: '9%'
      },
      name: {
        title: this.translate.instant('PRODUCT_NAME'),
        type: 'string',
        width: '11%'
      },
      totalAmount: {
        title: this.translate.instant('TOTAL_AMOUNT'),
        type: 'string',
        width: '8%'
      },
      date: {
        title: this.translate.instant('DATE'),
        type: 'string',
        width: '11%'
      },
      deliveryAddress: {
        title: this.translate.instant('DELIVERY_ADDRESS'),
        type: 'string',
        width: '15%'
      },
      statusLocalized: {
        title: this.translate.instant('STATUS'),
        type: 'string',
        width: '12%',
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
        width: '10%'
      },
    rejectionReason: {
      title: this.translate.instant('REJECTION_REASON'),
      type: 'string',
      width: '10%'
    },
    },
  };

}
