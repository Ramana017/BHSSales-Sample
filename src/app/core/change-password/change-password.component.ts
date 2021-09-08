import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private _fb:FormBuilder,public apiService:ApiService,public dialogService: DialogService,public modelRef: DynamicDialogRef) { }

  public changePassswordForm:FormGroup;
  public formError:boolean=false;


  ngOnInit(): void {
    this.createForm();
  }
  public createForm(){
    this.changePassswordForm = this._fb.group({
      confirmPassword: new FormControl('', [Validators.required]),
      oldPassword: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),

    },
    // { validators: this.MatchPassword('password', 'confirmPassword') }
    )
  }
  get formvalidation(){
    return this.changePassswordForm.controls;
  }

  public onSubmit(){
    this.formError=true;
    if(this.changePassswordForm.valid){
    if(this.changePassswordForm.value.password==this.changePassswordForm.value.oldPassword){
      Swal.fire('Invalid', 'Old Password and New Password cannot be same', 'warning')

    }
    else if(this.changePassswordForm.value.password!=this.changePassswordForm.value.confirmPassword){
        Swal.fire('Invalid', 'New Password and Confirm Password should  match', 'warning')

      }else{
        let jsonObj={"loginId":this.apiService.userResponse.loginId ,"oldPassword":this.changePassswordForm.value.oldPassword,
       "newPassword":this.changePassswordForm.value.password};
        this.apiService.changePassword(jsonObj).subscribe(res=>{
          console.log(res);
          if(res.successFlag==1){
            Swal.fire('',res.message,'success');
            this.modelRef.destroy();
          }else{
            Swal.fire('',res.message,'error');
          }

        })
      }
    }else{
      Swal.fire('Invalid', 'Please fill all mandatory fields', 'warning')

    }
  }


  public MatchPassword(password: string, confirmPassword: string):object{
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }



}
