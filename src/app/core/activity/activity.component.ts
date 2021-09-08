import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paginator } from 'primeng/paginator';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';
// import {  DialogService, DynamicDialogRef } from 'primeng/dynamicdialog/public_api';
import { CreateActivityComponent } from './create-activity/create-activity.component';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateInquiryComponent } from '../inquiry/create-inquiry/create-inquiry.component';
import { OnDestroy } from '@angular/core';
// import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog/public_api';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit, OnDestroy {
  @ViewChild('p', { static: false }) paginator: Paginator;

  public recordId = null;
  // public pagination=false;
  public branchId = null;
  public activityList = [];
  public callerName = null;
  public phoneNumber = null;
  // public lookupresponse:any;
  public totalRecordsCount = 0;
  public activeAsc = true;
  public startTime = true;
  public complated = true;
  public activityTypeId=null;

  public lowerbound = 1;
  public upperBound = 10;
  public clientName = '';
  public orderBy = 'activity date';
  public orderType = "asc";
  public detailsPopup:boolean=false;
  public detailsData='';
  public filterData:any;

  constructor(public _apiservice: ApiService, private router: Router, private activatedRoute: ActivatedRoute, public dialogService: DialogService) {
    sessionStorage.removeItem('inquiryId');
    sessionStorage.removeItem('clientName');
    this._apiservice.inquiriesLookUp.length == 0 ? this._apiservice.getInquiresLokkup() : '';
    this._apiservice.SetheaderName('Activities');

    let filterData=JSON.parse(sessionStorage.getItem('activityFilter'));
    if(filterData!=null){
      this.recordId=filterData.recordId!=0?filterData.recordId:null;
      this.clientName=filterData.clientName;
      this.callerName=filterData.callerName;
      this.phoneNumber=filterData.callerPhone;
      this.activityTypeId=filterData.activityTypeId!=0?filterData.activityTypeId:null;
      console.log(this.activityTypeId)
    }
  }
  ngOnInit(): void {

    this.getActivityList();
  }
  public getActivityList() {
    try {
      let obj = {
        "orderBy": this.orderBy, callerName: this.callerName == null ? '' : this.callerName.trim(), callerPhone: this.phoneNumber == null ? '' : this.phoneNumber,
        "order": this.orderType, "recordId": this.recordId == null ? 0 : this.recordId, clientName: this.clientName.trim(), lowerBound: this.lowerbound, upperBound: this.upperBound,
        "activityTypeId":this.activityTypeId==null?0:this.activityTypeId
      }
      this._apiservice.getActivityList(JSON.stringify(obj)).subscribe(res => {
        console.log(res)
        this.activityList = res.activityList;
        this.totalRecordsCount = res.totalRecordsCount;
      })

    } catch (error) {

    }

  }


  public onGo(event?) {
    event ? this.paginator.changePageToFirst(event) : '';
    this.getActivityList();


  }

  public onsort(ordertype, orderby,event) {
    this.orderType = ordertype;
    this.orderBy = orderby;
    this.paginator.changePageToFirst(event);
    this.getActivityList();
  }
  public onPageChange(event) {
    console.log(event.rows);


    this.lowerbound = (event.page) * event.rows + 1;
    this.upperBound = this.lowerbound + event.rows - 1;

    this.getActivityList();

    console.log(event)
  }
  public addActivity() {
    this.router.navigateByUrl(`/create-activity`)



  }

  public deleteActivity(id) {
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
        this._apiservice.deleteActivity(JSON.stringify(obj)).subscribe(res => {
          console.log(res);
          Swal.fire('', res.message, 'success');
          //  this.getInquiryList();
          this.getActivityList();

        })

      } catch (error) {

      }}
    })
  }

  public editActivity(recordId, id) {
    console.log("ediy actuvity")
    sessionStorage.setItem('activityId', id);
    this.router.navigateByUrl(`/create-activity`)
    // this.router.navigateByUrl(`/create-activity/${recordId}/${+id}`)
  }


  ref: DynamicDialogRef;

  public activitypopup(id) {
    this._apiservice.popupRef = this.dialogService.open(CreateInquiryComponent, {
      header: 'Inquiry Details',
      width: '96%',
      contentStyle: { "overflow": "auto" },
      baseZIndex: 10000,
      styleClass: 'activityedit',
      data: { inquiryId: id }
    });

  }

  public ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
    console.log("destroy")
    sessionStorage.removeItem('inquiryId')
    sessionStorage.removeItem('clientName');

    this.filterData={
      callerName: this.callerName == null ? '' : this.callerName,
      callerPhone: this.phoneNumber == null ? '' : this.phoneNumber,
      clientName: this.clientName==null?'':this.clientName,
      recordId: this.recordId == null ? 0 : this.recordId,
      activityTypeId:this.activityTypeId==null?0:this.activityTypeId
    }
    sessionStorage.setItem('activityFilter',JSON.stringify(this.filterData))
  }

  public onDetailClick(data){
   this.detailsPopup=true;
   this.detailsData=data;
  }
}
