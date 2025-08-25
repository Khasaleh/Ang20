export class CategoryResponse {
  id!: number;
  businessId!: number;
  userId!: number;
  name!: string | any;
  description!: string;
  enabled!: Boolean;
  imageUrl!: string;
  parentCategoryId!: number;
  createdDate!: Date;
  orderType!: string;
  shippingType!: string;
  longDescription!: string;
  url!: string
  childCategories!: [CategoryResponse]
}
