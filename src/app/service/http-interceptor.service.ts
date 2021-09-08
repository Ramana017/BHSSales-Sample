import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize, tap } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  public count = 0;
  public baseUrl = null;
  constructor(public spinner: NgxSpinnerService, private router: Router, public apiservice: ApiService) {
    console.log("Interceptor working")
    this.seturl()
  }
  seturl() {
    this.baseUrl = localStorage.getItem('webserviceURL');
    // this.baseUrl="http://poc.aquilasoftware.com/bhssales/";
    console.log(this.baseUrl)


  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();

    this.count++;
    // console.log(req);
    var apireq: HttpRequest<any>
    if (req.url.startsWith('https://jsonplaceholder')) {
      apireq = req;
    }
    else if (req.url.startsWith('assets/url.json')) {
      apireq = req;
    }
    else {
      if(this.baseUrl==null){
        this.baseUrl = localStorage.getItem('webserviceURL');
      apireq = req.clone({ url: `${this.baseUrl}${req.url}`})
      }else{
      apireq = req.clone({ url: `${this.baseUrl}${req.url}`})

      }
    }

    return next.handle(apireq)
      .pipe(tap(
        event => {
          //console.log(event),
        },
        error => {
          console.log(error)
        }
      ), finalize(() => {
        this.count--;
        // console.log("onresponse",this.count)
        if (this.count === 0) {
          // console.log("closing")
          this.spinner.hide();
        }
        else {
          this.spinner.show();
        }
      })
      );
  }

}
