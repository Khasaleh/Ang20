export class ReviewResponse {
  id!: number;
  comment!: string;
  rating!: number;
  userName!: string;
  userEmail!: string;
  imageUrl!: string;
  productName!: string;
  reviewTime!: Date;
  reply!: string;
  agreeCount!: number;
  disagreeCount!: number;
  isShow: boolean = false;
  productImage!: string;
}
