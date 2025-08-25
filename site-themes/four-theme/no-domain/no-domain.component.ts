import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { TranslateSiteService } from 'src/app/service/translate-site.service';

@Component({
  selector: 'app-no-domain',
  templateUrl: './no-domain.component.html',
  styleUrls: ['./no-domain.component.css']
})
export class NoDomainComponent implements OnInit {

  businessUrl = environment.landingUrl;
  constructor(public translate: TranslateService, 
    public translateSiteService:TranslateSiteService) { }

  ngOnInit() {
    
    if (!this.translate.currentLang) {
      this.translate.use('en');
    }

  }

}
