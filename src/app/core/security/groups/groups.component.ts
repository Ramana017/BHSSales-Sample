import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  public customers;
  public dialogVisible: boolean = false;
  public edit: boolean = false;
  selectedValue;
  public checked: boolean = false;
  public checked1: boolean = false;
  public privilage: boolean = false;
  public list2: any;

  public groupForm: FormGroup;
  public formError = false;
  public active=1;
  public name='';
  public groupList=[];
  public totalRecordCount=10;



  constructor(private _apiservice: ApiService, private _fb: FormBuilder) {
    this._apiservice.SetheaderName('Groups');
  }
  ngOnInit(): void {
    this.GetGroupsList();
    this._apiservice.getdata().subscribe((res) => {
      this.customers = res;
    })
    this.list2 = [];
    this.createForm()
  }
  showDialog() {
    this.dialogVisible = true;
  }
  editRole() {
    this.edit = true;
    console.log(this.edit)
  }
  public createForm() {
    this.formError = false;
    this.groupForm = this._fb.group({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(''),
      sortOrder: new FormControl(''),
      active: new FormControl(1),
      email: new FormControl(''),
      id: new FormControl(0),
    })
  }
  get formControls() {
    return this.groupForm.controls;
  }

  public createGroup() {
    this.formError = true;
    if (this.groupForm.valid) {
      try {
        let obj = {
          "name": this.groupForm.value.name,
          "description": this.groupForm.value.description,
          "email": this.groupForm.value.email,
          "sortOrder": this.groupForm.value.sortOrder,
          "updatedUser": this._apiservice.userResponse.userId
        }
        this._apiservice.createGroup(JSON.stringify(obj)).subscribe(res => {
          console.log(res);
        })
      } catch (error) {

      }
    }
    else {
      Swal.fire('', 'Please fill all mandatory fields', 'warning')

    }
  }
  public getGroup(id) {
    try {
      this._apiservice.getGroup(id).subscribe(res => {
        console.log(res);
      })
    } catch (error) {

    }
  }

  public GetGroupsList(){
    let obj={name:this.name,active:this.active}

    try {
      this._apiservice.GetGroupsList(JSON.stringify(obj)).subscribe(res=>{
        console.log(res);
      })
    } catch (error) {

    }
  }


}
