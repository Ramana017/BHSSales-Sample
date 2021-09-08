import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { AppService } from 'src/app/service/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public formError: boolean = false;

  constructor(private apiservice: ApiService,private appService:AppService ,private _fb: FormBuilder, private _router: Router) {
    if (apiservice.loggedIn()) {
      this._router.navigateByUrl('/inquiries')
    }
    this.apiservice.SetheaderName('Login');

  }



  ngOnInit(): void {
    this.loginForm = this._fb.group({
      loginId: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }


  get formcontrol() {
    return this.loginForm.controls;
  }
  public onsubmit() {
    this.formError = true;
    if (this.loginForm.valid) {
      this.apiservice.authenticateUser(this.loginForm.value).subscribe(res => {
        console.log(res);
        if(res.validateFlag!=1){
        this.apiservice.userResponse = res;
        if(res.userId==1){
          this.apiservice.referralPrivilageId = 1;
          this.apiservice.credentialingprivilageId=1;
        }else{
        res.privilegedArray.map(x => {
          if (x.objectName == 'credentialing') {
            this.apiservice.credentialingprivilageId = x.privilegeId;
          }
          if (x.objectName == "referral") {
            this.apiservice.referralPrivilageId = x.privilegeId;
          }
        })
      }
        sessionStorage.setItem('loggedInUser', JSON.stringify(res));
        this._router.navigateByUrl('/inquiries');
        this.appService.setUserLoggedIn(true);

        }
        else{
          Swal.fire(res.errorMsg,'','error');
        }
      })

    }

  }

}
