import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Paginator } from 'primeng/paginator';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.component.html',
  styleUrls: ['./inquiry.component.scss']
})
export class InquiryComponent implements OnInit, OnDestroy {

  @ViewChild('p', { static: false }) paginator: Paginator;

  public inquiryDateSort: boolean = false;
  public dateCreatedSort: boolean = false;
  public branchNameSort: boolean = false;
  public lastUpdatedSort: boolean = false;
  public recordOwnerSort: boolean = false;
  public clientLastNameSort: boolean = false;

  public filterData: any;

  public orderBy = "inquiry date";
  public orderType = "desc";

  // customers = [1];
  public recordId = null;
  public branchName = null;
  public clientName = null;
  public statusId = 1;
  public callerName = null;
  public callerNumber = null

  private applyRecordId = null;
  private applyInquiryDateStart = null;
  private applyInquiryDateEnd = null;
  private applyBranchName = null;
  private applyClientName = null;
  private applyStatusId = 1;
  private applycallerName = null;
  private applycallerNumber = null;

  public perPage = 10;
  public lowerbound = 1;
  public upperBound = 10;
  public totalRecordsCount = 0;
  // public branchList = [];

  public inquiriesList = [];

  // public statuslist = [];
  public sysDate: Date = new Date();

  public inquiryDateStart: Date = new Date();
  public inquiryDateEnd: Date = new Date();

  constructor(public _apiservice: ApiService, private router: Router, private datePipe: DatePipe) {
    sessionStorage.removeItem('inquiryId');
    sessionStorage.removeItem('clientName');
    this._apiservice.SetheaderName('Inquiries');

    let filterData=JSON.parse(sessionStorage.getItem('inquiryFilter'));
    console.log(filterData,"flterdata")
    console.log(filterData!=null)
    if(filterData!=null){
      this.recordId=filterData.recordId!=0?filterData.recordId:null;
      this.inquiryDateStart= new Date(filterData.startDate);
      this.inquiryDateEnd= new Date (filterData.endDate);
      this.branchName=filterData.branchName!=0?filterData.branchName:null;
      this.clientName=filterData.clientName,
      this.statusId=filterData.status!=0?filterData.status:null;
      this.callerName=filterData.callerName;
      this.callerNumber=filterData.callerPhone;
      this.orderType='desc';
      this.orderBy=filterData.orderBy;

    }
    else{
      this.inquiryDateStart.setDate(new Date().getDate() - 31)

    }


  }
  ngOnInit(): void {
    this.onGo();
  }
  public getInquiryList() {
    try {
      let obj = {
        userId: this._apiservice.userResponse.userId, recordId: this.applyRecordId, inquiryDateStart: this.applyInquiryDateStart, callerName: this.applycallerName, callerPhone: this.applycallerNumber,
        inquiryDateEnd: this.applyInquiryDateEnd, branchId: this.applyBranchName, clientName: this.applyClientName, statusId: this.applyStatusId, lowerBound: this.lowerbound, upperBound: this.upperBound,
     "order": this.orderType,"orderBy": this.orderBy,
      }
      this._apiservice.getInquiryList(JSON.stringify(obj)).subscribe(res => {
        console.log(res);
        this.inquiriesList = res.inquiryList;
        this.totalRecordsCount = res.totalRecordsCount;
      })
    } catch (error) {

    }
  }


  public edit(id, name) {
    sessionStorage.setItem('inquiryId', id);
    sessionStorage.setItem('clientName', name);
    this.router.navigateByUrl(`/create-inquiry`)
  }

  public onGo(event?) {
    console.log(this.inquiryDateStart,this.inquiryDateEnd)
    let dateFlag = false;
    if (this.inquiryDateStart != null && this.inquiryDateEnd != null) {
      if (this.inquiryDateStart > this.inquiryDateEnd) {
        Swal.fire(`Invalid date`, 'Start date cannot be greater than End date', 'warning');
      } else {
        dateFlag = true;
      }
    }
    else {
      if (this.inquiryDateStart == null && this.inquiryDateEnd != null) {
        Swal.fire(`Invalid date`, 'Start date cannot be empty', 'warning');
      } else
        if (this.inquiryDateStart != null && this.inquiryDateEnd == null) {
          Swal.fire(`Invalid date`, 'End date cannot be empty', 'warning');
        } else if (this.inquiryDateStart == null && this.inquiryDateEnd == null) {
          Swal.fire(`Invalid date`, 'Start date and End date cannot be empty', 'warning');
        }
    }
    if (dateFlag) {
      this.applyRecordId = this.recordId != null ? this.recordId : 0;
      this.applyInquiryDateStart = this.inquiryDateStart != null ? this.datePipe.transform(this.inquiryDateStart, 'MM/dd/yyyy') : '';
      this.applyInquiryDateEnd = this.inquiryDateEnd != null ? this.datePipe.transform(this.inquiryDateEnd, 'MM/dd/yyyy') : '';
      this.applyBranchName = this.branchName != null ? this.branchName : 0;
      this.applyClientName = this.clientName != null ? this.clientName.trim() : '';
      this.applyStatusId = this.statusId != null ? this.statusId : 0;
      this.applycallerName = this.callerName != null ? this.callerName.trim() : '';
      this.applycallerNumber = this.callerNumber != null ? this.callerNumber.trim() : '';
      event ? this.paginator.changePageToFirst(event) : '';
      this.getInquiryList();
      // this.reset = 0;
    }
  }


