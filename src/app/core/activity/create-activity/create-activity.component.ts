import { DatePipe } from '@angular/common';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { multicast } from 'rxjs/operators';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-activity',
  templateUrl: './create-activity.component.html',
  styleUrls: ['./create-activity.component.scss']
})
export class CreateActivityComponent implements OnInit,OnDestroy {
  public activityForm: FormGroup;
  public inquiryId = null;
  // public lookupResponse:any;
  public formError = false;
  public activityId = 0;
  constructor(public router: Router, public _apiservice: ApiService, private date: DatePipe, private _fb: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.createForm();
    this._apiservice.getInquiresLokkup();
    if (sessionStorage.getItem('inquiryId') != undefined) {
      this.inquiryId = +sessionStorage.getItem('inquiryId');

      this.onInquirySelect({value:this.inquiryId});
      let name=sessionStorage.getItem('clientName') != undefined?sessionStorage.getItem('clientName'):''
      this.activityForm.get('inquiryClientName').setValue(name);

    }

    if (sessionStorage.getItem('activityId')!= undefined) {
      this.activityId = +(sessionStorage.getItem('activityId'));
      console.log(this.activityId)
      this.getActivityDetails(this.activityId)
      this._apiservice.SetheaderName('Edit Activity');
    } else {
      this._apiservice.SetheaderName('Add Activity');
      if(this._apiservice.referralPrivilageId==1||this._apiservice.referralPrivilageId==2){

      }else{
        this.router.navigateByUrl('/Activity')
      }

    }

  }
  ngOnInit(): void {
    // this.getLookups();
  }
  public createForm() {
    this.formError = false;
    this.activityForm = this._fb.group({
      activityId: new FormControl(0),
      inquiryClientName: new FormControl(null),
      activityTypeId: new FormControl(null),
      hold: new FormControl(null),
      nonConversionReasonId: new FormControl(null),
      date: new FormControl(null),
      detail: new FormControl(''),
      assignedTo: new FormControl(null),
      createdBy: new FormControl(this._apiservice.userResponse?.userId),
      inquiryId: new FormControl(this.inquiryId, Validators.required)
    })
  }
  get formControls() {
    return this.activityForm.controls;
  }

  public saveActivity() {
    this.formError = true;
    if (this.activityForm.valid) {
      try {
        let obj =
        {
          "userId": this._apiservice.userResponse.userId,
          "inquiryId": this.activityForm.value.inquiryId,
          "activityId": this.activityForm.value.activityId,
          "activityTypeId": this.activityForm.value.activityTypeId == null ? 0 : this.activityForm.value.activityTypeId,
          "holdReasonId": this.activityForm.value.hold == null || this.activityForm.value.activityTypeId != 4 ? 0 : this.activityForm.value.hold,
          "nonConversionReasonId": this.activityForm.value.nonConversionReasonId == null || this.activityForm.value.activityTypeId != 6 ? 0 : this.activityForm.value.nonConversionReasonId,
          "activityDate": this.activityForm.value.date != null ? this.date.transform(this.activityForm.value.date, 'MM/dd/yyyy') : '',
          "details": this.activityForm.value.detail,
          "assignedTo": this.activityForm.value.assignedTo == null ? 0 : this.activityForm.value.assignedTo,
          "createdBy": this.activityForm.value.createdBy == null ? 0 : this.activityForm.value.createdBy
        }
        this._apiservice.saveActivity(JSON.stringify(obj)).subscribe(res => {
          console.log(res)
          Swal.fire('', res.message, 'success');
          this._apiservice.SetheaderName('Add Activity');
          sessionStorage.removeItem('activityId')
          this.router.navigateByUrl('activity');

          // this.createForm();
        })
      } catch (error) {

      }
    } else {
      Swal.fire('Invalid', 'Please fill all mandatory fields', 'warning')

    }
  }

  public getActivityDetails(id) {
    let obj = { "activityId": id }
    try {
      this._apiservice.getActivityDetails(JSON.stringify(obj)).subscribe(res => {
        console.log(res);
        this.editForm(res);
      })
    } catch (error) {

    }
  }
  public editForm(obj) {
    this.activityForm = this._fb.group({
      activityId: new FormControl(obj.activityId),
      inquiryClientName: new FormControl(obj.inquiryClientName),
      activityTypeId: new FormControl(obj.activityTypeId),
      hold: new FormControl(obj.holdReasonId),
      nonConversionReasonId: new FormControl(obj.nonConversionReasonId),
      date: new FormControl(obj?.activityDate),
      detail: new FormControl(obj.details?obj.details:''),
      assignedTo: new FormControl(obj.assignedTo),
      createdBy: new FormControl(obj.createdBy),
      inquiryId: new FormControl(obj.recordId),
    })
  }



  public onInquirySelect(event) {
    this.activityForm.get('inquiryId').setValue(event.value)
    console.log(event.value)
    for (let i = 0; i < this._apiservice.inquiriesLookUp.length; i++) {
      if (this._apiservice.inquiriesLookUp[i]?.recordId == event.value) {
        this.activityForm.get('inquiryClientName').setValue(this._apiservice.inquiriesLookUp[i]?.clientName)

      }
    }
  }
  public  ngOnDestroy(){
  //   console.log("destroy")
  //  if()
  //  sessionStorage.removeItem('inquiryId')
  //  sessionStorage.removeItem('clientName');
   sessionStorage.removeItem('activityId')

   }
}
