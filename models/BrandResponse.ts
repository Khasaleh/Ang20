import { BrandCategory } from "./BrandCategory";

export class BrandResponse {
  id!: number;
  businessId!: number;
  userId!: number;
  imageUrl!: string;
  name!: string
  brandCategoryDTOs!: [BrandCategory]
  checked : boolean = false;
}
