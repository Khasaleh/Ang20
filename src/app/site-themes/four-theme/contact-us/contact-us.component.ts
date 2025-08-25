import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule } from '@ngx-translate/core';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BusinessSettingService } from 'src/app/service/business-setting.service';
import { ChatopenserviceService } from 'src/app/service/chatopenservice.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    RouterModule,
    TranslateModule
  ],
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  subdomain!: string;
  @Input() data:any;
  businessId = Number(this.tokenStorage.getBusinessID())!;
  contactCountry : string = "";
  contactPhone : string = "";
  contactEmail : string = "";
  businessContacts : any[] = [];

  constructor(
    private tokenStorage: TokenStorageService,
    private chatService: ChatopenserviceService,
    private router: Router, private route: ActivatedRoute,
    private businessSetting : BusinessSettingService) { }

  ngOnInit() {
    this.subdomain = this.route.snapshot.params['subdomain'];
    this.getContactInfo();
    this.scrollToTop();

     this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      if (this.router.url.includes('/contact-us')) {
        this.scrollToTop();
      }
    });
  }

  private scrollToTop() {
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 50);
}

  getContactInfo(){
    this.businessSetting.getBusinessDetailsById(this.businessId).subscribe(data => {
      if(data?.data?.getBusinessDetailsById){
        this.contactCountry =  data?.data?.getBusinessDetailsById?.country;
        this.contactPhone = data?.data?.getBusinessDetailsById?.contactNo;
        this.contactEmail = data?.data?.getBusinessDetailsById?.email;
        this.businessContacts = data?.data?.getBusinessDetailsById?.businessContacts;
      }
    });
  }

  openChatMenu() {
    this.chatService.triggerChatMenuOpen();
  }

}
