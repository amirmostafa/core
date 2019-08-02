import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../utils/services/user.service";
import {ToasterService} from "../../../../utils/services/toaster.service";
import {RequestModel} from "../../../../utils/models/request.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EventService} from "../../../../utils/services/event.service";
import {UserModel} from "../../../../utils/models/user.model";

@Component({
  selector: 'ngx-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  users: UserModel[];
  requests: RequestModel[];
  status = null;
  url = null;
  user = "0";
  type;

  constructor(private userService: UserService,
              private http: HttpClient,
              private translate: TranslateService,
              private router: Router) {
  }

  ngOnInit() {
    this.init();
  }

  onUserChange() {
    this.init();
  }

  onTypechange() {
    this.user = "1";
    if(this.type) {
      if(this.type === 'STORE'){
        this.listStores();
      } else {
        this.listDelegates();
      }
    } else {
      this.users = undefined;
      this.init();
    }
  }

  listStores() {
    this.http.get('user/listStores').subscribe((data) => {
      this.users = data['userModels'];
      this.init();
    });
  }

  listDelegates() {
    this.http.get('user/listDelegateUsers').subscribe((data) => {
      this.users = data['userModels'];
      this.init();
    });
  }


  init() {
    if (this.type) {
      this.getData('request/listRequestsByType/' + this.type + '/' + this.user);
    } else {
      this.getData('request/listRequestsByStatus/null');
    }
  }

  getData(url) {
    console.log("before " + this.user);
    this.http.get(url).subscribe((data) => {
      console.log("after " + this.user);
      for (let i = 0; i < data['requestModels'].length; i++) {
        data['requestModels'][i].statusLocalized = this.translate.instant(data['requestModels'][i].status);
      }
      this.requests = data['requestModels'];
    })
  }

  settings = {
    hideSubHeader: true,
    actions: {
      add: false,
      delete: false,
      edit: false
    },
    columns: {
      id: {
        title: this.translate.instant('ID'),
        type: 'number',
        width: '9%'
      },
      name: {
        title: this.translate.instant('PRODUCT_NAME'),
        type: 'string',
        width: '12%'
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
        width: '12%'
      }
    },
  };

  settings2 = {
    hideHeader: true,
    hideSubHeader: true,
    columns: {
      id: {
        title: this.translate.instant('ID'),
        type: 'number',
        width: '9%'
      },
      name: {
        title: this.translate.instant('PRODUCT_NAME'),
        type: 'string',
        width: '12%'
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
        width: '12%'
      }
    },
  };

}
