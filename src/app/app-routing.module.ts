import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { GroupsComponent } from './core/security/groups/groups.component';
import { RolesComponent } from './core/security/roles/roles.component';
import { SecuritySettingsComponent } from './core/security/security-settings/security-settings.component';
import { UsersComponent } from './core/security/users/users.component';
import { InquiryComponent } from './core/inquiry/inquiry.component';
import { CreateInquiryComponent } from './core/inquiry/create-inquiry/create-inquiry.component';
import { CreateActivityComponent } from './core/activity/create-activity/create-activity.component';
import { ActivityComponent } from './core/activity/activity.component';
import { BranchComponent } from './core/branch/branch.component';
import { FundingCategoryComponent } from './core/folder/funding-category/funding-category.component';
import { ActivitybyInquiryComponent } from './core/activity/activityby-inquiry/activityby-inquiry.component';
import { AuthGuard } from './service/auth.guard';
import { LogDataComponent } from './core/log-data/log-data.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  // {path:"roles",component:RolesComponent},
  // {path:"groups",component:GroupsComponent},
  // {path:"users",component:UsersComponent},
  // {path:"security-settings",component:SecuritySettingsComponent},
  {path:"inquiries", canActivate: [AuthGuard], component:InquiryComponent},
  {path:"create-inquiry",canActivate: [AuthGuard],component:CreateInquiryComponent},
  {path:"create-inquiry/:id",canActivate: [AuthGuard],component:CreateInquiryComponent},
  {path:"create-activity",canActivate: [AuthGuard],component:CreateActivityComponent},
  // {path:"create-activity/:inquiryId/:activityd",component:CreateActivityComponent},
  // {path:"create-activity/:inquiryId",component:CreateActivityComponent},
  {path:"activity",canActivate: [AuthGuard],component:ActivitybyInquiryComponent},
  {path:"Activity",canActivate: [AuthGuard],component:ActivityComponent},

  // {path:"activity/:id/:clientName",component:ActivityComponent},

  {path:"branch",canActivate: [AuthGuard],component:BranchComponent},
  {path:"logData",component:LogDataComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
