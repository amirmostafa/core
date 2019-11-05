import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "../../../../utils/services/user.service";
import {RequestModel} from "../../../../utils/models/request.model";
import {UserModel} from "../../../../utils/models/user.model";
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

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
  user = {id: 0, name: "SELECT_USER"};
  stats;
  types = ["SELECT_TYPE", "STORE", "DELEGATE"];
  type;

  constructor(private userService: UserService,
              private http: HttpClient,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.type = this.types[0];
    this.init();
  }

  onUserChange() {
    this.init();
  }

  onTypechange() {
    this.user = {id: 0, name: "SELECT_USER"};
    if (this.type !== 'SELECT_TYPE') {
      if (this.type === 'STORE') {
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
      data['userModels'].unshift({id: 0, name: "SELECT_USER"});
      this.users = data['userModels'];
      this.init();
    });
  }

  listDelegates() {
    this.http.get('user/listDelegateUsers').subscribe((data) => {
      data['userModels'].unshift({id: 0, name: "SELECT_USER"});
      this.users = data['userModels'];
      this.init();
    });
  }


  init() {
    if (this.type !== 'SELECT_TYPE') {
      this.getData('request/listRequestsByType/' + this.type + '/' + this.user.id);
    } else {
      this.getData('request/listRequestsByStatus/null');
    }
  }

  getData(url) {
    this.http.get(url).subscribe((data) => {
      for (let i = 0; i < data['requestModels'].length; i++) {
        data['requestModels'][i].statusLocalized = this.translate.instant(data['requestModels'][i].status);
      }
      this.requests = data['requestModels'];
      const arr = [];
      for (let key in data['stats']) {
        arr.push({key: this.translate.instant(key), value: data['stats'][key]})
      }
      this.stats = arr;
    })
  }

  settings = {
    hideSubHeader: true,
    actions: {
      add: false,
      delete: false,
      edit: false
    },
    pager: {
      display: true,
      perPage: 1000,
    },
    columns: {
      id: {
        title: this.translate.instant('ID'),
        type: 'number',
        width: '8%'
      },
      name: {
        title: this.translate.instant('PRODUCT_NAME'),
        type: 'string',
        width: '22%'
      },
      date: {
        title: this.translate.instant('DATE'),
        type: 'string',
        width: '17%'
      },
      deliveryAddress: {
        title: this.translate.instant('DELIVERY_ADDRESS'),
        type: 'string',
        width: '22%'
      },
      totalAmount: {
        title: this.translate.instant('TOTAL_AMOUNT'),
        type: 'string',
        width: '10%'
      },
      statusLocalized: {
        title: this.translate.instant('STATUS'),
        type: 'string',
        width: '21%'
      }
    },
  };

  settings2 = {
    hideSubHeader: true,
    hideHeader: true,
    actions: {
      add: false,
      delete: false,
      edit: false
    },
    columns: {
      key: {
        type: 'string',
        width: '50%'
      },
      value: {
        type: 'number',
        width: '50%'
      }
    },
  };

  generatePDF() {
    let data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      let imgWidth = 208;//208
      // var pageHeight = 50;//295
      let imgHeight = canvas.height * imgWidth / canvas.width;
      // var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      let position = 30;
      let title = this.type === "SELECT_TYPE" ?
        this.translate.instant("REPORTS") : this.user.id === 0 ?
          this.translate.instant(this.type) : this.user.name;
      pdf.text("Reports", 95, 20);
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(title + '.pdf');
    });
  }


  generateExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.prepareDataForExcel());
    const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
    if(this.translate.getDefaultLang() === 'ar'){
      this.set_right_to_left(workbook);
    }
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    const data: Blob = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});
    FileSaver.saveAs(data, this.type === "SELECT_TYPE" ?
      this.translate.instant("REPORTS") : this.user.id === 0 ?
        this.translate.instant(this.type) : this.user.name + '.xlsx');
  }

  set_right_to_left(wb) {
    if(!wb.Workbook) wb.Workbook = {};
    if(!wb.Workbook.Views) wb.Workbook.Views = [];
    if(!wb.Workbook.Views[0]) wb.Workbook.Views[0] = {};
    wb.Workbook.Views[0].RTL = true;
  }

  prepareDataForExcel() {
    const data = [];
    let row = {};
    for (let i=0; i<this.requests.length; i++) {
      row[this.translate.instant('ID')] = this.requests[i].id;
      row[this.translate.instant('PRODUCT_NAME')] = this.requests[i].name;
      row[this.translate.instant('DATE')] = this.requests[i].date;
      row[this.translate.instant('DELIVERY_ADDRESS')] = this.requests[i].deliveryAddress;
      row[this.translate.instant('STATUS')] = this.requests[i].statusLocalized;
      if(i <= this.stats.length) {
        row[''] = '';
        row[this.translate.instant('STATUSES')] = this.stats[i].key;
        row[this.translate.instant('COUNT')] = this.stats[i].value;
      }
      data.push(row);
    }
    return data;
  }

}
