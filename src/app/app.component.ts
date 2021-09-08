import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from './service/api.service';
import { AppService } from './service/app.service';
import { HttpInterceptorService } from './service/http-interceptor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('template') template;
  childModal2: TemplateRef<any>
  public idleState = 'Not started.';
  public timedOut = false;
  public lastPing?: Date = null;
  public bsmodelRef: BsModalRef;
  public timePopupexist: boolean = false;
  public urlExist=false;
  constructor( private appService: AppService,private keepalive: Keepalive, private idle: Idle,private router:Router,private modalService: BsModalService,
    public apiService:ApiService,public http: HttpClient, public interceptorService: HttpInterceptorService) {
    // console.log("App component")
    let url=localStorage.getItem("webserviceURL");
    // console.log("app.compenent.ts", localStorage.getItem('sessionTimeOut'))

    // idle.setIdle(15*60);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.

    // idle.setTimeout(10);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.timePopupexist = true;
      this.idleState = 'No longer idle.'
      console.log(this.idleState);
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      // this.childModal.hide();
      // this.bsmodelRef?.hide();
      this.idleState = 'Session expired!';
      this.timedOut = true;
      console.log(this.idleState);
      sessionStorage.clear();

      setTimeout(() => {
        console.log("Hello from setTimeout");
        // this.modalService._hideModal(1);
        this.modalService.hide(1)
        this.router.navigateByUrl('login');
        this.appService.setUserLoggedIn(false);

        window.location.reload();

      }, 100);
    });

    idle.onIdleStart.subscribe(() => {
      console.log("popupflag", this.timePopupexist)
      this.idleState = 'You\'ve gone idle!'
      console.log(this.idleState);
      // this.childModal.show();
      this.timePopupexist ? this.bsmodelRef.hide() : ''
      this.bsmodelRef = this.modalService.show(
        this.template,
        Object.assign({}, { class: 'timepopup' })
      );
      this.timePopupexist = true;
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You session will expire in ' + countdown + ' seconds! '
      console.log(this.idleState);
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.appService.getUserLoggedIn().subscribe(userLoggedIn => {
      if (userLoggedIn) {
        idle.watch()
        this.timedOut = false;
      } else {
        idle.stop();
      }
    })
    if(url!=undefined && url!=null){
      this.urlExist=true;
     this.apiService.getlookup();
    }
  }
  ngOnInit() {
    console.log("app is loading")
    let data = sessionStorage.getItem('loggedInUser');
    if (data != null || undefined) {
      console.log("Not firsttime")
      this.appService.setUserLoggedIn(true);
    }
    try {
      this.http.get("assets/url.json").subscribe(
        response => {
          console.log("url JSO",response)
          let responseData: any = response;
          let webserviceURL = responseData.webserviceURL;
          localStorage.setItem("webserviceURL", webserviceURL);
          this.idle.setIdle(responseData.sessionTimeOut*60)
          this.idle.setTimeout(10);
          this.interceptorService.baseUrl= responseData.webserviceURL;
          this.interceptorService.seturl();
          console.log(this.interceptorService.baseUrl)
          this.urlExist?"":this.apiService.getlookup();
        }
      )
    }
    catch (error) {
      console.log(error);
    }
  }



  public reset() {
    this.idle.watch();
    this.timedOut = false;
  }

  public hideChildModal(): void {
    this.bsmodelRef.hide();

  }

  public stay() {
    this.bsmodelRef.hide();
    this.reset();
  }
  public logout() {
    // this.childModal.hide();
    this.bsmodelRef.hide();

    this.appService.setUserLoggedIn(false);
    sessionStorage.clear();
    setTimeout(() => {
      this.router.navigateByUrl('login');
      this.modalService._hideModal(1);
    }, 100);

  }
}
