import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewReturnImagesComponent } from '../view-return-images/view-return-images.component';
import { OrderDetailResponse } from 'src/app/models/OrderDetailResponse';
import { environment } from 'src/environments/environment';
import { ShoppingCartService } from 'src/app/service/ShoppingCart.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';
import { OrderResponse } from 'src/app/models/OrderResponse';

@Component({
  selector: 'app-return-reasons-box',
  templateUrl: './return-reasons-box.component.html',
  styleUrls: ['./return-reasons-box.component.css']
})
export class ReturnReasonsBoxComponent implements OnInit {

  @Input() prod!: OrderDetailResponse;
  @Input() order!: OrderResponse;
  @Input() orderId!: number;
  @Output() updatedOrder = new EventEmitter<OrderResponse>();
  awsURL = environment.awsKey;
  returnOrderTracks: any[] = [];
  firstTimeCalled: boolean = false;
  constructor(public dialog: MatDialog, private shoppingCart: ShoppingCartService) { }

  ngOnInit() {
    this.returnOrderTracks = this.order?.returnOrderTracks?.map((track: any) => track?.status);
  }

  async cancelItemReturn(){
    this.firstTimeCalled = true;
    (await this.shoppingCart.cancelItemReturn(this.orderId, this.prod.id)).subscribe(
      result => {
        if(result?.data?.cancelItemReturn == null){
          this.firstTimeCalled = false;
          return;
        }
        this.prod.returnOrderStatus = 'RETURN_CANCELLED';
        this.dialog.open(SucessmsgPopupComponent, { backdropClass: 'notificationmodal-popup-sucess',
          data: { title: '', message: result?.data?.cancelItemReturn?.message } });
          this.updatedOrder.emit(result?.data?.cancelItemReturn?.data);
          this.firstTimeCalled = false;
      }
    );
  }

  viewReturnImages(prod: OrderDetailResponse) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'modal-x-medium-width';
    dialogConfig.data = prod;
    const dialogRef = this.dialog.open(ViewReturnImagesComponent, dialogConfig);
  }

}
