import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-log-data',
  templateUrl: './log-data.component.html',
  styleUrls: ['./log-data.component.scss']
})
export class LogDataComponent implements OnInit {
  item = [{
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },];
  array=[1,2,3,4,5,5,5,5,5,5,5,5,5]

  constructor(public apiService:ApiService) {
    // this.apiService.SetheaderName('Logs Data')
   }

  ngOnInit(): void {
  }

}
