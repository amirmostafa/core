import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {UserService} from "../../../../utils/services/user.service";
import {ToasterService} from "../../../../utils/services/toaster.service";
import {UserModel} from "../../../../utils/models/user.model";
import {NbToastStatus} from "@nebular/theme/components/toastr/model";
import {EventService} from "../../../../utils/services/event.service";

@Component({
  selector: 'ngx-assign-request',
  templateUrl: './assign-request.component.html',
  styleUrls: ['./assign-request.component.scss']
})
export class AssignRequestComponent implements OnInit {

  requestId;
  users: UserModel[];
  constructor(private activeModal: NgbActiveModal,
              private userService: UserService,
              private http: HttpClient,
              private translate: TranslateService,
              private router: Router,
              private toaster: ToasterService,
              private eventService: EventService<any>) { }

  closeModal() {
    this.eventService.broadcastEvent('ASSIGN_MODAL_CLOSED', true);
    this.activeModal.close();
  }
  ngOnInit() {
    this.http.get('user/listDelegateUsers').subscribe((data) =>{
      this.users = data['userModels'];
    })
  }

  customAction(event) {
    this.http.get('request/assignRequest/' + event.data.id + '/' + this.requestId + '/' + this.userService.getCurrentUser().id)
      .subscribe(() =>{
        this.toaster.showToast(NbToastStatus.SUCCESS, 'REQUEST_ASSIGNED_SUCCESSFULLY');
        this.closeModal();
      });
  }



  settings = {
    hideSubHeader: true,
    actions: {
      columnTitle: this.translate.instant('ACTIONS'),
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'assign',
          title: '<i class="ion-person-add" title="' + this.translate.instant('ASSIGN') + '"></i>'
        }
      ],
      position: 'right',
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
      }
    },
  };

}
