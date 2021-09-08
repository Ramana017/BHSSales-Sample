import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiService } from 'src/app/service/api.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-inquiry',
  templateUrl: './create-inquiry.component.html',
  styleUrls: ['./create-inquiry.component.scss'],
  providers: [DialogService]
})
export class CreateInquiryComponent implements OnInit {

  public inquiryDateFlag:boolean=false;
  public inquiryForm: FormGroup;
  public formError: boolean = false;
  public recordId: number = 0;
  public createFlag=false;
  // public lookupresponse: any;
  public submitted: boolean = true;
  constructor(public _apiservice: ApiService, public dialogService: DialogService, private router: Router, private config: DynamicDialogConfig,
    private _fb: FormBuilder, private datePipe: DatePipe, private activatedRoute: ActivatedRoute,) {
    this.createForm();
        if (config.data != undefined) {
      this.recordId = +this.config.data.inquiryId;
      console.log(this.recordId)
      this.getInquiryDetails();
     this.inquiryDateFlag=this._apiservice.referralPrivilageId==1?false:true;

    } else
      if (sessionStorage.getItem('inquiryId') != undefined) {
        this.recordId = +sessionStorage.getItem('inquiryId')
        console.log(this.recordId)
        this.getInquiryDetails();
        this._apiservice.SetheaderName('Edit Inquiry');
        this.inquiryDateFlag=this._apiservice.referralPrivilageId==1?false:true;

      } else {
        this._apiservice.SetheaderName('Create Inquiry');
        if(this._apiservice.referralPrivilageId==1||this._apiservice.referralPrivilageId==2){

        }else{
          this.router.navigateByUrl('/inquiries')
        }

      }
  }
  public obj = {
    "verifiedPoc": 1,
    "gender": 1,
    "city": 1,
    "program": 1,
    "relationshipToClient": 1,
    "branch": 1,
    "billPostDate": 1,
    "callerName": "test",
    "verifiedInteractant": 1,
    "state": 1,
    "zip": 1,
    "clientLastName": 1,
    "referralCategory": 1,
    "address": 1,
    "clientEmail": 1,
    "fundingCategory": 1,
    "alternatePhone": 9000012389,
    "branchEmail": "abc@email.com",
    "birthDate": 1,
    "callerEmail": 1,
    "inquiryDate": "07/19/2021",
    "phone": 9000012367,
    "clientFirstName": 1,
    "callerPhone": 9000012345,
    "socDate": 1,
    "status": 1
  }
  ngOnInit(): void {
    this.dialogService
    // this.getLookupsData();
    // this.createForm();
  }
  public createForm() {
    this.formError = false;
    this.inquiryForm = this._fb.group({
      inquiryDate: new FormControl(null, Validators.required),
      program: new FormControl(null, Validators.required),
      branch: new FormControl(null, Validators.required),
      branchEmail: new FormControl(''),
      fundingCategory: new FormControl(null, Validators.required),
      referralCategory: new FormControl(null, Validators.required),
      callerName: new FormControl(null, Validators.required),
      callerPhone: new FormControl(null, Validators.required),
      relationshipToClient: new FormControl(null),
      callerEmail: new FormControl(''),
      socDate: new FormControl(null),
      verifiedPoc: new FormControl(false),
      verifiedInteractant: new FormControl(false),
      billPostDate: new FormControl(null),
      status: new FormControl(null),
      clientLastName: new FormControl(null),
      clientEmail: new FormControl(''),
      clientFirstName: new FormControl(null),
      phone: new FormControl(''),
      address: new FormControl(''),
      alternatePhone: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(null),
      zip: new FormControl(null),
      gender: new FormControl(null),
      birthDate: new FormControl(null),
      id: new FormControl(this.recordId),
      requestedServices:new FormControl([])

    })


  }
  get formControls() {
    return this.inquiryForm.controls;
  }
  // public getLookupsData() {
  //   try {
  //     this._apiservice.getLookupsData().subscribe(res => {
  //       console.log(res);
  //       this.lookupresponse = res;
  //     })
  //   } catch (error) {

  //   }
  // }
  public getInquiryDetails() {
    let obj = { recordId: this.recordId }
    try {
      this._apiservice.getInquiryDetails(JSON.stringify(obj)).subscribe(res => {
        console.log(res);
        this.editForm(res)
      })

    } catch (error) {

    }
  }

