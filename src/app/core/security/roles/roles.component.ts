import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  // public customers;
  public dialogVisible: boolean = false;
  // public edit: boolean = false;
  // selectedValue;
  // public checked: boolean = false;
  // public checked1: boolean = false;
  public privilage: boolean = false;
  public roleName = '';

  public rolesList = [];
  public totalRecordCount = 10;
  public active = 3;
  public formError=false;

  public roleForm: FormGroup;
  constructor(private _apiservice: ApiService, private _fb: FormBuilder) {
    this._apiservice.SetheaderName('Roles');
  }
  ngOnInit(): void {

    this._apiservice.getdata().subscribe((res) => {
      this.rolesList = res;
    })
    this.createForm();
    this.getRolesList();
  }
  showDialog() {
    this.dialogVisible = true;
  }
  editRole() {
    // this.edit = true;
    // console.log(this.edit)
  }

  public createForm() {
    this.formError=false;
    this.roleForm = this._fb.group({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
      sortOrder: new FormControl(null),
      active: new FormControl(1),
      id: new FormControl(0),
    })
  }
 get formControls(){
   return this.roleForm.controls;
 }
  public getRole(id) {
    try {
      this._apiservice.getRole(id).subscribe(res => {
        console.log(res);
        this.roleForm = this._fb.group({
          name: new FormControl(res.name, Validators.required),
          description: new FormControl(res.description),
          sortOrder: new FormControl(res.sortOrder),
          active: new FormControl(res.active),
          id: new FormControl(res.id),
        })
      })
    } catch (error) {

    }
  }
  public createRole() {
    this.formError=true;
    if (this.roleForm.invalid) {
      Swal.fire('','Please fill all mandatory fields','warning')
    }else{
    let obj = {
      "name": this.roleForm.value.name == null ? "" : this.roleForm.value.name,
      "description": this.roleForm.value.description == null ? "" : this.roleForm.value.description,
      "sortOrder": this.roleForm.value.sortOrder == null ? "" : this.roleForm.value.sortOrder,
      "updatedUser": this._apiservice.userResponse.userId,
      "active":this.roleForm.value.active
        }
    try {
      this._apiservice.createRole(JSON.stringify(obj)).subscribe(res => {
        console.log(res);
      })
    } catch (error) {

    }}
  }

  public getRolesList() {
    try {
      let obj = { name: "", active: 1 }
      this._apiservice.getRolesList(JSON.stringify(obj)).subscribe(res => {
        console.log(res);
      })
    } catch (error) {

    }
  }
}
