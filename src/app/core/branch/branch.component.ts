import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Paginator } from 'primeng/paginator';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
  @ViewChild('p', { static: false }) paginator: Paginator;

  public branchForm: FormGroup;
  public formError = false;
  public branchList = [];
  public totalRecordsCount = 0;
  public active = 2;
  public branchname = '';
  public lowerBound = 1;
  public upperBound = 20;
  public appliedBranchName = null;
  public appliedActive = null;

  public priviligeType ='';

    constructor(public _apiservice: ApiService, private _fb: FormBuilder) {
  this._apiservice.SetheaderName('Branch');
  this.priviligeType=this._apiservice.credentialingprivilageId==1?'admin':this._apiservice.credentialingprivilageId==2?'manage':this._apiservice.credentialingprivilageId==3?'modify':'view';
}
ngOnInit(): void {
  this.onGo();
  this.cretaForm();
}
showDialog() {
  // this.dialogVisible = true;
}


  public cretaForm() {
  this.formError = false;
  this.branchForm = this._fb.group({
    branchName: new FormControl(null, Validators.required),
    city: new FormControl(''),
    state: new FormControl(null),
    zip: new FormControl(''),
    phone: new FormControl(''),
    branchCode: new FormControl(null),
    id: new FormControl(0),
    active: new FormControl(true),
    sortOrder: new FormControl(null)

  })
}
get formcontrole() {
  return this.branchForm.controls;
}
  public editBranch() {

}
  public saveBranch() {
  this.formError = true;
  if (this._apiservice.referralPrivilageId == 1 || this._apiservice.referralPrivilageId == 2 || this._apiservice.referralPrivilageId == 3)

    if (this.branchForm.valid) {
      let obj = {
        branchName: this.branchForm.value.branchName,
        city: this.branchForm.value.city,
        state: this.branchForm.value.state == null ? 0 : this.branchForm.value.state,
        zipCode: this.branchForm.value.zip,
        phone: this.branchForm.value.phone.replace(/\D/g, ""),
        branchId: this.branchForm.value.id,
        branchCode: this.branchForm.value.branchCode != null ? this.branchForm.value.branchCode : '',
        active: this.branchForm.value.active ? 1 : 0,
        sortOrder: this.branchForm.value.sortOrder != null ? this.branchForm.value.sortOrder : ''
      }
      try {
        this._apiservice.saveBranch(JSON.stringify(obj)).subscribe(res => {
          console.log(res);
          Swal.fire('', res.message, 'success');
          this.cretaForm();
          this.getBranchList();

        })
      } catch (error) {

      }
    } else {
      Swal.fire('Invalid', 'Please fill all mandatory fields', 'warning')

    }
}

  public getBranchList() {
  try {
    let obj = { userId: this._apiservice.userResponse.userId, active: +this.active, branchName: this.appliedBranchName, lowerBound: this.lowerBound, upperBound: this.upperBound };
    this._apiservice.getBranchList(JSON.stringify(obj)).subscribe(res => {
      console.log(res);
      this.branchList = res.branchList;
      this.totalRecordsCount = res.totalRecordsCount;
    })
  } catch (error) {

  }
}
  public getBranchDetails(id) {
  try {
    this._apiservice.getBranchDetails(id).subscribe(res => {
      console.log(res);
      this.branchForm = this._fb.group({
        branchName: new FormControl(res.branchName, Validators.required),
        city: new FormControl(res.city ? res.city : ''),
        state: new FormControl(res.stateId ? res.stateId : null),
        zip: new FormControl(res.zip ? res.zip : ''),
        phone: new FormControl(res.phone ? res.phone.replace(/\D/g, "") : ''),
        branchCode: new FormControl(res.branchCode ? res.branchCode : ''),
        id: new FormControl(res.branchId),
        active: new FormControl(res.active == 1 ? true : false),
        sortOrder: new FormControl(res.sortOrder ? res.sortOrder : '')

      })

    })
  } catch (error) {

  }
}

  public onGo(event ?) {

  this.appliedActive = this.active;
  this.appliedBranchName = this.branchname != null ? this.branchname : '';
  event ? this.paginator.changePageToFirst(event) : '';
  this.getBranchList();

}
  public onPageChange(event) {
  console.log(event.rows);


  this.lowerBound = (event.page) * event.rows + 1;
  this.upperBound = this.lowerBound + event.rows - 1;

  this.getBranchList();

  console.log(event)
}



}
