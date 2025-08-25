import { TranslateModule } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgbRatingModule, NgbCarouselModule, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionResponse } from 'src/app/models/SessionResponse';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { CookieDataServiceService } from 'src/app/service/cookie-data-service.service';
import { DrawerControlService } from 'src/app/service/drawer-control.service';
import { environment } from 'src/environments/environment';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent implements OnInit {

  businessOrderId: string = '';
  email: string = '';
  subdomain: string = '';
  user = this.tokenStorage.getUser();
  businessId = Number(this.tokenStorage.getBusinessID()!);
  sessionResponse!: SessionResponse;

  constructor(public shoppingCart: ShoppingCartService,private drawerControlService: DrawerControlService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog,
    private tokenStorage: TokenStorageService,private cookieDate: CookieDataServiceService,
  ) {
    if(this.businessId &&  cookieDate.getCookie(this.businessId!.toString()) != ''){
      this.sessionResponse = JSON.parse(cookieDate.getCookie(this.businessId!.toString()));
    }
  }

  ngOnInit(): void {
    if(environment.env !== 'local'){
      this.subdomain = window.location.hostname;
    } else {
      this.subdomain = this.route.snapshot.params['subdomain'];
    }
       setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);  
  }


  async getOrderTracking(){
      (await this.shoppingCart.getOrderTracking(this.businessOrderId.trim(), this.email.trim())).subscribe(
        data => {
          if(data?.errors){
            this.dialog.open(NotifacationMessageComponent, {
              backdropClass: 'notificationmodal-popup',
              width: '450px',
              data: { title: '', message: data?.errors[0]?.errorMessage}
            });
            return;
          }
          if(data?.data?.getOrderTracking){
            if(this.sessionResponse.userType !== 'FAZEAL_REGISTERED' && this.sessionResponse.userType !== 'STORE_REGISTERED'){
              this.sessionResponse = new SessionResponse();
              this.sessionResponse.id = 1;
              this.sessionResponse.userType = 'GUEST';
              this.cookieDate.setCookie(this.businessId!.toString(), JSON.stringify(this.sessionResponse), 1);
            }
            const order = data?.data?.getOrderTracking;
            const orderId = data?.data?.getOrderTracking.id;
            if (environment.env !== 'local') {
              this.subdomain = '';
            }
            const url = `/${this.subdomain}/order-details/${orderId}`;
            this.tokenStorage.saveOrderForOrderDetails(order);
            this.router.navigateByUrl(url, {state: {order: order, orderhistory: true}});
          }
        }
      )
  }

  openUserProfileDrawerAndDropdown() {
    this.drawerControlService.triggerOpenDrawer();
    this.drawerControlService.triggerOpenDropdown();
  }


}
