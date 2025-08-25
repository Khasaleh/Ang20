import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ReviewService } from 'src/app/service/review.service';
import { SucessmsgPopupComponent } from 'src/app/sucessmsg-popup/sucessmsg-popup.component';
import { environment } from 'src/environments/environment';
import { TranslateSiteService } from 'src/app/service/translate-site.service';
import { ProductResponse } from 'src/app/models/ProductResponse';
import { TokenStorageService } from 'src/app/service/TokenStorgeService.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  selector: 'app-edit-review-modal',
  templateUrl: './edit-review-modal.component.html',
  styleUrls: ['./edit-review-modal.component.scss']
})
export class EditReviewModalComponent implements OnInit {
  starRating=0;
  item!: ProductResponse;
  action = 'ADD';
  awsUrl = environment.awsKey;
  reviewImage!: File;
  image: string = '../../../assets/img/default-profile-image.jpg';
  disableSubmitButton = false;
  reviewId = 0;
  user = this.tokenStorageService.getUser();
  userName: string = '';
  userEmail: string = '';
  comment: string = '';
  rating: any;
  ratingRequired: boolean = false;
  commentRequired: boolean = false;
  reply: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: {item: ProductResponse, action: string},
  private dialogRef: MatDialogRef<EditReviewModalComponent>,
  private reviewService : ReviewService,
  public translateSiteService:TranslateSiteService, private tokenStorageService: TokenStorageService,
  public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.item = this.data?.item;
    this.action = this.data?.action;
    this.userName = this.user?.firstName + ' ' + this.user?.lastName;
    await this.getReview();

  }

  async getReview(){
    (await this.reviewService.getReviewByProductAndCustomer(this.item.id)).subscribe(
      data => {
        if(data?.data?.getReviewByProductIdAndCustomerIdAndUserType != null){
          this.userName = data?.data?.getReviewByProductIdAndCustomerIdAndUserType?.userName;
          this.userEmail = data?.data?.getReviewByProductIdAndCustomerIdAndUserType?.userEmail;
          this.comment = data?.data?.getReviewByProductIdAndCustomerIdAndUserType?.comment;
          this.rating = data?.data?.getReviewByProductIdAndCustomerIdAndUserType?.rating;
          this.reviewId = data?.data?.getReviewByProductIdAndCustomerIdAndUserType?.id;
          this.image = this.awsUrl+data?.data?.getReviewByProductIdAndCustomerIdAndUserType?.imageUrl;
          this.reply = data?.data?.getReviewByProductIdAndCustomerIdAndUserType?.reply;
        }
      }
    );
  }

  uploadReviewImage(event: any) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0){
      this.reviewImage = fileList[0];
    }
    let reader = new FileReader();
    reader.onload = (e: any) => {
      this.image = e.target.result;
    };
    reader.readAsDataURL(this.reviewImage);
  }

  async onSubmit(){
      this.ratingRequired = false;
      this.commentRequired = false;
      if(this.rating === undefined){
        this.ratingRequired = true;
        return;
      }
      if(!this.comment || this.comment == ''){
        this.commentRequired = true;
        return;
      }
      this.disableSubmitButton=true;
      (await this.reviewService.createReview(this.comment, this.rating, this.item.id, this.userName, this.user?.email, this.reviewImage)).subscribe(
        data => {
          if(data?.data?.createReview != null){
            this.dialog.open(SucessmsgPopupComponent,{backdropClass: 'notificationmodal-popup-sucess',
              data:{ title:'SUCCESS',
                 message: data?.data?.createReview?.message
                }});
            setTimeout(() => {
              this.dialogRef.close(true);
               }, 3000);
          }else{
            this.disableSubmitButton=false;
          }
        }
      );
  }

}
