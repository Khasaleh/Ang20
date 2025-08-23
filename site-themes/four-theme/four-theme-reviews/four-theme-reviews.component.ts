import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditReviewModalComponent } from '../edit-review-modal/edit-review-modal.component';
import { Router } from '@angular/router';
import { OrderResponse } from 'src/app/models/OrderResponse';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { OrderDetailResponse } from 'src/app/models/OrderDetailResponse';
import { ReviewService } from 'src/app/service/review.service';

@Component({
  selector: 'app-four-theme-reviews',
  templateUrl: './four-theme-reviews.component.html',
  styleUrls: ['./four-theme-reviews.component.scss']
})
export class FourThemeReviewsComponent implements OnInit {
  showalerttop:boolean = true;
  minValue: number = 50;
  maxValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 250
  };
  order!: OrderResponse;
  awsUrl = environment.awsKey;
  currency = this.tokenstorage.getCurrency()?.symbol;
  orderPrefix = this.tokenstorage.getOrderFormat()?.prefix;
  orderSuffix = this.tokenstorage.getOrderFormat()?.suffix;
  subdomain = this.tokenstorage.getBusinessURL();
  storeName = this.tokenstorage.getBStoreName();

  constructor(
    private dialog:MatDialog,
    private router: Router,
    public tokenstorage: TokenStorageService,
    private reviewService : ReviewService
    ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.order = navigation.extras.state['data'].order;
      if(this.order){
        this.order.orderDetails.forEach(async item => {
          (await this.reviewService.getReviewByProductAndCustomer(item.product.id)).subscribe(
            data => {
              if(data?.data?.getReviewByProductIdAndCustomerIdAndUserType != null){
                item.action='EDIT';
              }else{
                item.action='ADD';
              }
            }
          );
        });
      }
    }
  }
  ngOnInit(): void {

  }



  addreviewmodal(item: OrderDetailResponse){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'edit_review_modal';
    dialogConfig.data = {item: item, action: 'ADD'};
    this.dialog.open(EditReviewModalComponent, dialogConfig)
    .afterClosed().subscribe(
      data => {
        if(data){
          item.action = 'EDIT';
        }
      }
    );
  }

  editreviewmodal(item: OrderDetailResponse){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'edit_review_modal';
    dialogConfig.data = {item: item, action: 'EDIT'};
    this.dialog.open(EditReviewModalComponent, dialogConfig)
    .afterClosed().subscribe(
      data => {
        if(data){
          item.action = 'EDIT';
        }
      }
    );
  }

}
