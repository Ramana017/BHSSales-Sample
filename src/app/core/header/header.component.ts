import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import Swal from 'sweetalert2';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { CreateInquiryComponent } from '../inquiry/create-inquiry/create-inquiry.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { AppService } from 'src/app/service/app.service';
declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private appService: AppService,public apiService: ApiService,private router:Router,public dialogService: DialogService) {
  }
  ngOnInit(): void {
  }
  // sidebar(){
  //   $(".navbar-toggler").click(function(){
  //     $(".layout-wrapper").toggleClass("layout-mobile-active")
  //   })
  // }

  onLogout(){
    Swal.fire({
      title: 'Are you sure you want to Logout?',
      // text: "you want to Logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        this.appService.setUserLoggedIn(false);
     this.router.navigateByUrl('/login')
      }
    })
  }
  ref: DynamicDialogRef;
  public aboutus(){
    const ref = this.dialogService.open(AboutUsComponent, {
      header: 'About',
      width: '45vw',
      contentStyle: { "overflow": "auto" },
      baseZIndex: 10000,
     footer:'Copyright © 2020, Aquila Software Inc.'
    });
  }
  public changePassword(){
    this. ref = this.dialogService.open(ChangePasswordComponent, {
      header: 'Change Password',
      width: '40vw',
      contentStyle: { "overflow": "auto" },
      baseZIndex: 10000,
    });
  }
}