  public editForm(res) {
    this.inquiryForm = this._fb.group({
      inquiryDate: new FormControl(new Date(res.inquiryDate), Validators.required),
      program: new FormControl(res.program, Validators.required),
      branch: new FormControl(res.branch ? res.branch : null),
      branchEmail: new FormControl(res.branchEmail ? res.branchEmail : ''),
      fundingCategory: new FormControl(res.fundingCategory, Validators.required),
      referralCategory: new FormControl(res.referralCategory, Validators.required),
      callerName: new FormControl(res.callerName, Validators.required),
      callerPhone: new FormControl(res.callerPhone.replace(/\D/g,""), Validators.required),
      relationshipToClient: new FormControl(res.relationshipToClient ? res.relationshipToClient : null),
      callerEmail: new FormControl(res.callerEmail ? res.callerEmail : ''),
      socDate: new FormControl(res.socDate ? res.socDate : null),
      verifiedPoc: new FormControl(res.verifiedPoc == 1 ? true : false),
      verifiedInteractant: new FormControl(res.verifiedInteractant == 1 ? true : false),
      billPostDate: new FormControl(res.billPostDate ? res.billPostDate : null),
      status: new FormControl(res.status ? res.status : null),
      clientLastName: new FormControl(res.clientLastName ? res.clientLastName : null),
      clientEmail: new FormControl(res.clientEmail ? res.clientEmail : ''),
      clientFirstName: new FormControl(res.clientFirstName),
      phone: new FormControl(res.phone ? res.phone.replace(/\D/g,"") : ''),
      address: new FormControl(res.address ? res.address : ''),
      alternatePhone: new FormControl(res.alternatePhone ? res.alternatePhone.replace(/\D/g,"") : ''),
      city: new FormControl(res.city ? res.city : ''),
      state: new FormControl(res.state ? res.state : null),
      zip: new FormControl(res.zipCode ? res.zipCode : null),
      gender: new FormControl(res.gender ? res.gender : null),
      birthDate: new FormControl(res.birthDate ?new Date(res.birthDate) : null),
      id: new FormControl(this.recordId),
      requestedServices:new FormControl(res.requestedServices?res.requestedServices.split(',').map(x=>+x):[])
    })
  }

  public saveInquiry() {
    this.formError = true;
    if (this.inquiryForm.valid) {
      console.log(this.inquiryForm.value, (this.inquiryForm.value))
      let obj = {
        userId: this._apiservice.userResponse.userId,
        inquiryDate: this.datePipe.transform(this.inquiryForm.value.inquiryDate, 'MM/dd/yyyy'),
        programId: this.inquiryForm.value.program == null ? 0 : this.inquiryForm.value.program,
        branchId: this.inquiryForm.value.branch == null ? 0 : this.inquiryForm.value.branch,
        branchEmail: this.inquiryForm.value.branchEmail,
        fundingCategoryId: this.inquiryForm.value.fundingCategory == null ? 0 : this.inquiryForm.value.fundingCategory,
        referralCategoryId: this.inquiryForm.value.referralCategory == null ? 0 : this.inquiryForm.value.referralCategory,
        callerName: this.inquiryForm.value.callerName,
        callerPhone: this.inquiryForm.value.callerPhone.replace(/\D/g,""),
        relationshipToClientId: this.inquiryForm.value.relationshipToClient == null ? 0 : this.inquiryForm.value.relationshipToClient,
        callerEmail: this.inquiryForm.value.callerEmail,
        socDate: this.inquiryForm.value.socDate == null ? "" : this.datePipe.transform(this.inquiryForm.value.socDate, 'MM/dd/yyyy'),
        verifiedPoc: this.inquiryForm.value.verifiedPoc == true ? 1 : 0,
        verifiedInteractant: this.inquiryForm.value.verifiedInteractant == true ? 1 : 0,
        billPostDate: this.inquiryForm.value.billPostDate == null ? "" : this.datePipe.transform(this.inquiryForm.value.billPostDate, 'MM/dd/yyyy'),
        statusId: this.inquiryForm.value.status == null ? 0 : this.inquiryForm.value.status,
        clientLastName: this.inquiryForm.value.clientLastName == null ? '' : this.inquiryForm.value.clientLastName,
        clientEmail: this.inquiryForm.value.clientEmail,
        clientFirstName: this.inquiryForm.value.clientFirstName == null ? '' : this.inquiryForm.value.clientFirstName,
        phone: this.inquiryForm.value.phone.replace(/\D/g,""),
        address: this.inquiryForm.value.address,
        alternatePhone: this.inquiryForm.value.alternatePhone.replace(/\D/g,""),
        city: this.inquiryForm.value.city,
        stateId: this.inquiryForm.value.state == null ? 0 : this.inquiryForm.value.state,
        zipCode: this.inquiryForm.value.zip == null ? "" : this.inquiryForm.value.zip,
        gender: this.inquiryForm.value.gender == null ? 0 : this.inquiryForm.value.gender,
        birthDate: this.inquiryForm.value.birthDate == null ? "" : this.datePipe.transform(this.inquiryForm.value.birthDate, 'MM/dd/yyyy'),
        recordId: this.recordId,
        requestedServices:this.inquiryForm.value.requestedServices.toString()

      }

      console.log(obj, JSON.stringify(obj))
      try {
        this._apiservice.saveInquiry(obj).subscribe(res => {
          console.log(res);
          Swal.fire('', res.message, 'success');
          this.recordId = 0;
          if (this.config.data != undefined) {
            this._apiservice.popupRef?.close();
          } else {
            this._apiservice.SetheaderName('Create Inquiry');
            this.router.navigateByUrl('/inquiries')
            sessionStorage.removeItem('inquiryId');
          }
          this.createForm()
        })

      } catch (error) {

      }
    } else {
      Swal.fire('Invalid', 'Please fill all mandatory fields', 'warning')
    }
  }
public newActivity(){
  if (this.config.data != undefined) {
    this._apiservice.popupRef?.close();
  }
    this.router.navigateByUrl('/create-activity')

}
  ngOnDestroy() {
    // sessionStorage.removeItem('inquiryId');
  }

  public onClose() {
    if (this.config.data != undefined) {
      this._apiservice.popupRef?.close();
    } else {
      this.router.navigateByUrl('/inquiries')
    }
  }

}