  public onPageChange(event) {
    console.log(this.perPage);


    this.lowerbound = (event.page) * event.rows + 1;
    this.upperBound = this.lowerbound + event.rows - 1;
    this.perPage = event.rows;

    this.getInquiryList();

    console.log(event)
  }
  public deleteInquiry(id) {
    Swal.fire({
      title: 'Are you sure you want to Delete?',
      // text: "you want to Logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Delete'
    }).then((result) => {
      if (result.isConfirmed) {

        try {
          let obj = { "userId": this._apiservice.userResponse.userId, recordId: id }
          this._apiservice.deleteInquiry(JSON.stringify(obj)).subscribe(res => {
            console.log(res);
            Swal.fire('', res.message, 'success');
            this.getInquiryList();

          })

        } catch (error) {

        }
      }
    })




  }

  public activityRoute(id, name) {
    sessionStorage.setItem('inquiryId', id);
    console.log(name, name != 'undefined', name == 'undefined')
    // let data=name!='undefined'?name:''
    sessionStorage.setItem('clientName', name);

    this.router.navigateByUrl(`/activity`);
    // this.router.navigateByUrl(`/activity/${id}/${name}`);
  }



  exportexcel2(): void {
    let mappedJson = [];
    mappedJson = this.inquiriesList.map(item => {
      return {
        "Inquiry #": item?.recordId,
        "Inquiry Date": item?.inquiryDate,
        "Date Created": item?.dateCreated,
        "Branch Name": item?.branchName,
        "Client Name": item?.clientName,
        "Caller Name	": item?.callerName,
        "Caller Phone": item?.callerPhone,
        "Status": item?.status,
        "# Activities": item?.activities,
        "Last Activity Date": item?.inquiryDate,
        "Follow-up Date": item?.followUpDate,
        "Record Owner": item?.recordOwner,
        "Patient ID": item?.patientId,
        "Conversion": item?.conversion
      }
    });
    var wscols = [
      { wch: 10 },
      { wch: 15 },
      { wch: 25 },
      { wch: 25 },
      { wch: 20 },
      { wch: 15 },
      { wch: 25 },
      { wch: 15 },
      { wch: 25 },
      { wch: 25 },
      { wch: 10 },
      { wch: 10 },


    ];
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(mappedJson);
    worksheet["!cols"] = wscols
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });


    // /* table id is passed over here */
    // let element = document.getElementById('excel-table');
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // /* generate workbook and add the worksheet */
    // const wb: XLSX.WorkBook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // /* save to file */
    let name = 'Inquiry';
    this.saveAsExcelFile(excelBuffer, name);

    // XLSX.writeFile(wb, name);

  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'string' });
    /***********`
    *YOUR EXCEL FILE'S NAME
    */
    FileSaver.saveAs(data, fileName + '.xlsx');
  }

  ngOnDestroy() {
    console.log("ondestroy")

    this.filterData = {
      recordId: this.applyRecordId,
      startDate: this.applyInquiryDateStart,
      endDate: this.applyInquiryDateEnd,
      branchName: this.applyBranchName,
      clientName: this.applyClientName,
      status: this.applyStatusId,
      callerName: this.applycallerName,
      callerPhone: this.applycallerNumber,
      orderBy:this.orderBy,
      orderType:this.orderType
    }
    sessionStorage.setItem('inquiryFilter', JSON.stringify(this.filterData));
  }

  public onsort(ordertype, orderby,event) {
    this.orderType = ordertype;
    this.orderBy = orderby;
    this.paginator.changePageToFirst(event);
    this.getInquiryList();
  }
}


