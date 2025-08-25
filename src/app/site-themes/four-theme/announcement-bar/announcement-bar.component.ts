import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CookieDataServiceService } from 'src/app/service/cookie-data-service.service';
import { SharedService } from 'src/app/service/shared-service/shared.service';

@Component({
  standalone: true,
  imports: [
    CommonModule
  ],
  selector: 'app-announcement-bar',
  templateUrl: './announcement-bar.component.html',
  styleUrls: ['./announcement-bar.component.css']
})
export class AnnouncementBarComponent implements OnInit {


  @Input() showalerttop!: boolean;
  @Input() loggedIn!: boolean;
  @Input() announcementBar: any;
  @Input() user: any;
  userInfo: any;
  sessionUser: string = '';


  constructor(private cookieDate: CookieDataServiceService, private sharedService: SharedService) { }

  ngOnInit() {
    this.sharedService.getUserData().subscribe(data => {
      if(data?.firstName){
        this.userInfo = data;
      }
      if(!this.userInfo || this.userInfo == undefined){
        const userCookie = this.cookieDate.getUserCookie('user');
        if (userCookie) {
          this.sessionUser = userCookie;
        }
      }
    });
    this.sharedService.getCookiesUserData().subscribe(data => {
      if(data){
        this.userInfo = null;
        this.sessionUser = '';
      }
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: BeforeUnloadEvent): void {
  }
}
