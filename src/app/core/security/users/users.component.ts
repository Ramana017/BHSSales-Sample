import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public userList=[];
  public totalReocrdCount=0;

  tabIndex: number = 0;
  public dialogVisible: boolean = false;
  public edit: boolean = false;
  selectedValue;
  public checked:boolean = false;
  public  checked1: boolean = false;
  public privilage:boolean = false;
  public list2=[];
  public displayBasic:boolean = false;
  constructor(private _apiservice: ApiService) {
    this._apiservice.SetheaderName('Users');
  }
  ngOnInit(): void {
    this._apiservice.getdata().subscribe((res) => {
      this.userList = res;
    })
  }
  showDialog() {
    this.dialogVisible = true;
  }
  editRole() {
    this.edit = true;
    console.log(this.edit)
  }
next(){
  this.tabIndex=1;
}
prev(){
  this.tabIndex=0;
}
showBasicDialog() {
  this.displayBasic = true;
}
}
