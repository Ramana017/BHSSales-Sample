import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-funding-category',
  templateUrl: './funding-category.component.html',
  styleUrls: ['./funding-category.component.scss']
})
export class FundingCategoryComponent implements OnInit {

  public customers;
  public dialogVisible: boolean = false;
  public edit: boolean = false;
  selectedValue;
  public checked:boolean = false;
  public  checked1: boolean = false;
  public privilage:boolean = false;
  public list2:any;
  constructor(private _apiservice: ApiService) {
    this._apiservice.SetheaderName('Funding Category');
  }
  ngOnInit(): void {
    this._apiservice.getdata().subscribe((res) => {
      this.customers = res;
    })
    this.list2 = [];
  }
  showDialog() {
    this.dialogVisible = true;
  }
  editRole() {
    this.edit = true;
    console.log(this.edit)
  }

}
