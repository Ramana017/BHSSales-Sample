import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-security-settings',
  templateUrl: './security-settings.component.html',
  styleUrls: ['./security-settings.component.scss']
})
export class SecuritySettingsComponent implements OnInit {

  constructor(private _apiservice: ApiService) {
    this._apiservice.SetheaderName('Security Settings');
  }
  ngOnInit(): void {
  }

}
