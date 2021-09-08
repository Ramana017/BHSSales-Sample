import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchAll } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public referralPrivilageId = null;
  public credentialingprivilageId = null;
  public popupRef: DynamicDialogRef;
  public userResponse: any;
  public headerName: string = null;
  public lookupresponse: any;
  private _apiurl: string = "https://jsonplaceholder.typicode.com/posts";
  constructor(private http: HttpClient) {
    console.log('api service')
    this.userResponse = JSON.parse(sessionStorage.getItem('loggedInUser'))

    if (this.userResponse !== undefined && this.userResponse != null) {
      if (this.userResponse.userId == 1) {
        this.referralPrivilageId = 1;
        this.credentialingprivilageId = 1;
      } else {
        this.userResponse.privilegedArray.map(x => {
          if (x.objectName == 'credentialing') {
            this.credentialingprivilageId = x.privilegeId;
          }
          if (x.objectName == "referral") {
            this.referralPrivilageId = x.privilegeId;
          }
        })
      }
    }

  }
  public SetheaderName(value: string) {
    this.headerName = value;
  }

  public getlookup() {
    this.getLookupsData().subscribe(res => {
      this.lookupresponse = res;
    })

  }
  public getInquiresLokkup() {
    this.getInquires(JSON.stringify({ "userId": this.userResponse.userId, "lowerBound": 0, "upperBound": 0 })).subscribe(res => {
      this.inquiriesLookUp = res.inquiryList;
    })
  }
  getdata(): Observable<any> {
    return this.http.get<any>(`${this._apiurl}`);
  }
  public inquiriesLookUp = [];


  public authenticateUser(jsondata: string): Observable<any> {
    return this.http.post("/ssoapi/authenticateUser", jsondata, httpOptions).pipe(catchError(this.errorHandler));
  }
  public changePassword(jsondata): Observable<any> {
    return this.http.post("/ssoapi/changePassword", jsondata, httpOptions).pipe(catchError(this.errorHandler));
  }

  public getRole(id): Observable<any> {
    return this.http.get(`/securityapi/getRole?id=${id}`).pipe(catchError(this.errorHandler));
  }
  public createRole(obj): Observable<any> {
    return this.http.post(`/securityapi/createRole`, obj, httpOptions).pipe(catchError(this.errorHandler));
  }
  public getRolesList(obj): Observable<any> {
    return this.http.get(`/securityapi/getRolesList?role=${obj}`).pipe(catchError(this.errorHandler))
  }
  public createGroup(obj): Observable<any> {
    return this.http.post(`/securityapi/createGroup`, obj, httpOptions).pipe(catchError(this.errorHandler));
  }
  public GetGroupsList(obj): Observable<any> {
    return this.http.get(`/securityapi/getGroupsList?jsonObj=${obj}`).pipe(catchError(this.errorHandler))
  }
  public getGroup(id) {
    return this.http.get(`/securityapi/getGroup?id=${id}`).pipe(catchError(this.errorHandler))
  }

  public getLookupsData(): Observable<any> {
    return this.http.get(`/common/getLookupsData?lookupNames=program,funding_category,referral_category,relationship_to_client,activity_type,non_conversion_reason,hold_reason,state,status,gender,branch,users,requested_services`)
  }
  public getInquiryList(obj): Observable<any> {
    return this.http.get(`/referral/getInquiryList?jsonObj=${obj}`).pipe(catchError(this.errorHandler));
  }
  public getInquires(obj): Observable<any> {
    return this.http.get(`/referral/getInquiries?jsonObj=${obj}`).pipe(catchError(this.errorHandler));

  }
  public getInquiryDetails(obj): Observable<any> {
    return this.http.get(`/referral/getInquiryDetails?jsonObj=${obj}`).pipe(catchError(this.errorHandler));
  }

  public saveInquiry(obj): Observable<any> {
    return this.http.post(`/referral/saveInquiry`, obj, httpOptions).pipe(catchError(this.errorHandler));
  }

  public deleteInquiry(obj): Observable<any> {
    return this.http.get(`/referral/deleteInquiry?jsonObj=${obj}`).pipe(catchError(this.errorHandler));
  }

  public saveBranch(obj): Observable<any> {
    return this.http.post(`/referral/saveBranch`, obj, httpOptions).pipe(catchError(this.errorHandler));

  }
  public getBranchList(obj): Observable<any> {
    return this.http.get(`/referral/getBranchList?jsonObj=${obj}`).pipe(catchError(this.errorHandler));
  }
  public getBranchDetails(id): Observable<any> {
    return this.http.get(`/referral/getBranchDetails?jsonObj={branchId:${id}}`).pipe(catchError(this.errorHandler));
  }

  public getActivityList(obj): Observable<any> {
    return this.http.get(`/referral/getActivityList?jsonObj=${obj}`).pipe(catchError(this.errorHandler));
  }

  public getActivityDetails(obj): Observable<any> {
    return this.http.get(`/referral/getActivityDetails?jsonObj=${obj}`).pipe(catchError(this.errorHandler));
  }
  public saveActivity(obj): Observable<any> {
    return this.http.post(`/referral/saveActivity`, obj, httpOptions).pipe(catchError(this.errorHandler));

  }
  public deleteActivity(obj): Observable<any> {
    return this.http.get(`/referral/deleteActivity?jsonObj=${obj}`).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse) {
    console.log("error in API service", error);
    Swal.fire({
      title: error.status,
      html: error.message,
      icon: 'error'
    })
    return throwError(error);
  }

  public loggedIn(): boolean {
    return !!sessionStorage.getItem('loggedInUser');
  }
}

export const httpOptions = {
  headers: new HttpHeaders({
    // 'Content-Type': 'application/json'
    'Content-Type': 'text/plain',

  }),

};
