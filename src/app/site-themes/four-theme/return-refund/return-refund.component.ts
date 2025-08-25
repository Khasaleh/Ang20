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
import { Options } from '@angular-slider/ngx-slider';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TrackpackageComponent } from '../four-theme-my-order/trackpackage/trackpackage.component';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  selector: 'app-return-refund',
  templateUrl: './return-refund.component.html',
  styleUrls: ['./return-refund.component.scss']
})
export class ReturnRefundComponent implements OnInit {
  showalerttop:boolean = true;
  minValue: number = 50;
  maxValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 250
  };
  subdomain: string = '';
  order!: OrderResponse;
  loadingOrders = false;
  noOrdersAvailable = false;
  orderId!: number;
  businessId = Number(this.tokenStorage.getBusinessID()!);
  constructor(private router: Router, private route: ActivatedRoute, public dialog: MatDialog, public shoppingCart: ShoppingCartService, public tokenStorage: TokenStorageService,) { }

  ngOnInit(): void {
    if(environment.env !== 'local'){
      this.subdomain = window.location.hostname;
    } else {
      this.subdomain = this.route.snapshot.params['subdomain'];
    }
    this.orderId = this.route.snapshot.params['id'];
    this.getByOrderId();
       setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  }

  openReturnOrder(order: any) {
    if (environment.env !== 'local') {
      this.subdomain = '';
    }
    const orderId = order.id;
    const url = `/${this.subdomain}/return-refund-process/${orderId}`;
    this.router.navigateByUrl(url, {state: {order: order}});
  }

  async getByOrderId() {
      this.loadingOrders = true;
      this.noOrdersAvailable = false;
        (await this.shoppingCart.getByOrderId(this.orderId, this.businessId)).subscribe(
            data => {
                if (data?.errors) {
                    this.loadingOrders = false;
                    return;
                }
                if (data?.data?.getOrdersByCustomerAndBusinessAndOrderId) {
                    this.order = data?.data?.getOrdersByCustomerAndBusinessAndOrderId;
                    this.loadingOrders = false;
                } else {
                    this.loadingOrders = false;
                    this.noOrdersAvailable = true;
                }
            },
            error => {
                this.loadingOrders = false;
                this.noOrdersAvailable = true;
            }
        );
}

 openTrackPackage(order: OrderResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'modal-medium-width';
    dialogConfig.data = order;
    const dialogRef = this.dialog.open(TrackpackageComponent, dialogConfig);
  }


}
