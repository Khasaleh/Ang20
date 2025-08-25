import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';
import { ProductService } from 'src/app/service/product.service';
import { ReviewService } from 'src/app/service/review.service';
import { environment } from 'src/environments/environment';
import { ReviewImageViewComponent } from '../reviewImageView/reviewImageView.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PdpContent } from 'src/app/models/PdpContent';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';
import { NotifacationMessageComponent } from 'src/app/notifacation-message/notifacation-message.component';


@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule
  ],
  selector: 'app-four-product-details-customer-reviews',
  templateUrl: './four-product-details-customer-reviews.component.html',
  styleUrls: ['./four-product-details-customer-reviews.component.scss']
})
export class FourProductDetailsCustomerReviewsComponent implements OnInit {

  @Input() data!:PdpContent
  @Input() activeTheme:string=''
  productReviews : any[] = [];
  rate=3;
  mode: ProgressBarMode = 'determinate';
  value = 100;
  bufferValue = 75;
  awsUrl = environment.awsKey;
  count = 0;
  total = 0;
  avg = 0;
  fiveStars = 0;
  fourStars = 0;
  threeStars = 0;
  twoStars = 0;
  oneStars = 0;
  productId!: number;
  getAllDisabled: boolean = false;
  user = this.tokenStorageService.getUser();
  constructor(
    private reviewService : ReviewService,
    private productService : ProductService,
    private route: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParam => {
      this.productId = routeParam['id'];
      this.getReviews(this.productId, 1, 10);
      this.productReviews;
    });
  }


  private getReviews(productId: number, pageNumber: number, pageSize: number) {
    this.reviewService.getAllReviewOfProduct(productId, pageNumber, pageSize).subscribe(
      async data => {
        if (data?.data?.getAllReviewOfProduct?.length > 0) {
          this.productReviews = data?.data?.getAllReviewOfProduct;
          this.productReviews?.forEach(review => {
            this.count += 1;
            this.total += review?.rating;
          });
          this.avg = this.total / this.count;
          this.fiveStars = this.productReviews?.filter(review => review?.rating == 5)?.length / this.count * 100;
          this.fourStars = this.productReviews?.filter(review => review?.rating == 4)?.length / this.count * 100;
          this.threeStars = this.productReviews?.filter(review => review?.rating == 3)?.length / this.count * 100;
          this.twoStars = this.productReviews?.filter(review => review?.rating == 2)?.length / this.count * 100;
          this.oneStars = this.productReviews?.filter(review => review?.rating == 1)?.length / this.count * 100;
        }
      }
    );
  }

  async getAllReviews(){
    this.count = 0;
    this.total = 0;
    this.getAllDisabled = true;
    await this.getReviews(this.productId, 1, 40);
  }



  reviewImageView(imageUrl: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { imageUrl: imageUrl };
    const dialogRef = this.dialog.open(ReviewImageViewComponent, {
      panelClass: 'modal-medium-width',
      data: dialogConfig.data
    });
  }

  async agreeOnReview(reviewId: number){
     (await this.reviewService.agreeOnReview(reviewId)).subscribe(
      data => {
        if(data?.data?.agreeOnReview != null){
          this.count = 0;
          this.total = 0;
          this.getReviews(this.productId, 1, 10);
          this.dialog.open(SucessmsgPopupComponent,{backdropClass: 'notificationmodal-popup-sucess',
             data:{ title: 'SUCCESS', message: data?.data?.agreeOnReview?.message}});
        }else {
          this.dialog.open(NotifacationMessageComponent, {
            backdropClass: 'notificationmodal-popup',
            width: '450px',
            data: { title: '', message: data?.errors[0]?.errorMessage}
          });
        }
      }
    );
  }

  async disagreeOnReview(reviewId: number){
    (await this.reviewService.disagreeOnReview(reviewId)).subscribe(
     data => {
       if(data?.data?.disagreeOnReview != null){
        this.count = 0;
        this.total = 0;
        this.getReviews(this.productId, 1, 10);
         this.dialog.open(SucessmsgPopupComponent,{backdropClass: 'notificationmodal-popup-sucess',
            data:{ title: 'SUCCESS', message: data?.data?.disagreeOnReview?.message}});
       }else {
         this.dialog.open(NotifacationMessageComponent, {
           backdropClass: 'notificationmodal-popup',
           width: '450px',
           data: { title: '', message: data?.errors[0]?.errorMessage}
         });
       }
     }
   );
 }

}
