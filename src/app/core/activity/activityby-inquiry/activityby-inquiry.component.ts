import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Paginator } from 'primeng/paginator';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';
import { CreateInquiryComponent } from '../../inquiry/create-inquiry/create-inquiry.component';

@Component({
  selector: 'app-activityby-inquiry',
  templateUrl: './activityby-inquiry.component.html',
  styleUrls: ['./activityby-inquiry.component.scss']
})
export class ActivitybyInquiryComponent implements OnInit, OnDestroy {
  @ViewChild('p', { static: false }) paginator: Paginator;
  totalRecordsCount = 0;
  public recordId = null;
  // public pagination=false;
  public branchId = null;
  public activityList = [];


  private activityListTemp = []
  // public lookupresponse:any;

  public clientName = '';

  constructor(public _apiservice: ApiService, private router: Router, private activatedRoute: ActivatedRoute, public dialogService: DialogService) {
    this._apiservice.inquiriesLookUp.length == 0 ? this._apiservice.getInquiresLokkup() : '';
    this._apiservice.SetheaderName('Activities');
    if (sessionStorage.getItem('inquiryId') != undefined) {
      this.recordId = +sessionStorage.getItem('inquiryId')
      this.clientName =sessionStorage.getItem('clientName')!=undefined?sessionStorage.getItem('clientName'):'';
      console.log(this.recordId);

    } else {
      this.router.navigateByUrl('/Activity')
    }

  }
  ngOnInit(): void {

    this.getActivityList();
  }
  public getActivityList() {
    try {
      let obj = { "recordId": this.recordId == null ? 0 : this.recordId, clientName: this.clientName, lowerBound: 0, upperBound: 0 }
      this._apiservice.getActivityList(JSON.stringify(obj)).subscribe(res => {
        console.log(res)
        this.activityList = res.activityList;
        this.activityListTemp = res.activityList;

        this.totalRecordsCount = res.totalRecordsCount;
      })

    } catch (error) {

    }

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
          this.onSort(this.order,this.orderBy);

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
 public orderBy="asc";
 public order="activityDate";
 public activeAsc=true;
 public startTime=true;
 public complated=true;
  public onSort(type, flag) {
    this.order=type;
    this.orderBy=flag;
    if (flag == "asc") {
      console.log("####")
     this.activityList= this.activityList.sort((a, b) => {
        if(a[`${type}`] > b[`${type}`]){
        return -1;
        }
        else{
          return 1
        }
      })
    }
    else {
      this.activityList= this.activityList.sort((a, b) => {
        if(a[`${type}`] < b[`${type}`]){
        return -1;
        }
        else{
          return 1
        }
      })
    }
  }

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
    console.log("destroy")
    // sessionStorage.removeItem('clientName');
    // sessionStorage.removeItem('inquiryId');



  }
  public detailsPopup:boolean=false;
  public detailsData='';
  public onDetailClick(data){
    this.detailsPopup=true;
    this.detailsData=data;
   }
}
