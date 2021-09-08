import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/login/login.component';
import { PrimeNgModule } from './shared/prime-ng/prime-ng.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from './core/header/header.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { ApiService } from './service/api.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RolesComponent } from './core/security/roles/roles.component';
import { GroupsComponent } from './core/security/groups/groups.component';
import { UsersComponent } from './core/security/users/users.component';
import { SecuritySettingsComponent } from './core/security/security-settings/security-settings.component';
import { InquiryComponent } from './core/inquiry/inquiry.component';
import { CreateInquiryComponent } from './core/inquiry/create-inquiry/create-inquiry.component';
import { ActivityComponent } from './core/activity/activity.component';
import { CreateActivityComponent } from './core/activity/create-activity/create-activity.component';
import { BranchComponent } from './core/branch/branch.component';
import { FundingCategoryComponent } from './core/folder/funding-category/funding-category.component';
import { ReferralCategoryComponent } from './core/folder/referral-category/referral-category.component';
import { DatePipe } from '@angular/common';
import { HttpInterceptorService } from './service/http-interceptor.service';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
import { ActivitybyInquiryComponent } from './core/activity/activityby-inquiry/activityby-inquiry.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { OrderModule } from 'ngx-order-pipe';
import { AboutUsComponent } from './core/about-us/about-us.component';
import { ChangePasswordComponent } from './core/change-password/change-password.component';
import { LogDataComponent } from './core/log-data/log-data.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
    RolesComponent,
    GroupsComponent,
    UsersComponent,
    SecuritySettingsComponent,
    InquiryComponent,
    CreateInquiryComponent,
    ActivityComponent,
    CreateActivityComponent,
    BranchComponent,
    FundingCategoryComponent,
    ReferralCategoryComponent,
    ActivitybyInquiryComponent,
    AboutUsComponent,
    ChangePasswordComponent,
    LogDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNgModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgIdleKeepaliveModule.forRoot(),
    ModalModule.forRoot(),
    OrderModule
  ],
  providers: [ApiService,DatePipe, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
